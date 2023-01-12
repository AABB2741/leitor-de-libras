import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";

interface FilterStyle {
    colors: ThemeProps;
}

export default ({ colors }: FilterStyle) => StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 20
    },
    filter: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    filterInput: {
        marginHorizontal: 10
    },
    sort: {
        flexDirection: "row",
        alignItems: "center"
    },
    order: {
        paddingLeft: 10,
        marginLeft: 10,
        borderLeftWidth: 1,
        borderLeftColor: colors.desc
    }
});
