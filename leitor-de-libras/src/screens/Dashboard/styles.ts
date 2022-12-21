import { StyleSheet } from 'react-native';
import Theme from "../../@types/Theme";

interface Props {
    colors: Theme;
}

export default ({ colors }: Props) => StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colors.background,
        flex: 1
    },
    welcome: {
        fontSize: 20
    }
})
