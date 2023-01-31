import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../theme/getTheme';

interface ConversationsStyle {
    colors: ThemeProps;
}

export default ({ colors }: ConversationsStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    }
});
