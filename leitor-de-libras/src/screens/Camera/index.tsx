import { useState, useCallback } from "react";
import {
    ImageBackground,
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
import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";

import Font from "../../components/Font";
import Loading from "../../components/Loading";
import Message from "../../components/Message";

import createStyles from "./styles";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { CameraRotate, FilmStrip, Lightning, LightningSlash, VideoCamera } from "phosphor-react-native";

interface CameraProps {
    navigation: BottomTabNavigationProp<AppScreens, "Camera">;
}

export default function Camera({ navigation, ...rest }: CameraProps) {
    const dimensions = useWindowDimensions();
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [focused, setFocused] = useState(false);
    const [flash, setFlash] = useState<number | FlashMode | undefined>(FlashMode.off);
    const [type, setType] = useState<CameraType.back | CameraType.front>(CameraType.back);
    const [permission, requestPermission] = ExpoCamera.useCameraPermissions();

    async function handleRequestPermission() {
        console.log("Solicitando permissão")
        console.log(permission?.canAskAgain)
    }

    useFocusEffect(useCallback(() => {
        setFocused(true);
        return () => setFocused(false);
    }, []));

    if (!focused) {
        return null;
    }
    // TODO: Fazer função para pedir permissão. Se não tiver como pedir, exibir a mensagem de erro para abrir as configurações
    if (!permission) {
        return (
            <View style={styles.loading}>
                <Loading />
            </View>
        );
    }

    if (!permission.granted) {
        if (permission.canAskAgain) {
            requestPermission().then(response => {
                console.log(response);
            });
            return <View style={styles.container} />;
        }
        
        return (
            <Message
                title={lang.camera.request_permission.title}
                text={lang.camera.request_permission.text}
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
    
    return (
        <View style={styles.container}>
            {/* <ImageBackground source={require("../../../assets/camera-example.png")} style={styles.camera} /> */}
            <StatusBar barStyle="light-content" />
            <ExpoCamera style={styles.camera} type={type} flashMode={flash} ratio="16:9">
                <View style={styles.overlay}>
                    <View style={styles.top}>
                        <TouchableOpacity onPress={() => setFlash(flash === FlashMode.off ? FlashMode.torch : FlashMode.off)}>
                            {flash === FlashMode.off && <LightningSlash color={colors.font2} />}
                            {flash === FlashMode.torch && <Lightning weight="fill" color={colors.font2} />}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                        <View style={styles.options}>
                            <FilmStrip size={24} color={colors.font2} />
                            <TouchableOpacity style={styles.record}>
                                <VideoCamera size={36} color={colors.font2} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}>
                                <CameraRotate size={24} color={colors.font2} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ExpoCamera>
        </View>
    );
}
