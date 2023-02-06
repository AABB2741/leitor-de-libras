import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../theme/getTheme';

interface ConversationsStyle {
    colors: ThemeProps;
}

export default ({ colors }: ConversationsStyle) => StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background
    },
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    create: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background2,
        marginHorizontal: 20,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 20,
        padding: 0
    },
    createLabel: {
        color: colors.check,
        marginLeft: 10,
        fontSize: 13
    }
});
