import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../theme/getTheme';

interface DashboardStyle {
    colors: ThemeProps;
}

export default ({ colors }: DashboardStyle) => StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: colors.background,
        flex: 1
    },
    welcome: {
        fontSize: 20,
        paddingHorizontal: 20
    }
})
