import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
    container: {
        borderTopWidth: Constants.statusBarHeight,
        borderTopColor: "white",
        flex: 1
    }
});
