import {
    View
} from "react-native";
import { useColors } from "../../contexts/Colors";

import createStyles from "./styles";

export default function Settings() {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>

        </View>
    );
}
