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
    logo: {
        width: 150,
        height: 40,
        alignSelf: "center",
        resizeMode: "contain"
    },
    welcome: {
        fontSize: 20,
        paddingHorizontal: 20
    }
})
