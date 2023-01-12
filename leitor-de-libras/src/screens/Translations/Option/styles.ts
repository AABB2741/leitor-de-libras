import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../../theme/getTheme';

interface OptionStyle {
    colors: ThemeProps;
}

export default ({ colors }: OptionStyle) => StyleSheet.create({
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
