import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../theme/getTheme';

interface CameraStyle {
    colors: ThemeProps;
}

export default ({ colors }: CameraStyle) => StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1
    },
    content: {
        backgroundColor: colors.background,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    camera: {
        flex: 1,
        resizeMode: "contain"
    },
    overlay: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1
    },
    top: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    bottom: {
        padding: 20,
        backgroundColor: "rgba(0, 0, 0, 0.75)"
    },
    options: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    record: {
        backgroundColor: colors.accent,
        padding: 15,
        borderRadius: 100,
        marginHorizontal: 50
    }
});
