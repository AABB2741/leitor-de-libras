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
        paddingTop: 20,
        paddingBottom: 10
    },
    fullArticleLabel: {
        fontSize: 12
    }
});
