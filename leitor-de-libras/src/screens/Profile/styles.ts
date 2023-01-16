import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { ThemeProps } from '../../theme/getTheme';

interface ProfileStyle {
    colors: ThemeProps;
}

export default ({ colors }: ProfileStyle) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: colors.background
    },
    contentContainer: {
        padding: 20
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    userInfos: {
        flex: 1,
        paddingHorizontal: 15
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    userName: {
        fontSize: 16
    },
    userEmail: {
        fontSize: 14,
        color: colors.desc
    }
});
