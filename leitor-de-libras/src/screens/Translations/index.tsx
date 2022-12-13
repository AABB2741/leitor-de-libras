import {
    Text,
    View
} from "react-native";
import { useColors } from "../../contexts/Colors";

import createStyles from "./styles";

export default function Translations() {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            <Text>Traduções</Text>
        </View>
    );
}
