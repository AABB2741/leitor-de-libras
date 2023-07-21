import { Image, ScrollView, View } from "react-native";
import { CameraCapturedPicture } from "expo-camera";
import { extname, resolve } from "node:path";
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
import { CheckCircle } from "phosphor-react-native";

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

	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);

	async function upload() {
		setLoading(true);

		const token = await SecureStore.getItemAsync("token");
		console.log(`Token: ${token}`);

		if (token) {
			const imageData = new FormData();
			imageData.append("file", {
				name: `image.jpg`,
				type: "image/jpeg",
				uri: pictureSource.uri,
			} as any);
			const uploadResponse = await api.post("/upload/image", imageData, {
				headers: {
					Authorization: token,
					"Content-Type": "multipart/form-data",
				},
			});

			if (uploadResponse.status === 201) {
				setSent(true);
			}
		}

		setLoading(false);
	}

	function cancel() {
		setLoading(false);
		setPictureSource(null);
	}

	function back() {
		setLoading(false);
		setSent(false);
		setPictureSource(null);
	}

	if (sent) {
		return (
			<View style={styles.container}>
				<View style={styles.content}>
					<View>
						<Font family="black" style={styles.title}>
							{lang.camera.media_sent.title}
						</Font>
						<Font family="regular" style={styles.text}>
							{lang.camera.media_sent.text}
						</Font>
					</View>
					<View style={styles.sentIcon}>
						<CheckCircle color={colors.check} size={128} />
					</View>
					<View>
						<Button
							onPress={back}
							label={lang.camera.media_sent.back}
							highlight
						/>
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
