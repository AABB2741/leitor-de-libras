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
    }
});
