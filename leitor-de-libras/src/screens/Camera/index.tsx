import { useState, useCallback, useRef } from "react";
import {
	Linking,
	Modal,
	Platform,
	StatusBar,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";
import {
	Camera as ExpoCamera,
	CameraType,
	FlashMode,
	CameraCapturedPicture,
} from "expo-camera";
import {
	Camera as CameraIcon,
	CameraRotate,
	FilmStrip,
	Lightning,
	LightningSlash,
	Stop,
	VideoCamera,
	X,
} from "phosphor-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";
import * as ImagePicker from "expo-image-picker";

import Button from "../../components/Button";
import VideoConfirm from "./VideoConfirm";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import Popup, { PopupProps } from "../../components/Popup";

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import createStyles from "./styles";
import log from "../../utils/log";
import { ImageConfirm } from "./ImageConfirm";

interface CameraProps {
	navigation: BottomTabNavigationProp<AppRoutes, "Camera">;
}

export type VideoSource = { uri: string };

export default function Camera({ navigation, ...rest }: CameraProps) {
	const dimensions = useWindowDimensions();
	const lang = useLang();
	const colors = useColors();
	const styles = createStyles({ colors });

	const cameraRef = useRef<ExpoCamera>(null);

	const [mode, setMode] = useState<"video" | "photo">("photo");
	const [videoConfirmVisible, setVideoConfirmVisible] = useState(false);
	const [message, setMessage] = useState<PopupProps | null>(null);
	const [recording, setRecording] = useState(false);
	const [focused, setFocused] = useState(false);
	const [flash, setFlash] = useState<FlashMode>(FlashMode.off);
	const [type, setType] = useState<CameraType.back | CameraType.front>(
		CameraType.back
	);
	const [permission, requestPermission] = ExpoCamera.useCameraPermissions();
	const [microphonePermission, requestMicrophonePermission] =
		ExpoCamera.useMicrophonePermissions();
	const [videoSource, setVideoSource] = useState<null | VideoSource>(null);
	const [pictureSource, setPictureSource] =
		useState<CameraCapturedPicture | null>(null);

	async function handleRequestPermission() {
		if (Platform.OS === "android") {
			Linking.openSettings();
		} else {
			Linking.canOpenURL("app-settings:").then((supported) => {
				if (supported) {
				} else {
					setMessage({
						title: lang.camera.open_settings_failed.title,
						text: lang.camera.open_settings_failed.text,
					});
				}
			});
		}
	}

	useFocusEffect(
		useCallback(() => {
			log("Iniciando câmera...", { color: "fgGray" });
			setFocused(true);
			return () => setFocused(false);
		}, [])
	);

	// FIXME: Tentar fazer com que a gravação seja interrompida quando o botão de voltar for pressionado
	// useEffect(useCallback(() => {
	//     function handleBack() {
	//         if (videoConfirmVisible) {
	//             setVideoConfirmVisible(false);
	//             return true;
	//         }

	//         if (recording) {
	//             console.log("Cancelando");
	//             handleStopRecording();
	//             return true;
	//         }

	//         return false;
	//     }

	//     console.log("subscrevendo");
	//     const sub = BackHandler.addEventListener("hardwareBackPress", handleBack);
	//     return () => {
	//         console.log("Cancelando subscrição");
	//         sub.remove();
	//     };
	// }, [videoConfirmVisible, recording]));

	if (!focused) {
		return null;
	}

	function trigger() {
		// recording ? () => handleStopRecording(true) : handleStartRecording
		if (mode === "photo") {
			handleTakePhoto();
		} else {
			if (recording) {
				handleStopRecording(true);
			} else handleStartRecording();
		}
	}

	async function handleStartRecording() {
		if (!cameraRef.current) return;

		try {
			handleStopRecording();
			log("Iniciando gravação de vídeo");
			setRecording(true);
			const video = await cameraRef.current.recordAsync();
			setVideoSource(video);
			console.log("Gravação concluída");
		} catch (e) {
			log(`Erro ao iniciar gravação de vídeo:\n${e}`, { color: "fgRed" });
			setRecording(false);
			setMessage({
				title: lang.camera.recording_failed.title,
				text: lang.camera.recording_failed.text.replace(
					"%s",
					e as string
				),
				onRequestClose: () => setMessage(null),
			});
		}
	}

	function handleStopRecording(userAction?: boolean) {
		if (!cameraRef.current) return;

		log("Encerrando gravação de vídeo");
		cameraRef.current.stopRecording();
		setRecording(false);

		if (userAction) {
			setVideoConfirmVisible(true);
		}
	}

	async function handleTakePhoto() {
		if (!cameraRef.current) return;

		log("Tirando foto!");
		const photo = await cameraRef.current.takePictureAsync();
		setPictureSource(photo);
	}

	async function handlePick() {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
			allowsMultipleSelection: false,
		});

		if (result.canceled || !result.assets[0]) return;

		let res = result.assets[0];

		if (res.type === "image") {
			setPictureSource({
				width: res.width,
				height: res.height,
				uri: res.uri,
			});
		} else if (res.type === "video") {
			setVideoSource({
				uri: res.uri,
			});
			setVideoConfirmVisible(true);
		}
	}

	// TODO: Fazer função para pedir permissão. Se não tiver como pedir, exibir a mensagem de erro para abrir as configurações
	if (!permission || !microphonePermission) {
		log("Verificando permissões...", { color: "fgGray" });
		return (
			<View style={styles.loading}>
				<Loading />
			</View>
		);
	}

	if (!permission.granted || !microphonePermission.granted) {
		log("Permissão não concedida", { color: "fgGray" });
		if (!permission.granted && permission.canAskAgain) {
			log("Solicitando permissão para usar câmera", { color: "fgGray" });
			requestPermission().then((response) => {
				console.log(response);
			});
			return <View style={styles.container} />;
		}

		if (!microphonePermission.granted && microphonePermission.canAskAgain) {
			log("Solicitando permissão para usar microfone", {
				color: "fgGray",
			});
			requestMicrophonePermission().then((response) => {
				console.log(response);
			});
			return <View style={styles.container} />;
		}

		return (
			<Message
				title={lang.camera.request_permission.title}
				text={lang.camera.request_permission.text.replace(
					"%s",
					lang.camera.request_permission.button
				)}
				image={
					colors.themeType === "light"
						? require("../../../assets/imgs/camera-permission-light.png")
						: require("../../../assets/imgs/camera-permission-dark.png")
				}
				options={[
					{
						label: lang.camera.request_permission.button,
						highlight: true,
						style: { flex: 1 },
						onPress: handleRequestPermission,
					},
				]}
			/>
		);
	}

	if (videoConfirmVisible && videoSource) {
		return (
			<VideoConfirm
				source={videoSource}
				setSource={setVideoSource}
				setVideoConfirmVisible={setVideoConfirmVisible}
				visible={videoConfirmVisible}
			/>
		);
	}

	if (pictureSource) {
		return (
			<ImageConfirm
				pictureSource={pictureSource}
				setPictureSource={setPictureSource}
			/>
		);
	}

	log("Renderizando câmera", { color: "fgGray" });
	return (
		<Modal onRequestClose={recording ? () => null : navigation.goBack}>
			<StatusBar translucent backgroundColor="transparent" />
			{message && <Popup {...message} visible />}
			<View style={styles.container}>
				<View style={styles.content}>
					<ExpoCamera
						style={styles.camera}
						type={type}
						flashMode={flash}
						ratio="1:1"
						ref={cameraRef}
					/>
					<View style={styles.overlay}>
						<View style={styles.top}>
							<TouchableOpacity
								onPress={() =>
									setFlash(
										flash === FlashMode.off
											? FlashMode.torch
											: FlashMode.off
									)
								}
								style={
									type === CameraType.front && {
										display: "none",
									}
								}
							>
								{flash === FlashMode.off && (
									<LightningSlash color={colors.font2} />
								)}
								{flash === FlashMode.torch && (
									<Lightning
										weight="fill"
										color={colors.font2}
									/>
								)}
							</TouchableOpacity>
							<TouchableOpacity onPress={navigation.goBack}>
								<X color={colors.font2} />
							</TouchableOpacity>
						</View>
						<View style={styles.bottom}>
							<View style={styles.mode}>
								<Button
									label={lang.camera.mode.photo}
									highlight={mode === "photo"}
									accentColor={colors.accent2}
									onPress={() => setMode("photo")}
								/>
								<Button
									label={lang.camera.mode.video}
									highlight={mode === "video"}
									accentColor={colors.accent2}
									onPress={() => setMode("video")}
								/>
							</View>
							<View style={styles.options}>
								{!recording && (
									<TouchableOpacity onPress={handlePick}>
										<FilmStrip
											size={32}
											color={colors.font2}
										/>
									</TouchableOpacity>
								)}
								<TouchableOpacity
									style={styles.record}
									onPress={trigger}
								>
									{mode === "video" &&
										(recording ? (
											<Stop
												size={32}
												color={colors.font2}
												weight="fill"
											/>
										) : (
											<VideoCamera
												size={32}
												color={colors.font2}
											/>
										))}
									{mode === "photo" && (
										<CameraIcon
											size={32}
											color={colors.font2}
										/>
									)}
								</TouchableOpacity>
								{!recording && (
									<TouchableOpacity
										onPress={() =>
											setType(
												type === CameraType.back
													? CameraType.front
													: CameraType.back
											)
										}
									>
										<CameraRotate
											size={32}
											color={colors.font2}
										/>
									</TouchableOpacity>
								)}
							</View>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
}
