import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";

interface WatchStyle {
    colors: ThemeProps;
}

export default ({ colors }: WatchStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    video: {
        backgroundColor: "red",
        flex: 1,
        maxHeight: 200
    },
    scroll: {
        flex: 1
    },
    title: {
        padding: 20,
        fontSize: 18
    },
    options: {
        paddingLeft: 20,
        paddingRight: 10
    },
    option: {
        paddingHorizontal: 15,
        paddingVertical: 7,
        backgroundColor: colors.background2,
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10
    },
    optionLabel: {
        marginLeft: 5,
        fontSize: 12
    },
    text: {
        padding: 20,
        fontSize: 14,
        lineHeight: 20
    }
});
