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
        padding: 20,
        paddingTop: 0,
        backgroundColor: colors.background
    },
    optionsContainer: {
        width: "100%",
        backgroundColor: colors.background
    },
    options: {
        padding: 20,
        paddingRight: 13,
        paddingBottom: 0
    },
    files: {
        flex: 1,
        justifyContent: "flex-start"
    }
});
