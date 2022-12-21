import { StyleSheet } from 'react-native';
import Theme from "../../../@types/Theme";

interface Props {
    colors: Theme;
}

export default ({ colors }: Props) => StyleSheet.create({
    container: {
        marginRight: 7,
        padding: 10,
        backgroundColor: colors.background2,
        borderRadius: 12,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    label: {
        textAlign: "center",
        marginTop: 5,
        fontSize: 12
    }
});
