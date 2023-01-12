import {
    View
} from "react-native";
import { useColors } from "../../contexts/colors";
import createStyles from "./styles";

export default function Customize() {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>

        </View>
    );
}
