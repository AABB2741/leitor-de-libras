import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";

interface LinkStyle {
    colors: ThemeProps;
}

export default ({ colors }: LinkStyle) => StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    label: {
        fontSize: 14,
        color: colors.accent,
        marginRight: 10
    }
});
