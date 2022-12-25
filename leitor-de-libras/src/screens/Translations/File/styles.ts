import { StyleSheet } from 'react-native';
import Theme from "../../../@types/Theme";

interface Props {
    colors: Theme;
}

export default ({ colors }: Props) => StyleSheet.create({
    container: {
        flex: 1 / 3,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    thumbnail: {
        backgroundColor: colors.background2,
        width: "100%",
        height: 75,
        borderRadius: 16
    },
    title: {
        marginTop: 5,
        fontSize: 12
    },
    date: {
        color: colors.desc,
        fontSize: 10
    }
});
