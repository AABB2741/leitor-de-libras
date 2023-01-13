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
    presentation: {
        padding: 20,
        paddingBottom: 50,
        paddingTop: Constants.statusBarHeight + 50,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        marginTop: 5,
        fontSize: 20
    }
});
