import { StyleSheet } from "react-native";

import { ThemeProps } from './../../theme/getTheme';

interface InputStyle {
    colors: ThemeProps;
    transparent?: boolean;
    noTopPadding?: boolean;
    value?: string;
    custom_fonts: boolean;
}

export default ({ colors, noTopPadding, transparent, value, custom_fonts }: InputStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "green"
    },
    label: {
        marginTop: noTopPadding ? 0 : 20,
        marginBottom: 10,
        backgroundColor: "violet"
    },
    content: {
        borderRadius: 12,
        // backgroundColor: transparent ? "transparent" : colors.background2,
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
        backgroundColor: "blue"
    },
    input: {
        paddingVertical: transparent ? 0 : 5,
        paddingLeft: transparent ? 0 : 15,
        paddingRight: (!transparent && !value) ? 20 : 0,
        color: colors.font,
        fontFamily: custom_fonts ? "Rubik" : undefined,
        flex: 1,
        fontSize: 14,
        backgroundColor: "pink"
    },
    clear: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: transparent ? 0 : 15
    }
});
