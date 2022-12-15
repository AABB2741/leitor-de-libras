import {
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
            <Font preset="text">Bolsonaro no Vasco</Font>
        </View>
    );
}
