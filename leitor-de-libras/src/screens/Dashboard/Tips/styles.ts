import { StyleSheet } from 'react-native';
import Theme from "../../../@types/Theme";

interface TipsStyle {
    colors: Theme;
}

export default ({ colors }: TipsStyle) => StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    content: {
        fontSize: 16
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
        fontSize: 16,
        color: colors.accent,
        marginRight: 10
    }
});
