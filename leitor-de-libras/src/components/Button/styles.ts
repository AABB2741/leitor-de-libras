import { StyleSheet } from 'react-native';
import Theme from "../../@types/Theme";

interface ButtonStyle {
    colors: Theme;
    accentColor?: string;
}

export default ({ colors, accentColor }: ButtonStyle) => StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginTop: 10,
        alignItems: "center"
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
