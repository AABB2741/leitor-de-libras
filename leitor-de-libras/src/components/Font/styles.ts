import { StyleSheet } from 'react-native';
import Theme from '../../@types/Theme';

interface FontStyle {
    colors: Theme;
}

export default ({ colors }: FontStyle) => StyleSheet.create({
    text: {
        color: colors.font
    }
});
