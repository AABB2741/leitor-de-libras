import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";
import Constants from "expo-constants";

interface LoginStyle {
    colors: ThemeProps;
}

export default ({ colors }: LoginStyle) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: colors.background
    },
    content: {
        padding: 20
    },
    title: {
        flex: 1,
        textAlign: "center"
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
