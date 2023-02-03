import { StyleSheet } from "react-native";
import { ThemeProps } from "../../../theme/getTheme";

interface SplitStyle {
    colors: ThemeProps;
}

export default ({ colors }: SplitStyle) => StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20
    },
    line: {
        position: "absolute",
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: colors.border
    },
    options: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 25,
        overflow: "hidden",
        backgroundColor: colors.background2,
        paddingHorizontal: 10
    },
    option: {
        padding: 10
    },
    switch: {
        backgroundColor: colors.accent,
        padding: 10,
        borderRadius: 50
    }
});
