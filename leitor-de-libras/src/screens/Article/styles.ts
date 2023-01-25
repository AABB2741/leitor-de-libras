import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";
import Constants from "expo-constants";

interface ArticleStyle {
    colors: ThemeProps;
}

export default ({ colors }: ArticleStyle) => StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Constants.statusBarHeight
    },
    container: {
        flex: 1
    },
    content: {
        padding: 20
    },
    presentation: {
        paddingBottom: 20,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: colors.border
    },
    title: {
        fontSize: 24
    },
    credits: {
        marginTop: 5
    },
    article: {
        lineHeight: 18
    },
    options: {
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 16,
        left: 0,
        right: 0,
        padding: 10,
        borderColor: "red",
    },
    option: {
        height: 40,
        minWidth: 40,
        padding: 10,
        backgroundColor: colors.background2,
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    leftOptions: {
        flexDirection: "row",
        alignItems: "center"
    },
    fullArticleLabel: {
        color: colors.accent,
        fontSize: 12,
        marginRight: 10
    }
});
