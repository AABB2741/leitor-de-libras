import { useState } from "react";
import {
    ImageBackground,
    useWindowDimensions,
    View
} from "react-native";
import { useColors } from "../../contexts/Colors";
import { Camera as ExpoCamera, CameraType } from "expo-camera";

import Font from "../../components/Font";

import createStyles from "./styles";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

interface Props {
    navigation: BottomTabNavigationProp<RootStackParamList, "Camera">;
}

export default function Camera({ navigation, ...rest }: Props) {
    const dimensions = useWindowDimensions();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [type, setType] = useState<CameraType.back | CameraType.front>(CameraType.back);
    const [permission, requestPermission] = ExpoCamera.useCameraPermissions();

    if (!permission)
        return null;

    if (!permission.granted) {
        requestPermission();
        return null;
    }
    
    return (
        <View style={styles.container}>
            {/* <ImageBackground source={require("../../../assets/camera-example.png")} style={styles.camera} /> */}
            <ExpoCamera style={styles.camera} type={CameraType.back} ratio="16:9">
                <View style={styles.overlay}>
                    <View style={styles.top}>
                        <Font preset="title">Opções superiores</Font>
                    </View>
                    <View style={styles.bottom}>

                    </View>
                </View>
            </ExpoCamera>
        </View>
    );
}
