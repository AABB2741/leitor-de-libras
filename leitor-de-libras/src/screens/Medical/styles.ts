import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../theme/getTheme';

interface CustomizeStyle {
    colors: ThemeProps;
}

export default ({ colors }: CustomizeStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    }
});
