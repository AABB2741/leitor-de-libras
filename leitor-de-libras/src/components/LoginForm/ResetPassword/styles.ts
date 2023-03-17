import { StyleSheet } from "react-native";
import { ThemeProps } from "../../../theme/getTheme";
import Constants from "expo-constants"

interface ResetPasswordStyle {
    colors: ThemeProps;
}

export default ({ colors }: ResetPasswordStyle) => StyleSheet.create({
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
    warning: {
        color: colors.critic,
        fontSize: 12,
        textAlign: "center",
        marginBottom: 10
    },
    instructions: {
        marginTop: 20
    }
});
