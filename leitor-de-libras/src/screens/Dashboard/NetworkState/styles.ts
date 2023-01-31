import { StyleSheet } from "react-native";
import { ThemeProps } from "../../../theme/getTheme";

interface NetworkStateStyle {
    colors: ThemeProps;
}

export default ({ colors }: NetworkStateStyle) => StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginHorizontal: 20,
        paddingVertical: 15,
        marginTop: 20,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    cellular: {
        backgroundColor: colors.warn
    },
    disconnected: {
        backgroundColor: colors.critic
    },
    text: {
        fontSize: 10,
        marginLeft: 10,
        flex: 1
    }
});
