import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../../theme/getTheme';

interface InfosStyle {
    colors: ThemeProps;
}

export default ({ colors }: InfosStyle) => StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20
    },
    loading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    loadingLabel: {
        color: colors.disabled,
        fontSize: 12,
        marginLeft: 10
    },
    login: {
        flexDirection: "row",
        alignItems: "center"
    },
    loginLabel: {
        marginLeft: 10
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    userContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    userData: {
        flex: 1
    },
    username: {
        fontSize: 14
    },
    email: {
        fontSize: 12,
        color: colors.desc
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        padding: 5
    }
})
