import { StyleSheet } from 'react-native';
import Theme from "../../../@types/Theme";

interface WhatToDoStyle {
    colors: Theme;
}

export default ({ colors }: WhatToDoStyle) => StyleSheet.create({
    container: {
        padding: 15,
        width: 100,
        height: 100,
        marginRight: 10,
        backgroundColor: colors.background2,
        alignItems: "center",
        borderRadius: 16,
        justifyContent: "space-between"
    },
    label: {
        fontSize: 12,
        textAlign: "center"
    }
});
