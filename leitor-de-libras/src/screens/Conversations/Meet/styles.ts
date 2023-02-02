import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    infos: {
        flex: 1,
        paddingHorizontal: 15
    },
    title: {
        fontSize: 16
    },
    desc: {
        fontSize: 14
    }
});
