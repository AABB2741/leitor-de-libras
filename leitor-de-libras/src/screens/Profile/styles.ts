import { StyleSheet } from 'react-native';
import Theme from "../../@types/Theme";

interface ProfileStyle {
    colors: Theme;
}

export default ({ colors }: ProfileStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    }
});
