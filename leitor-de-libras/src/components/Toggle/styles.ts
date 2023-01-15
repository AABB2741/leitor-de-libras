import {
    StyleSheet
} from "react-native";
import { ThemeProps } from "../../theme/getTheme";

interface ToggleStyle {
    colors: ThemeProps;
}

export default ({ colors }: ToggleStyle) => StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    label: {

    }
});
