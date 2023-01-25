import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";

interface WatchStyle {
    colors: ThemeProps;
}

export default ({ colors }: WatchStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    scroll: {
        flex: 1
    },
    title: {
        padding: 20
    },
    options: {
        
    }
});
