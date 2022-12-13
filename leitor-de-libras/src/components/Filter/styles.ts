import { StyleSheet } from "react-native";
import Theme from "../../@types/Theme"

interface Props {
    colors: Theme;
}

export default ({ colors }: Props) => StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 20
    },
    filter: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    filterInput: {
        marginLeft: 10
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
