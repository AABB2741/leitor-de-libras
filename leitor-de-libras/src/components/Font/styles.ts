import { StyleSheet } from 'react-native';
import { ThemeProps } from '../../theme/getTheme';

interface FontStyle {
    colors: ThemeProps;
}

export default ({ colors }: FontStyle) => StyleSheet.create({
    text: {
        color: colors.font
    }
});
