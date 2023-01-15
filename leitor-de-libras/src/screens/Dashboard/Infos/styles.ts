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
        fontSize: 16
    },
    email: {
        fontSize: 14,
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
