import { StyleSheet } from "react-native";
import { ThemeProps } from "../../../theme/getTheme";

interface SetProfilePictureStyle {
    colors: ThemeProps;
}

export default ({ colors }: SetProfilePictureStyle) => StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1
    }
});
