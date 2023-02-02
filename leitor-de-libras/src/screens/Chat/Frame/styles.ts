import { StyleSheet } from "react-native";
import { ThemeProps } from "../../../theme/getTheme";

interface FrameStyle {
    colors: ThemeProps;
}

export default ({ colors }: FrameStyle) => StyleSheet.create({
    container: {
        flex: 1
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
    speak: {
        padding: 10,
        backgroundColor: colors.accent,
        borderRadius: 25,
        marginLeft: 10
    }
});
