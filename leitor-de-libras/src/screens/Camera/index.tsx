import {
    ImageBackground,
    View
} from "react-native";
import { useColors } from "../../contexts/Colors";

import Font from "../../components/Font";

import createStyles from "./styles";

export default function Camera() {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            <View style={styles.overlay}>
                <View style={styles.top}>
                    <Font preset="title">Opções superiores</Font>
                </View>
                <View style={styles.bottom}>

                </View>
            </View>
            <ImageBackground source={require("../../../assets/camera-example.png")} style={styles.camera} />
        </View>
    );
}
