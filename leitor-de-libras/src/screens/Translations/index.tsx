import { useCallback, useEffect, useState } from "react";
import {
	FlatList,
	View,
	RefreshControl,
	BackHandler,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import {
	Archive,
	CellSignalX,
	CheckCircle,
	CloudCheck,
	DotsThreeVertical,
	Download,
	Export,
	HandWaving,
	Keyhole,
	MagnifyingGlass,
	PlusCircle,
	Star,
	Trash,
	X,
} from "phosphor-react-native";
import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";
import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useUser } from "../../contexts/user";
import { api } from "../../lib/api";
import * as FileSystem from "expo-file-system";

import * as SecureStore from "expo-secure-store";
import * as Storage from "../../services/Storage";

import Order from "../../@types/Order";
import Option, { OptionProps as OptionProps } from "./Option";

import Header from "../../components/Header";
import Empty from "../../components/Empty";
import File, { FileProps } from "./File";
import Filter from "../../components/Filter";
import Font from "../../components/Font";

import { deduplicate } from "../../utils/deduplicate";
import normalize from "../../utils/normalize";
import createStyles from "./styles";

import FILES from "../../constants/recordings";
import log from "../../utils/log";
import Loading from "../../components/Loading";
import Popup from "../../components/Popup";
import Button from "../../components/Button";

interface Props {
	navigation: NativeStackNavigationProp<AppRoutes, "TranslationsRoutes">;
}

type FilePropsUploaded = FileProps & { uploaded?: boolean };

