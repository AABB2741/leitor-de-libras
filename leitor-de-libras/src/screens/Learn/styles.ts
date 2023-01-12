import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../theme/getTheme';

interface LearnStyle {
    colors: ThemeProps;
}

export default ({ colors }: LearnStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    }
});
