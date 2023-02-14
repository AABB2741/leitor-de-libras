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
        padding: 20,
        paddingTop: 0
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
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    fullArticle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.background2,
        borderRadius: 30
    },
    fullArticleLabel: {
        color: colors.accent,
        fontSize: 12,
        marginRight: 10
    }
});
