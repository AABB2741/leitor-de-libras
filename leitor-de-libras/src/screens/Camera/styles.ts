import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../theme/getTheme';

interface CameraStyle {
    colors: ThemeProps;
}

export default ({ colors }: CameraStyle) => StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1
    },
    camera: {
        flex: 1
    },
    overlay: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1
    },
    top: {
        
    },
    bottom: {
        padding: 20,
        backgroundColor: "rgba(0, 0, 0, 0.75)"
    }
});
