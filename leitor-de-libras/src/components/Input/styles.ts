import { StyleSheet } from "react-native";
import Theme from "../../@types/Theme"

interface InputStyle {
    colors: Theme;
    transparent?: boolean;
    value?: string;
}

export default ({ colors, transparent, value }: InputStyle) => StyleSheet.create({
    container: {
        flex: 1
    },
    label: {
        marginBottom: 10,
    },
    content: {
        borderRadius: 12,
        backgroundColor: transparent ? "transparent" : colors.background2,
        // flex: 1,
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between"
    },
    input: {
        paddingVertical: transparent ? 0 : 5,
        paddingLeft: transparent ? 0 : 15,
        paddingRight: (!transparent && !value) ? 20 : 0,
        color: colors.font,
        fontFamily: "Rubik",
        flex: 1,
        fontSize: 14
    },
    clear: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: transparent ? 0 : 15
    }
});
