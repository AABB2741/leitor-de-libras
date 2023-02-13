import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../../theme/getTheme';

interface TipsStyle {
    colors: ThemeProps;
}

export default ({ colors }: TipsStyle) => StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 20
    },
    content: {
        fontSize: 14
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        padding: 5
    },
    visit: {
        flexDirection: "row",
        alignItems: "center"
    },
    options: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    visitLabel: {
        fontSize: 14,
        color: colors.accent,
        marginRight: 10
    }
});
