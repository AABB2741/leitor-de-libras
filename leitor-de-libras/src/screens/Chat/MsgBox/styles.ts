import { StyleSheet } from "react-native";
import { ThemeProps } from "../../../theme/getTheme";

interface MsgBoxStyle {
    colors: ThemeProps;
    from: "owner" | "guest";
    invert?: boolean;
}

export default ({ colors, from, invert }: MsgBoxStyle) => StyleSheet.create({
    container: {
        paddingBottom: 10,
        paddingHorizontal: 20
    },
    box: {
        flexDirection: "row",
        justifyContent: invert ? "flex-start" : "flex-end"
    },
    text: {
        borderRadius: 16,
        backgroundColor: invert ? colors.msg.guest : colors.msg.owner,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    date: {
        color: colors.desc,
        textAlign: invert ? "left" : "right",
        fontSize: 8,
        marginTop: 10
    }
});
