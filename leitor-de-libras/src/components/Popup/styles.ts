import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";
import Constants from "expo-constants";

interface PopupStyle {
    colors: ThemeProps;
    loading?: boolean;
}

export default ({ colors }: PopupStyle) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: Constants.statusBarHeight,
        borderTopColor: "#fff"
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
        flex: 1
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
