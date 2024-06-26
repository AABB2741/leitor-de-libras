import { StyleSheet } from 'react-native';
import { ThemeProps } from '../../theme/getTheme';

interface HeaderStyle {
    colors: ThemeProps;
}

export default ({ colors }: HeaderStyle) => StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative"
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.header
    },
    headerPadding: {
        paddingHorizontal: 20,
        paddingVertical: 12.5
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: 14
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerOption: {
        padding: 10
    }
});
