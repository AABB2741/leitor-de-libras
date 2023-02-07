import { StyleSheet } from 'react-native';
import { ThemeProps } from '../../theme/getTheme';

interface ButtonStyle {
    colors: ThemeProps;
    accentColor?: string;
    disabled?: boolean;
}

export default ({ colors, accentColor, disabled }: ButtonStyle) => StyleSheet.create({
    container: {
        opacity: disabled ? 0.5 : 1,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    loading: {
        marginRight: 10
    },
    label: {
        color: accentColor ?? colors.accent,
        fontSize: 14,
        textAlign: "center"
    },
    highlight: {
        backgroundColor: accentColor ?? colors.accent
    },
    labelHighlight: {
        color: colors.font2
    }
});
