import { StyleSheet } from 'react-native';
import Theme from "../../@types/Theme";

interface LearnStyle {
    colors: Theme;
}

export default ({ colors }: LearnStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    }
});
