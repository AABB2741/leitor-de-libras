import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../theme/getTheme';

interface ProfileStyle {
    colors: ThemeProps;
}

export default ({ colors }: ProfileStyle) => StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: colors.background,
        padding: 20
    }
});
