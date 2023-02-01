import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";
import Constants from "expo-constants";

interface MessageStyle {
    colors: ThemeProps;
}

export default ({ colors }: MessageStyle) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    background: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    content: {
        backgroundColor: colors.modal,
        padding: 20,
        borderRadius: 24,
        marginHorizontal: 20,
        minWidth: 250,
        maxWidth: "100%"
    },
    title: {
        fontSize: 14,
        marginBottom: 10
    },
    text: {
        fontSize: 13
    },
    options: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    }
});
