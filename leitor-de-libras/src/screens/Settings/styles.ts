import { StyleSheet } from 'react-native';
import Theme from "../../@types/Theme";

interface SettingsStyle {
    colors: Theme;
}

export default ({ colors }: SettingsStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    presentation: {
        padding: 20,
        paddingVertical: 50,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        marginTop: 5,
        fontSize: 20
    }
});
