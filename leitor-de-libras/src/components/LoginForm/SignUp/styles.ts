import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";
import Constants from "expo-constants"

interface SignUptStyle {
    colors: ThemeProps;
}

export default ({ colors }: SignUptStyle) => StyleSheet.create({
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
        flex: 1,
        textAlign: "center",
        marginBottom: 10
    },
    desc: {
        flex: 1,
        textAlign: "center"
    }
});
