import { StyleSheet } from "react-native";

import { ThemeProps } from "../../theme/getTheme";

interface TranslationsStyle {
    colors: ThemeProps;
}

export default ({ colors }: TranslationsStyle) => StyleSheet.create({
    loading: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.background
    },
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    selected: {
        backgroundColor: colors.header,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    selectedLabel: {
        fontSize: 13,
        color: colors.font
    },
    top: {
        padding: 20,
        paddingTop: 0,
        backgroundColor: colors.background
    },
    optionsContainer: {
        flex: 1,
        backgroundColor: colors.background
    },
    options: {
        padding: 20,
        paddingRight: 13,
        paddingBottom: 0
    },
    files: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 10
    }
});
