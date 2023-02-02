import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";

interface LoadingStyle {
    colors: ThemeProps;
    size: number;
}

export default ({ colors, size }: LoadingStyle) => StyleSheet.create({
    loading: {
        height: size,
        width: size,
        borderWidth: size / 6,
        borderColor: colors.desc3,
        borderBottomColor: colors.desc2,
        borderRadius: size / 2
    }
});
