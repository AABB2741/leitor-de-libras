import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import {
    BackHandler,
    View
} from "react-native";
import { useColors } from "../../contexts/colors";
import log from "../../utils/log";

import createStyles from "./styles";

interface LearnProps {
    navigation: BottomTabNavigationProp<AppScreens, "Learn">;
}

export default function Profile({  }: LearnProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    useFocusEffect(useCallback(() => {
        function handleBack() {
            log("Saindo do APP em \"Learn\"", { color: "fgRed" });
            BackHandler.exitApp();
            return true;
        }

        const sub = BackHandler.addEventListener("hardwareBackPress", handleBack);
        return sub.remove;
    }, []))

    return (
        <View style={styles.container}>

        </View>
    );
}
