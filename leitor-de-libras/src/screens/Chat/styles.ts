import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";

import Constants from "expo-constants";

interface ChatStyle {
    colors: ThemeProps;
}

export default ({ colors }: ChatStyle) => StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background
    },
    statusBarFix: {
        height: Constants.statusBarHeight,
        backgroundColor: colors.background
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingVertical: 20
    },
    controls: {

    }
});
