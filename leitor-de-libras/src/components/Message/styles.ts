import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";

import Constants from "expo-constants";

interface MessageStyle {
    colors: ThemeProps;
}

export default ({ colors }: MessageStyle) => StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.background,
        paddingBottom: 20
    },
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight
    },
    content: {
        padding: 20
    },
    title: {
        fontSize: 20,
        flex: 1,
        textAlign: "center"
    },
    text: {
        fontSize: 14,
        flex: 1,
        textAlign: "center"
    },
    image: {
        flex: 1,
        width: 200,
        height: 200,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 20
    },
    options: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20
    }
});
