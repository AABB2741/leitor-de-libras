import {
    useEffect,
    useState,
    useCallback,
    useRef
} from "react";
import {
    BackHandler,
    ImageBackground,
    Linking,
    Modal,
    Platform,
    StatusBar,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import {
    Camera as ExpoCamera,
    CameraType,
    FlashMode,
    PermissionResponse
} from "expo-camera";
import {
    Camera as CameraIcon,
    CameraRotate,
    FilmStrip,
    Lightning,
    LightningSlash,
    Stop,
    VideoCamera,
    X
} from "phosphor-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";
import { AVPlaybackSource } from "expo-av/build/AV.types";

import Button from "../../components/Button";
import Font from "../../components/Font";
import VideoConfirm from "./VideoConfirm";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import Popup, { PopupProps } from "../../components/Popup";

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import createStyles from "./styles";
import log from "../../utils/log";

interface CameraProps {
    navigation: BottomTabNavigationProp<AppRoutes, "Camera">;
}

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
    const [type, setType] = useState<CameraType.back | CameraType.front>(CameraType.back);
    const [permission, requestPermission] = ExpoCamera.useCameraPermissions();
    const [microphonePermission, requestMicrophonePermission] = ExpoCamera.useMicrophonePermissions();
    const [videoSource, setVideoSource] = useState<null | AVPlaybackSource>(null);

    async function handleRequestPermission() {
        if (Platform.OS === "android") {
            Linking.openSettings();
        } else {
            Linking.canOpenURL("app-settings:").then(supported => {
                if (supported) {

                } else {
                    setMessage({
                        title: lang.camera.open_settings_failed.title,
                        text: lang.camera.open_settings_failed.text
                    });
                }
            });
        }
    }

    useFocusEffect(useCallback(() => {
        log("Iniciando câmera...", { color: "fgGray" });
        setFocused(true);
        return () => setFocused(false);
    }, []));

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

    async function handleStartRecording() {
        if (!cameraRef.current)
            return;

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
            setMessage({ title: lang.camera.recording_failed.title, text: lang.camera.recording_failed.text.replace("%s", e as string), onRequestClose: () => setMessage(null) });
        }
    }

    function handleStopRecording(userAction?: boolean) {
        if (!cameraRef.current)
            return;

        log("Encerrando gravação de vídeo");
        cameraRef.current.stopRecording();
        setRecording(false);

        if (userAction) {
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
            requestPermission().then(response => {
                console.log(response);
            });
            return <View style={styles.container} />;
        }

        if (!microphonePermission.granted && microphonePermission.canAskAgain) {
            log("Solicitando permissão para usar microfone", { color: "fgGray" });
            requestMicrophonePermission().then(response => {
                console.log(response);
            });
            return <View style={styles.container} />;
        }

        return (
            <Message
                title={lang.camera.request_permission.title}
                text={lang.camera.request_permission.text.replace("%s", lang.camera.request_permission.button)}
                image={colors.themeType === "light" ? require("../../../assets/imgs/camera-permission-light.png") : require("../../../assets/imgs/camera-permission-dark.png")}
                options={[{
                    label: lang.camera.request_permission.button,
                    highlight: true,
                    style: { flex: 1 },
                    onPress: handleRequestPermission
                }]}
            />
        );
    }

    if (videoConfirmVisible && videoSource) {
        return (
            <VideoConfirm
                source={videoSource}
                setVideoConfirmVisible={setVideoConfirmVisible}
                visible={videoConfirmVisible}
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
                    <ExpoCamera style={styles.camera} type={type} flashMode={flash} ratio="16:9" ref={cameraRef}>
                        <View style={styles.overlay}>
                            <View style={styles.top}>
                                <TouchableOpacity onPress={() => setFlash(flash === FlashMode.off ? FlashMode.torch : FlashMode.off)} style={type === CameraType.front && { display: "none" }}>
                                    {flash === FlashMode.off && <LightningSlash color={colors.font2} />}
                                    {flash === FlashMode.torch && <Lightning weight="fill" color={colors.font2} />}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={navigation.goBack}>
                                    <X color={colors.font2} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bottom}>
                                <View style={styles.mode}>
                                    <Button
                                        label="Foto"
                                        highlight={mode === "photo"}
                                        accentColor={colors.accent2}
                                        onPress={() => setMode("photo")}
                                    />
                                    <Button
                                        label="Vídeo"
                                        highlight={mode === "video"}
                                        accentColor={colors.accent2}
                                        onPress={() => setMode("video")}
                                    />
                                </View>
                                <View style={styles.options}>
                                    {!recording && <FilmStrip size={32} color={colors.font2} />}
                                    <TouchableOpacity style={styles.record} onPress={recording ? () => handleStopRecording(true) : handleStartRecording}>
                                        {mode === "video" && (recording ? <Stop size={32} color={colors.font2} weight="fill" /> : <VideoCamera size={32} color={colors.font2} />)}
                                        {mode === "photo" && <CameraIcon size={32} color={colors.font2} />}
                                    </TouchableOpacity>
                                    {!recording && (
                                        <TouchableOpacity onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}>
                                            <CameraRotate size={32} color={colors.font2} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    </ExpoCamera>
                </View>
            </View>
        </Modal>
    );
}
