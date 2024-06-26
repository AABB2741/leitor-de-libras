import { StyleSheet } from "react-native";
import { ThemeProps } from "../../../theme/getTheme";

interface FrameStyle {
    colors: ThemeProps;
    guest?: boolean;
    mode?: "split" | "normal";
}

export default ({ colors, guest, mode }: FrameStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: guest ? colors.msg.guest_background : undefined,
        transform: [{
            rotate: (guest && mode !== "normal") ? "180deg" : "0deg"
        }]
    },
    whoami: {
        flexDirection: "column",
        alignItems: "center",
        paddingVertical: 20
    },
    sayMyName: {
        fontSize: 14,
        textAlign: "center",
        marginVertical: 5
    },
    whosTalking: {
        fontSize: 12
    },
    userAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18
    },
    showAboutMe: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    showAboutMeLabel: {
        color: colors.accent,
        marginRight: 10
    },
    aboutMe: {
        paddingHorizontal: 20,
        marginTop: 10,
        textAlign: "center"
    },
    controls: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    suggestionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
    },
    suggestionWrapper: {
        flex: 1,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        marginRight: 10,
        overflow: "hidden"
    },
    suggestion: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginLeft: 10,
        backgroundColor: colors.background2,
        borderRadius: 20
    },
    suggestionLabel: {
        fontSize: 12
    },
    suggestionClose: {
        paddingRight: 20
    },
    input: {
        borderRadius: 50
    },
    action: {
        padding: 10,
        backgroundColor: colors.accent,
        borderRadius: 25,
        marginLeft: 10
    }
});
