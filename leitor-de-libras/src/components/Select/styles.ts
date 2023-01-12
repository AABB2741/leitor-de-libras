import { StyleSheet } from 'react-native';

import { ThemeProps } from './../../theme/getTheme';

interface SelectStyle {
    colors: ThemeProps;
}

export default ({ colors }: SelectStyle) => StyleSheet.create({
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
