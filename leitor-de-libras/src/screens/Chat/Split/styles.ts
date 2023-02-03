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
        backgroundColor: colors.header
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
