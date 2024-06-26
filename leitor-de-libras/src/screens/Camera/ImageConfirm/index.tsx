import { useState } from "react";
import { Image, View } from "react-native";
import { CameraCapturedPicture } from "expo-camera";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import pt from "dayjs/locale/pt-br";
import en from "dayjs/locale/en";
import { useNavigation } from "@react-navigation/native";

import * as SecureStore from "expo-secure-store";
import * as FileSystem from "expo-file-system";
import * as Storage from "../../../services/Storage";

import Button from "../../../components/Button";
import { useLang } from "../../../contexts/lang";
import { useColors } from "../../../contexts/colors";

import Font from "../../../components/Font";

import createStyles from "./styles";
import log from "../../../utils/log";
import { api } from "../../../lib/api";
import { FileProps } from "../../Translations/File";
import { useUser } from "../../../contexts/user";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { uploadImage } from "../../../services/upload";

interface ImageConfirmProps {
	pictureSource: CameraCapturedPicture;
	setPictureSource: React.Dispatch<
		React.SetStateAction<CameraCapturedPicture | null>
	>;
}

export function ImageConfirm({
	pictureSource,
	setPictureSource,
}: ImageConfirmProps) {
	const lang = useLang();
	const colors = useColors();
	const styles = createStyles({ colors });

	const { user } = useUser();

	const [error, setError] = useState<null | ResponseCode>(null);
	const [loading, setLoading] = useState(false);
	const [confirmed, setConfirmed] = useState(false);
	const [uploaded, setUploaded] = useState(false);

	const [id, setId] = useState<null | string>(null);

	const navigation =
		useNavigation<NativeStackNavigationProp<TranslationsParamList>>();

	async function upload() {
		// Salva o arquivo na nuvem
		setLoading(true);
		setError(null);

		const token = await SecureStore.getItemAsync("token");

		if (token) {
			try {
				if (!id) return;

				const response = await uploadImage({
					uri: pictureSource.uri,
					id,
				});
				navigation.navigate("Watch", {
					id: response.id,
				});

				setLoading(false);
				setConfirmed(false);
				setPictureSource(null);
				setId(null);
			} catch (err) {
				setLoading(false);
				setError("unknown_err");
				log("Erro ao enviar imagem: " + err, { color: "fgRed" });
			}
		}

		cancel();
	}

	async function save() {
		// Salva o arquivo localmente
		setLoading(true);

		dayjs.locale(lang.locale === "pt" ? pt : en);
		const id = uuid();
		const title = dayjs(new Date()).format(lang.camera.date_format);
		const location = `${FileSystem.documentDirectory}${id}.jpg`;
		console.log(`Copiando para ${location}`);

		await FileSystem.copyAsync({
			from: pictureSource.uri,
			to: location,
		});

		const file: Partial<FileProps> = {
			authorId: user.id,
			createdAt: new Date(),
			id,
			title,
			location,
			type: "i",
		};

		await Storage.pushItem("translations", file, true);

		setId(id);
		setLoading(false);
		setConfirmed(true);
	}

	function cancel() {
		setLoading(false);
		setPictureSource(null);
		setConfirmed(false);
		setId(null);
	}

	function back() {
		setLoading(false);
		setPictureSource(null);
		setConfirmed(false);
	}

	if (confirmed) {
		return (
			<View style={styles.container}>
				<View style={styles.upload}>
					<View>
						<Font family="black" style={styles.mediaSentTitle}>
							{lang.camera.media_sent.title}
						</Font>
						<Font style={styles.text}>
							{lang.camera.media_sent.text}
						</Font>
					</View>
					<View>
						<Button highlight onPress={upload} loading={loading}>
							{lang.camera.media_sent.upload}
						</Button>
						<Button onPress={back} disabled={loading}>
							{lang.camera.media_sent.cancel}
						</Button>
					</View>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Font family="black" style={styles.title}>
					{lang.camera.picture_finished.title}
				</Font>
				<Image source={pictureSource} style={styles.image} />
				{error && (
					<Font style={styles.error}>
						{lang.general.err_codes[error]}
					</Font>
				)}
				<View style={styles.options}>
					<Button
						label={lang.general.modal.cancel}
						onPress={cancel}
						disabled={loading}
					/>
					<Button
						label={lang.general.modal.confirm}
						highlight
						loading={loading}
						onPress={save}
					/>
				</View>
			</View>
		</View>
	);
}
