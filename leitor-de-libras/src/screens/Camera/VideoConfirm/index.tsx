import { useState } from "react";
import { Modal, ModalProps, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import pt from "dayjs/locale/pt-br";
import en from "dayjs/locale/en";
import { v4 as uuid } from "uuid";
import * as FileSystem from "expo-file-system";
import * as Storage from "../../../services/Storage";
import * as SecureStore from "expo-secure-store";

import { api } from "../../../lib/api";
import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";

import Font from "../../../components/Font";

import { VideoSource } from "..";
import createStyles from "./styles";
import Button from "../../../components/Button";
import { FileProps } from "../../Translations/File";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { uploadVideo } from "../../../services/upload";
import AppError from "../../../errors/AppError";

interface VideoConfirmProps extends ModalProps {
	source: VideoSource;
	setSource: React.Dispatch<React.SetStateAction<null | VideoSource>>;
	setVideoConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VideoConfirm({
	source,
	setSource,
	setVideoConfirmVisible,
	...rest
}: VideoConfirmProps) {
	const lang = useLang();
	const colors = useColors();
	const styles = createStyles({ colors });

	const [loading, setLoading] = useState(false);
	const [confirmed, setConfirmed] = useState(false);

	const [id, setId] = useState<string | null>(null);

	const navigation =
		useNavigation<NativeStackNavigationProp<TranslationsParamList>>();

	function close() {
		setId(null);
		setLoading(false);
		setConfirmed(false);
		setVideoConfirmVisible(false);
		setSource(null);
	}

	async function save() {
		setLoading(true);

		try {
			dayjs.locale(lang.locale === "pt" ? pt : en);
			let id = uuid();
			setId(id);
			const title = dayjs(new Date())
				.format(lang.camera.date_format)
				.concat(` - ${id}`);

			// Salvando arquivo localmente
			const location = `${FileSystem.documentDirectory}${id}.mp4`;

			await FileSystem.copyAsync({
				from: source.uri,
				to: location,
			});

			await Storage.pushItem(
				"translations",
				{
					id,
					title,
					location,
					createdAt: new Date(),
					updatedAt: new Date(),
					type: "v",
				},
				true
			);
		} catch (err) {
			console.error(err);
		}

		setLoading(false);
		setConfirmed(true);
	}

	async function upload() {
		setLoading(true);

		try {
			if (!id) throw new AppError("unknown_err");

			const response = await uploadVideo({
				uri: source.uri,
				id,
			});
			if (!response) throw new AppError("unknown_err");

			navigation.navigate("Watch", {
				id: response.id,
			});
		} catch (err) {
			console.error(err);
		}

		close();
	}

	if (confirmed) {
		return (
			<View style={styles.container}>
				<View style={styles.upload}>
					<View>
						<Font family="black" style={styles.text}>
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
						<Button onPress={close} disabled={loading}>
							{lang.camera.media_sent.cancel}
						</Button>
					</View>
				</View>
			</View>
		);
	}

	return (
		<Modal
			{...rest}
			onRequestClose={() => setVideoConfirmVisible(false)}
			animationType="fade"
		>
			<View style={styles.container}>
				<Font family="black" style={styles.title}>
					{lang.camera.recording_finished.text}
				</Font>
				<Video
					style={styles.video}
					source={source}
					useNativeControls
					resizeMode={ResizeMode.CONTAIN}
				/>
				<View style={styles.options}>
					<Button disabled={loading} onPress={close}>
						{lang.camera.recording_finished.discard}
					</Button>
					<Button disabled={loading} onPress={save} highlight>
						{lang.camera.recording_finished.ok}
					</Button>
				</View>
			</View>
		</Modal>
	);
}
