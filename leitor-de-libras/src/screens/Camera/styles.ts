import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../theme/getTheme';

import Constants from 'expo-constants';

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
        backgroundColor: colors.background,
        flex: 1
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
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
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
        padding: 10,
        borderRadius: 100,
        marginHorizontal: 30
    }
});
