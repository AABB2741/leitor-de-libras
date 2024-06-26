import { StyleSheet } from "react-native";
import { ThemeProps } from "../../../theme/getTheme";

interface LoginStyle {
    colors: ThemeProps;
}

export default ({ colors }: LoginStyle) => StyleSheet.create({
    wrapper: {
        backgroundColor: colors.background,
        flex: 1
    },
    container: {
        flex: 1
    },
    content: {
        padding: 20
    },
    title: {
        flex: 1,
        textAlign: "center",
        marginBottom: 10,
        fontSize: 20
    },
    desc: {
        textAlign: "center",
        flex: 1
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: "center"
    },
    warning: {
        color: colors.critic,
        fontSize: 12,
        textAlign: "center",
        marginBottom: 10
    },
    options: {
        backgroundColor: colors.header,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20
    },
    lang: {
        flexDirection: "row",
        alignItems: "center"
    },
    ignoreLabel: {
        color: colors.accent
    }
});
