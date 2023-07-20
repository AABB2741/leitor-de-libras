import { Image, ScrollView, View } from "react-native";
import { CameraCapturedPicture } from "expo-camera";
import * as SecureStore from "expo-secure-store";

import Button from "../../../components/Button";
import { useLang } from "../../../contexts/lang";
import { useColors } from "../../../contexts/colors";

import Font from "../../../components/Font";

import createStyles from "./styles";
import { useState } from "react";
import axios from "axios";
import log from "../../../utils/log";
import { api } from "../../../lib/api";

interface ImageConfirmProps {
	pictureSource: CameraCapturedPicture;
	setPictureSource: React.Dispatch<
		React.SetStateAction<CameraCapturedPicture | null>
	>;
}

export function ImageConfirm({ pictureSource }: ImageConfirmProps) {
	const lang = useLang();
	const colors = useColors();
	const styles = createStyles({ colors });

	const [loading, setLoading] = useState(false);

	async function upload() {
		setLoading(true);
		log("Solicitando envio de imagem");

		const token = await SecureStore.getItemAsync("token");
		console.log(`Token: ${token}`);

		if (token) {
			log("Conectando à API para envio de imagem...");
			const uploadResponse = await api.post(
				"/upload",
				{},
				{
					headers: {
						Authorization: token,
					},
				}
			);
			console.log(uploadResponse);
		}

		log("Envio encerrado");
		setLoading(false);
	}

	function cancel() {
		setLoading(false);
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Font family="black" style={styles.title}>
					{lang.camera.picture_finished.title}
				</Font>
				<Image source={pictureSource} style={styles.image} />
				<View style={styles.options}>
					<Button
						label={lang.general.modal.cancel}
						onPress={cancel}
					/>
					<Button
						label={lang.general.modal.confirm}
						highlight
						loading={loading}
						onPress={upload}
					/>
				</View>
			</View>
		</View>
	);
}
