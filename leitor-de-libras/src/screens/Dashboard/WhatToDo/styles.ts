import { StyleSheet } from 'react-native';
import Theme from "../../../@types/Theme";

interface Props {
    colors: Theme;
}

export default ({ colors }: Props) => StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colors.background2,
        alignItems: "center",
        borderRadius: 16
    },
    label: {
        fontSize: 12,
        textAlign: "center"
    }
});
