import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../../theme/getTheme';

interface WhatToDoStyle {
    colors: ThemeProps;
}

export default ({ colors }: WhatToDoStyle) => StyleSheet.create({
    container: {
        width: 60,
        marginRight: 10,
        alignItems: "center"
    },
    iconContainer: {
        backgroundColor: colors.background2,
        padding: 20,
        borderRadius: 50
    },
    label: {
        marginTop: 10,
        fontSize: 12,
        textAlign: "center",
        flex: 1
    }
});
