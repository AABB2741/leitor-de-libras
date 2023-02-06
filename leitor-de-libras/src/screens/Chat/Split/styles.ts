import { StyleSheet } from "react-native";
import { ThemeProps } from "../../../theme/getTheme";
import Constants from "expo-constants";

interface SplitStyle {
    colors: ThemeProps;
    mode: "split" | "normal";
}

export default ({ colors, mode }: SplitStyle) => StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.header,
        paddingTop: mode === "normal" ? Constants.statusBarHeight : 0
    },
    options: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 25,
        overflow: "hidden"
    },
    option: {
        padding: 10
    },
    switch: {
        padding: 10,
        borderRadius: 50
    }
});
