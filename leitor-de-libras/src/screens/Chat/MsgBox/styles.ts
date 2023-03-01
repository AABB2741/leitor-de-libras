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
        justifyContent: invert ? "flex-start" : "flex-end",
        alignItems: "center"
    },
    speak: {
        marginHorizontal: 10
    },
    text: {
        maxWidth: "85%",
        borderRadius: 16,
        overflow: "hidden",
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
