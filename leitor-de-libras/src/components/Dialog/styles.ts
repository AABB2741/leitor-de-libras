import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";

interface DialogStyle {
    colors: ThemeProps;
}

export default ({ colors }: DialogStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20
    },
    close: {
        marginLeft: "auto"
    },
    title: {
        textAlign: "center",
        marginVertical: 10
    },
    desc: {
        color: colors.desc,
        fontSize: 16,
        textAlign: "center"
    }
});
