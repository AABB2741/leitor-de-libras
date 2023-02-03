import { StyleSheet } from "react-native";
import { ThemeProps } from "../../../theme/getTheme";

interface FrameStyle {
    colors: ThemeProps;
    guest?: boolean;
}

export default ({ colors, guest }: FrameStyle) => StyleSheet.create({
    container: {
        flex: 1,
        transform: [{
            rotate: guest ? "180deg" : "0deg"
        }]
    },
    mode: {
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: 20,
        overflow: "hidden"
    },
    modeLabel: {
        fontSize: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: colors.header,
        borderRadius: 50
    },
    controls: {
        paddingHorizontal: 20,
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
