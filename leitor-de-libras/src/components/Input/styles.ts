import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";

interface InputStyle {
    colors: ThemeProps;
    transparent?: boolean;
}

export default ({ colors, transparent }: InputStyle) => StyleSheet.create({
    container: {
        paddingBottom: transparent ? 0 : 10
    },
    label: {
        fontSize: 14,
        marginBottom: 10
    },
    input: {
        paddingVertical: transparent ? 0 : 5,
        paddingHorizontal: transparent ? 0 : 15,
        backgroundColor: transparent ? "transparent" : colors.background2,
        fontSize: 14,
        borderRadius: 12,
        fontFamily: "Rubik",
        color: colors.font
    }
});
