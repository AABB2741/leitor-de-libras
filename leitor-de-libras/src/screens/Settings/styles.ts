import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { ThemeProps } from '../../theme/getTheme';

interface SettingsStyle {
    colors: ThemeProps;
}

export default ({ colors }: SettingsStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    statusBarFix: {
        height: Constants.statusBarHeight,
        backgroundColor: colors.background
    },
    presentation: {
        minHeight: 200,
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: Constants.statusBarHeight + 20,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        marginTop: 5,
        fontSize: 20
    },
    warning: {
        backgroundColor: colors.warn,
        marginHorizontal: 20,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 12
    }
});
