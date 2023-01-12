import { StyleSheet } from 'react-native';
import { ThemeProps } from '../../theme/getTheme';

interface EmptyStyle {
    colors: ThemeProps;
}

export default ({ colors }: EmptyStyle) => StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        marginVertical: 20
    },
    title: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        textAlign: "center"
    },
    desc: {
        fontSize: 14,
        color: colors.desc,
        textAlign: "center"
    },
    options: {
        marginTop: 10
    }
});