export default function Translations({ navigation }: Props) {
	const lang = useLang();
	const colors = useColors();
	const styles = createStyles({ colors });

	const [offline, setOffline] = useState(false);
	const [error, setError] = useState<ResponseCode | null>(null);
	const [files, setFiles] = useState<FilePropsUploaded[] | null>(null);
	const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [search, setSearch] = useState("");
	const [order, setOrder] = useState<Order>("asc");

	const [deleteModalVisible, setDeleteModalVisible] = useState(false);

	const allSelected = selectedFiles?.length === files?.length;

	useFocusEffect(
		useCallback(() => {
			function handleBack() {
				if (selectedFiles.length > 0) {
					setSelectedFiles([]);
				} else {
					log('Saindo do APP em "Translations"', { color: "fgRed" });
					BackHandler.exitApp();
				}

				return true;
			}

			const sub = BackHandler.addEventListener(
				"hardwareBackPress",
				handleBack
			);
			return sub.remove;
		}, [selectedFiles])
	);

	useEffect(() => {
		loadFiles();
	}, []);

	async function loadFiles(forceOffline?: boolean, forceOnline?: boolean) {
		setFiles(null);
		setError(null);
		setRefreshing(true);

		// Pegando arquivos locais...
		const localFiles = ((await Storage.getItem("translations")) ?? []).sort(
			(a, b) =>
				new Date(a.createdAt).getTime() >
				new Date(b.createdAt).getTime()
					? -1
					: 1
		); // ...e ordenando pela data (depois aplicar com o filtro)

		if ((offline || forceOffline) && !forceOnline) {
			setFiles(localFiles);
			setRefreshing(false);
			return;
		}

		// Pegando arquivos da nuvem

		const token = await SecureStore.getItemAsync("token");

		if (!token) {
			setFiles([]);
			setError("invalid_token");
			return;
		}

		try {
			const { data } = await api.get<FileProps[]>("/translations", {
				headers: {
					Authorization: token,
				},
				timeout: 15000,
			});

			// TODO: ordenar seguindo o filtro do usuário
			const res: FilePropsUploaded[] = [...localFiles];

			for (let file of data) {
				let index = res.findIndex((f) => f.id === file.id);

				if (index !== -1) {
					res[index].uploaded = true;
				} else res.push({ ...file, uploaded: true });
			}

			setFiles(res);
		} catch (e) {
			setError("unknown_err");
			setFiles([]);
		}

		setRefreshing(false);
	}

	function handleSelectFile(id: string) {
		const newSelectedFiles = [...selectedFiles];

		if (newSelectedFiles.includes(id)) {
			newSelectedFiles.splice(newSelectedFiles.indexOf(id), 1);
		} else newSelectedFiles.push(id);

		setSelectedFiles(newSelectedFiles);
	}

	async function handleDeleteFiles() {
		try {
			// Colocar um modal de confirmação antes
			if (selectedFiles.length <= 0 || !files) return;

			// Excluindo as imagens e vídeos salvas no dispositivo
			for (let id of selectedFiles) {
				let file = files.find((f) => f.id === id);

				if (!file || !file.location) continue;

				await FileSystem.deleteAsync(file.location);
			}

			// Excluindo os arquivos da listagem do localStorage
			await Storage.removeMany("translations", (f) =>
				selectedFiles.includes(f.id)
			);

			// Excluindo os arquivos do servidor
			const token = await SecureStore.getItemAsync("token");

			const response = await api.delete<{ count: number }>(
				`/translations/delete/${selectedFiles
					.map((f) => `id=${f}`)
					.join("&")}`,
				{
					headers: {
						authorization: token,
						"Content-Type": "application/json",
					},
					data: {
						ids: selectedFiles,
					},
				}
			);
		} catch (err) {
			console.error(err);
			setError("unknown_err");
		} finally {
			setSelectedFiles([]);
			loadFiles();
		}
	}

	const OPTIONS: OptionProps[] = [
		{
			icon: (props) => <PlusCircle {...props} />,
			label: lang.translations.options.create,
			checkVisibility: () => selectedFiles.length === 0,
			onPress: () => navigation.navigate("Camera"),
		},
		{
			icon: (props) => <Trash {...props} />,
			label: lang.translations.options.delete,
			checkVisibility: () => selectedFiles.length > 0,
			onPress: () => setDeleteModalVisible(true),
		},
		{
			icon: (props) => <Star {...props} />,
			label: lang.translations.options.favorite,
			checkVisibility: () => selectedFiles.length > 0,
		},
		{
			icon: (props) => <Keyhole {...props} />,
			label: lang.translations.options.lock,
			checkVisibility: () => selectedFiles.length > 0,
		},
		{
			icon: (props) => <Download {...props} />,
			label: lang.translations.options.import,
		},
		{
			icon: (props) => <Export {...props} />,
			label: lang.translations.options.export,
			checkVisibility: () => false,
		},
		{
			icon: (props) => <Archive {...props} />,
			label: lang.translations.options.archive,
			checkVisibility: () => true,
		},
		{
			icon: (props) => <CloudCheck {...props} />,
			label: lang.translations.options.load,
			checkVisibility: () => true,
		},
	];

	if (!files) {
		return (
			<View style={styles.loading}>
				<Loading />
			</View>
		);
	}

	if (error) {
		return (
			<View style={[styles.container, styles.error]}>
				<Empty
					title={lang.translations.loading_files_error.title}
					desc={lang.general.err_codes[error] ?? error}
					icon={(props) => <CellSignalX {...props} weight="fill" />}
					options={[
						{
							label: lang.translations.loading_files_error
								.try_again,
							highlight: true,
							onPress: () => loadFiles(),
						},
						{
							label: lang.translations.loading_files_error
								.use_offline,
							onPress: () => {
								setOffline(true);
								loadFiles(true);
							},
						},
					]}
				/>
			</View>
		);
	}

	return (
		<>
			{/* Modais */}
			<Popup visible={deleteModalVisible} type="message">
				<Font family="ubuntu" style={styles.modalTitle}>
					{lang.translations.modal.delete.title}
				</Font>
				<Font style={styles.modalText}>
					{lang.translations.modal.delete.text}
				</Font>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<View style={styles.deleteModalSummary}>
						<Font family="black" style={styles.deleteModalCount}>
							{selectedFiles.length}
						</Font>
						<Font style={styles.deleteModalItems}>
							{lang.translations.modal.delete.selected}
						</Font>
					</View>
					<View style={styles.deleteModalSummary}>
						<Font family="black" style={styles.deleteModalCount}>
							{selectedFiles.reduce(
								(ac, v) =>
									files.find((f) => f.id === v)?.uploaded
										? 1
										: 0,
								0
							)}
						</Font>
						<Font style={styles.deleteModalItems}>
							{lang.translations.modal.delete.saved_on_cloud}
						</Font>
					</View>
					<View style={styles.deleteModalSummary}>
						<Font family="black" style={styles.deleteModalCount}>
							{selectedFiles.reduce(
								(ac, v) =>
									files.find((f) => f.id === v)?.location
										? 1
										: 0,
								0
							)}
						</Font>
						<Font style={styles.deleteModalItems}>
							{lang.translations.modal.delete.saved_on_device}
						</Font>
					</View>
				</ScrollView>
				<View>
					<Button onPress={() => setDeleteModalVisible(false)}>
						{lang.translations.modal.delete.cancel}
					</Button>
					<Button>{lang.translations.modal.delete.archive}</Button>
					<Button
						highlight
						accentColor={colors.critic}
						onPress={() => {
							setDeleteModalVisible(false);
							handleDeleteFiles();
						}}
					>
						{lang.translations.modal.delete.delete}
					</Button>
				</View>
			</Popup>
			{/* Conteúdo */}
			<Header
				title={lang.translations.title}
				hideBackButton
				rightOptions={[
					{
						icon: (props) => <DotsThreeVertical {...props} />,
					},
				]}
			/>
			<View style={styles.container}>
				<View
					style={[
						styles.selected,
						selectedFiles.length < 1 && { display: "none" },
					]}
				>
					<View style={styles.selection}>
						<TouchableOpacity
							onPress={() =>
								setSelectedFiles(files.map((f) => f.id))
							}
						>
							<CheckCircle
								weight={allSelected ? "fill" : "regular"}
								color={
									allSelected ? colors.accent : colors.font
								}
								size={16}
							/>
						</TouchableOpacity>
						<Font style={styles.selectedLabel}>
							{selectedFiles.length === 1
								? lang.translations.selected_single.replace(
										"%s",
										selectedFiles.length.toString()
								  )
								: lang.translations.selected.replace(
										"%s",
										selectedFiles.length.toString()
								  )}
						</Font>
					</View>
					<TouchableOpacity onPress={() => setSelectedFiles([])}>
						<X size={16} color={colors.font} />
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					onPress={() => {
						setOffline(false);
						loadFiles(false, true);
					}}
					style={[
						styles.offlineWarning,
						{ display: offline ? "flex" : "none" },
					]}
				>
					<Font style={styles.offlineWarningText}>
						{lang.general.warning.replace(
							"%s",
							lang.translations.offline_warning
						)}
					</Font>
				</TouchableOpacity>
				<FlatList
					ListHeaderComponent={
						<>
							<View style={{ flex: 1 }}>
								<FlatList
									style={styles.optionsContainer}
									contentContainerStyle={styles.options}
									data={OPTIONS}
									horizontal
									showsHorizontalScrollIndicator={false}
									renderItem={({ item, index }) => (
										<Option
											{...item}
											selectCount={selectedFiles.length}
											key={index}
										/>
									)}
								/>
							</View>
							<View style={styles.top}>
								<Filter
									filter={search}
									filterPlaceholder={lang.translations.filter}
									order={order}
									onFilterChange={(src) => setSearch(src)}
									onOrderChange={(order) => setOrder(order)}
								/>
							</View>
						</>
					}
					numColumns={3}
					columnWrapperStyle={styles.files}
					ListHeaderComponentStyle={{ padding: 0 }}
					data={files.filter((f) =>
						normalize(f.title, true).includes(
							normalize(search, true)
						)
					)}
					renderItem={({ item, index }) => (
						<File
							{...item}
							disabled={refreshing}
							selectedFiles={selectedFiles}
							index={index}
							handleSelectFile={handleSelectFile}
							key={index}
						/>
					)}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={loadFiles}
						/>
					}
					ListEmptyComponent={
						search && files.length > 0 ? (
							<Empty
								icon={(props) => <MagnifyingGlass {...props} />}
								title={lang.translations.empty_search.title}
								desc={lang.translations.empty_search.desc}
								contentContainerStyle={{ marginHorizontal: 20 }}
							/>
						) : (
							<Empty
								icon={(props) => <HandWaving {...props} />}
								title={lang.translations.empty_files.title}
								desc={lang.translations.empty_files.desc.replace(
									"%s",
									lang.translations.empty_files.create_option
								)}
								contentContainerStyle={{ marginHorizontal: 20 }}
								options={[
									{
										label: lang.translations.empty_files
											.create_option,
										highlight: true,
										onPress: () =>
											navigation.navigate("Camera"),
									},
									{
										label: lang.translations.empty_files
											.send_option,
									},
								]}
							/>
						)
					}
				></FlatList>
			</View>
		</>
	);
}
