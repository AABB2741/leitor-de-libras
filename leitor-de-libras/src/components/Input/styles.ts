import { StyleSheet } from "react-native";
import Theme from "../../@types/Theme"

interface Props {
    colors: Theme;
}

export default ({ colors }: Props) => StyleSheet.create({
    input: {
        color: colors.font,
        fontFamily: "Rubik",
        flex: 1,
        fontSize: 14
    }
});
