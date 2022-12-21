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
    presentation: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    files: {
        flex: 1,
        justifyContent: "flex-start"
    }
});
