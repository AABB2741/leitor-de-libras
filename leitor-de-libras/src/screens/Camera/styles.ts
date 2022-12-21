import { StyleSheet } from 'react-native';
import Theme from "../../@types/Theme";

interface Props {
    colors: Theme;
}

export default ({ colors }: Props) => StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1
    },
    camera: {
        width: "100%",
        height: "100%"
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
