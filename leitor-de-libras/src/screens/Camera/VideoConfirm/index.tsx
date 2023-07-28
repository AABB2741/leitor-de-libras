import { Modal, ModalProps, TouchableOpacity, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import dayjs from "dayjs";
import pt from "dayjs/locale/pt-br";
import en from "dayjs/locale/en";
import { v4 as uuid } from "uuid";
import * as FileSystem from "expo-file-system";
import * as Storage from "../../../services/Storage";

import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";

import Font from "../../../components/Font";

import createStyles from "./styles";
import { useState } from "react";
import { VideoSource } from "..";

interface VideoConfirmProps extends ModalProps {
	source: VideoSource;
	setVideoConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VideoConfirm({
	source,
	setVideoConfirmVisible,
	...rest
}: VideoConfirmProps) {
	const lang = useLang();
	const colors = useColors();
	const styles = createStyles({ colors });

	const [loading, setLoading] = useState(false);

	async function save() {
		setLoading(true);

		try {
			dayjs.locale(lang.locale === "pt" ? pt : en);
			const id = uuid();
			const title = dayjs(new Date())
				.format(lang.camera.date_format)
				.concat(` - ${id}`);

			// Salvando arquivo localmente
			const location = `${FileSystem.documentDirectory}${id}.mp4`;

			await FileSystem.copyAsync({
				from: source.uri,
				to: location,
			});

			await Storage.pushItem("translations", {
				id,
				title,
				location,
				createdAt: new Date(),
				updatedAt: new Date(),
				type: "v",
			});
		} catch (err) {
			console.error(err);
		}

		setLoading(false);
	}

	return (
		<Modal
			{...rest}
			onRequestClose={() => setVideoConfirmVisible(false)}
			animationType="fade"
		>
			<View style={styles.container}>
				<Video
					style={styles.video}
					source={source}
					useNativeControls
					resizeMode={ResizeMode.CONTAIN}
				/>
				<Font family="black" style={styles.title}>
					{lang.camera.recording_finished.text}
				</Font>
				<View style={styles.options}>
					<TouchableOpacity
						disabled={loading}
						onPress={() => setVideoConfirmVisible(false)}
					>
						<Font family="ubuntu" style={styles.optionLabel}>
							{lang.camera.recording_finished.discard}
						</Font>
					</TouchableOpacity>
					<TouchableOpacity onPress={save} disabled={loading}>
						<Font family="ubuntu" style={styles.optionLabel}>
							{lang.camera.recording_finished.ok}
						</Font>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
