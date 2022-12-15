import {
    View
} from "react-native";

import Font from "../../components/Font";
import { useColors } from "../../contexts/Colors";

import createStyles from "./styles";

export default function Dashboard() {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            <Font preset="title">Bolsonaro no vasco</Font>
        </View>
    );
}
