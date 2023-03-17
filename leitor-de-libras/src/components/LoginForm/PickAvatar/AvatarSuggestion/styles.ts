import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 100
    },
    name: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 16
    },
    status: {
        position: "absolute",
        bottom: 10,
        right: 10
    }
});
