import { StyleSheet } from 'react-native';
import Theme from '../../@types/Theme';

interface Props {
    colors: Theme;
}

export default ({ colors }: Props) => StyleSheet.create({
    text: {
        color: colors.font
    }
});
