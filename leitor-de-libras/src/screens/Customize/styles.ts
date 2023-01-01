import { StyleSheet } from 'react-native';
import Theme from "../../@types/Theme";

interface CustomizeStyle {
    colors: Theme;
}

export default ({ colors }: CustomizeStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    }
});
