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
    title: {
        fontSize: 18
    },
    presentation: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    create: {
        backgroundColor: colors.accent,
        padding: 5,
        borderRadius: 50
    },
    files: {
        flex: 1,
        justifyContent: "flex-start"
    }
});
