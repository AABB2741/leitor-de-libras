import { StyleSheet } from "react-native";
import { ImageConfirm } from ".";
import { ThemeProps } from "../../../theme/getTheme";
import Constants from "expo-constants";

interface ImageConfirmStyle {
    colors: ThemeProps;
}

export default ({ colors }: ImageConfirmStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Constants.statusBarHeight
    },
    content: {
        flex: 1,
        padding: 20
    },
    title: {
        flex: 1,
        textAlign: "center",
        marginBottom: 10,
        fontSize: 20
    },
    image: {
        resizeMode: "contain",
        maxHeight: 250
    },
    options: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40
    }
});
