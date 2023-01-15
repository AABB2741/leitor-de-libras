import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { ThemeProps } from '../../theme/getTheme';

interface ConfigureStyle {
    colors: ThemeProps;
}

export default ({ colors }: ConfigureStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    emptyContainer: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20
    },
    statusBarFix: {
        height: Constants.statusBarHeight,
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
    },
    desc: {
        fontSize: 14,
        marginTop: 10,
        color: colors.desc,
        textAlign: "center"
    },
    content: {
        padding: 20
    }
});
