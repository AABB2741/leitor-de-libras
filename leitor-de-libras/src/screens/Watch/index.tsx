import {
	Image,
	ScrollView,
	View,
	FlatList,
	TouchableOpacity,
} from "react-native";
import {
	ClipboardText,
	CloudSlash,
	DownloadSimple,
	IconProps,
	Info,
	PencilSimple,
	ShareNetwork,
} from "phosphor-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import * as Storage from "../../services/Storage";

import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";
import { api } from "../../lib/api";

import Header from "../../components/Header";
import Font from "../../components/Font";

import createStyles from "./styles";
import { FileProps } from "../Translations/File";
import { RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Popup from "../../components/Popup";
import Button from "../../components/Button";

type Option = {
	icon: (props: IconProps) => JSX.Element;
	label: string;
	onPress?: () => void;
};

interface WatchProps {
	navigation: NativeStackNavigationProp<TranslationsParamList, "Watch">;
	route: RouteProp<TranslationsParamList, "Watch">;
}

export default function Watch({ navigation, route }: WatchProps) {
	const lang = useLang();
	const colors = useColors();
	const styles = createStyles({ colors });

	const [outOfSync, setOutOfSync] = useState(true); // false
	const [error, setError] = useState<null | ResponseCode>(null);
	const [data, setData] = useState<null | FileProps>(null);
	const [fullScreen, setFullScreen] = useState<boolean>(false);

	const { id } = route.params;

	async function handleGetFile() {
		const localFiles = (await Storage.getItem("translations")) ?? [];
		const file = localFiles.find((f) => f.id === id);

		// Verifica se o arquivo está salvo localmente
		if (file) {
			// Se sim, exibe o salvo no dispositivo
			setData(file);
		} else {
			// Se não, solicita ao servidor
			try {
				setError(null);
				const token = await SecureStore.getItemAsync("token");

				const { data } = await api.get<{ file: FileProps }>("/watch", {
					headers: {
						Authorization: token,
						id: route.params.id,
					},
				});

				setData({ ...data.file, uploaded: true });
			} catch (err: any) {
				if (err.response.status === 401) {
					setError("invalid_token");
				}
			}
		}
	}

	useEffect(() => {
		handleGetFile();
	}, []);

	if (!data) {
		return (
			<View style={[styles.container, styles.loading]}>
				<Loading />
			</View>
		);
	}

	const imageUrl = `${api.getUri()}/uploads/${data.imageName}`;

	if (fullScreen) {
		return (
			<TouchableOpacity
				activeOpacity={0.9}
				style={styles.fullScreen}
				onPress={() => setFullScreen(false)}
			>
				<Image
					style={styles.fullScreen}
					source={{
						uri: data.uploaded ? imageUrl : data.location,
					}}
				/>
			</TouchableOpacity>
		);
	}

	const OPTIONS: Option[] = [
		{
			label: lang.watch.options.share,
			icon: (props) => <ShareNetwork {...props} />,
		},
		{
			label: lang.watch.options.edit,
			icon: (props) => <PencilSimple {...props} />,
		},
		{
			label: lang.watch.options.copy,
			icon: (props) => <ClipboardText {...props} />,
		},
		{
			label: lang.watch.options.details,
			icon: (props) => <Info {...props} />,
		},
		{
			label: lang.watch.options.download,
			icon: (props) => <DownloadSimple {...props} />,
		},
	];
	console.log(data);
	return (
		<View style={styles.container}>
			<Popup visible={outOfSync} type="message">
				<CloudSlash
					color={colors.desc}
					size={24}
					style={styles.outOfSyncIcon}
				/>
				<Font family="ubuntu" style={styles.outOfSyncText}>
					{lang.watch.out_of_sync.title}
				</Font>
				<Font family="regular" style={styles.outOfSyncText}>
					{lang.watch.out_of_sync.text}
				</Font>
				<View style={styles.outOfSyncOptions}>
					<TouchableOpacity style={styles.outOfSyncOption}>
						<Image
							source={require("../../../assets/icons/cloud_sync.png")}
							style={styles.outOfSyncOptionIcon}
						/>
						<Font
							family="ubuntu"
							style={styles.outOfSyncOptionText}
						>
							{lang.watch.out_of_sync.cloud}
						</Font>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.outOfSyncOption,
							styles.outOfSyncOptionBorder,
						]}
					>
						<Image
							source={require("../../../assets/icons/mobile.png")}
							style={styles.outOfSyncOptionIcon}
						/>
						<Font
							family="ubuntu"
							style={styles.outOfSyncOptionText}
						>
							{lang.watch.out_of_sync.device}
						</Font>
					</TouchableOpacity>
				</View>
				<Button onPress={() => setOutOfSync(false)}>
					{lang.watch.out_of_sync.none}
				</Button>
			</Popup>
			<Header title="Tradução" />
			<View style={styles.video}>
				<TouchableOpacity onPress={() => setFullScreen(true)}>
					<Image
						style={styles.image}
						source={{
							uri: data.uploaded ? imageUrl : data.location,
						}}
					/>
				</TouchableOpacity>
			</View>
			<ScrollView style={styles.scroll}>
				<Font family="black" style={styles.title} numberOfLines={2}>
					{data.title}
				</Font>
				<FlatList
					contentContainerStyle={styles.options}
					data={OPTIONS}
					renderItem={({ item, index }) => (
						<TouchableOpacity style={styles.option}>
							{item.icon({ color: colors.font, size: 16 })}
							<Font family="ubuntu" style={styles.optionLabel}>
								{item.label}
							</Font>
						</TouchableOpacity>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
				<View>
					<View style={styles.wordContainer}>
						{data.type === "i" && data.content && (
							<Font family="black" style={styles.word}>
								{data.content}
							</Font>
						)}
						{data.type === "v" && data.content && (
							<Font style={styles.text}>{data.content}</Font>
						)}
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
