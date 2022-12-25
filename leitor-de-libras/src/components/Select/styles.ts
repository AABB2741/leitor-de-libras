import { StyleSheet } from 'react-native';
import Theme from "../../@types/Theme";

interface Props {
    colors: Theme;
}

export default ({ colors }: Props) => StyleSheet.create({
    container: {
        backgroundColor: colors.background2,
        paddingVertical: 5,
        paddingRight: 10,
        paddingLeft: 15,
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    label: {
        fontSize: 14
    },
    indicator: {
        marginLeft: 10
    }
});
