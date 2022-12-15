import { StyleSheet } from 'react-native';
import Theme from "../../@types/Theme";

interface Props {
    colors: Theme;
}

export default ({ colors }: Props) => StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.header
    },
    headerPadding: {
        paddingHorizontal: 20,
        paddingVertical: 12.5
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: 14
    },
    headerRight: {

    },
    headerOption: {
        padding: 10
    }
});
