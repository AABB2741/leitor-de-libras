import { StyleSheet } from "react-native";
import Theme from "../../@types/Theme";

interface Props {
    colors: Theme;
}

export default ({ colors }: Props) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    top: {
        padding: 20
    },
    title: {
        fontSize: 18
    },
    files: {
        flex: 1,
        justifyContent: "flex-start"
    }
});
