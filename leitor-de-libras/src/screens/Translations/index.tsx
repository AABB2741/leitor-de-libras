import { useCallback, useEffect, useState } from "react";
import {
	FlatList,
	View,
	RefreshControl,
	BackHandler,
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

import * as SecureStore from "expo-secure-store";
import * as Storage from "../../services/Storage";

import Order from "../../@types/Order";
import Option, { OptionProps as OptionProps } from "./Option";

import Header from "../../components/Header";
import Empty from "../../components/Empty";
import File, { FileProps } from "./File";
import Filter from "../../components/Filter";
import Font from "../../components/Font";

import normalize from "../../utils/normalize";
import createStyles from "./styles";

import FILES from "../../constants/recordings";
import log from "../../utils/log";
import Loading from "../../components/Loading";

interface Props {
	navigation: NativeStackNavigationProp<AppRoutes, "TranslationsRoutes">;
}

export default function Translations({ navigation }: Props) {
	const lang = useLang();
	const colors = useColors();
	const styles = createStyles({ colors });

	const [offline, setOffline] = useState(false);
	const [error, setError] = useState<ResponseCode | null>(null);
	const [files, setFiles] = useState<FileProps[] | null>(null);
	const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [search, setSearch] = useState("");
	const [order, setOrder] = useState<Order>("asc");

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

	async function loadFiles() {
		setFiles(null);
		setError(null);

		// Pegando arquivos locais...
		const localFiles = ((await Storage.getItem("translations")) ?? []).sort(
			(a, b) =>
				new Date(a.createdAt).getTime() >
				new Date(b.createdAt).getTime()
					? -1
					: 1
		); // ...e ordenando pela data (depois aplicar com o filtro)

		if (offline) {
			setFiles(localFiles);
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
			const request = await api.get<FileProps[]>("/translations", {
				headers: {
					Authorization: token,
				},
				timeout: 15000,
			});

			// TODO: ordenar seguindo o filtro do usuário
			const files = localFiles.concat(
				request.data.map((d) => ({ ...d, uploaded: true })) ?? [] // adicionando "uploaded: true" para todos os arquivos da internet
			);

			setFiles(files);
		} catch (e) {
			setError("unknown_err");
			setFiles([]);
		}
	}

	function handleSelectFile(id: string) {
		const newSelectedFiles = [...selectedFiles];

		if (newSelectedFiles.includes(id)) {
			newSelectedFiles.splice(newSelectedFiles.indexOf(id), 1);
		} else newSelectedFiles.push(id);

		setSelectedFiles(newSelectedFiles);
	}

	const OPTIONS: OptionProps[] = [
		{
			icon: (props) => <PlusCircle {...props} />,
			label: lang.translations.options.create,
			multiSelectDisabled: true,
		},
		{
			icon: (props) => <Trash {...props} />,
			label: lang.translations.options.delete,
			requireSelect: true,
		},
		{
			icon: (props) => <Star {...props} />,
			label: lang.translations.options.favorite,
			requireSelect: true,
		},
		{
			icon: (props) => <Keyhole {...props} />,
			label: lang.translations.options.lock,
			requireSelect: true,
		},
		{
			icon: (props) => <Download {...props} />,
			label: lang.translations.options.import,
			multiSelectDisabled: true,
		},
		{
			icon: (props) => <Export {...props} />,
			label: lang.translations.options.export,
			requireSelect: true,
		},
		{
			icon: (props) => <Archive {...props} />,
			label: lang.translations.options.archive,
			requireSelect: true,
		},
		{
			icon: (props) => <CloudCheck {...props} />,
			label: lang.translations.options.load,
			requireSelect: true,
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
							onPress: loadFiles,
						},
						{
							label: lang.translations.loading_files_error
								.use_offline,
							onPress: () => {
								setOffline(true);
								loadFiles();
							},
						},
					]}
				/>
			</View>
		);
	}

	return (
		<>
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
								? lang.translations.selected_singular.replace(
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
