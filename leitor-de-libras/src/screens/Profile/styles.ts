import { StyleSheet } from 'react-native';
import Theme from "../../@types/Theme";

interface ProfileStyle {
    colors: Theme;
}

export default ({ colors }: ProfileStyle) => StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: colors.background,
        padding: 20
    }
});
