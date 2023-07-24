import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";

interface WatchStyle {
    colors: ThemeProps;
}

export default ({ colors }: WatchStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    fullScreen: {
        flex: 1,
        height: "100%",
        width: "100%",
        resizeMode: "contain",
        backgroundColor: colors.background
    },
    loading: {
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    video: {
        backgroundColor: colors.background2,
        flex: 1,
        maxHeight: 200
    },
    scroll: {
        flex: 1
    },
    title: {
        padding: 20,
        fontSize: 18
    },
    options: {
        paddingLeft: 20,
        paddingRight: 10
    },
    option: {
        paddingHorizontal: 15,
        paddingVertical: 7,
        backgroundColor: colors.background2,
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10
    },
    optionLabel: {
        marginLeft: 5,
        fontSize: 12
    },
    text: {
        padding: 20,
        fontSize: 14,
        lineHeight: 20
    },
    wordContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20
    },
    word: {
        fontSize: 28,
        padding: 20,
        backgroundColor: colors.background2,
        borderBottomWidth: 5,
        borderBottomColor: colors.accent,
        borderRadius: 12
    }
});
