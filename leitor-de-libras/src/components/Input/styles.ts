import { StyleSheet } from "react-native";
import Theme from "../../@types/Theme"

interface InputStyle {
    colors: Theme;
}

export default ({ colors }: InputStyle) => StyleSheet.create({
    input: {
        color: colors.font,
        fontFamily: "Rubik",
        flex: 1,
        fontSize: 14
    }
});
