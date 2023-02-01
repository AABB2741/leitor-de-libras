import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";
import Constants from "expo-constants";

interface MessageStyle {
    colors: ThemeProps;
}

export default ({ colors }: MessageStyle) => StyleSheet.create({
    container: {
        
    }
});
