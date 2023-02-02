import { StyleSheet } from "react-native";
import { ThemeProps } from "../../../theme/getTheme";

interface SplitStyle {
    colors: ThemeProps;
}

export default ({ colors }: SplitStyle) => StyleSheet.create({
    container: {
        backgroundColor: "red",
        height: 3
    }
});
