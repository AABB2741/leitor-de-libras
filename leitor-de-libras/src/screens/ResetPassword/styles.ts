import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";
import Constants from "expo-constants"

interface ResetPasswordStyle {
    colors: ThemeProps;
}

export default ({ colors }: ResetPasswordStyle) => StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: colors.background
    },
    container: {
        flex: 1
    },
    content: {
        padding: 20
    },
    title: {
        textAlign: "center",
        flex: 1,
        marginBottom: 10
    },
    desc: {
        flex: 1,
        textAlign: "center"
    }
});
