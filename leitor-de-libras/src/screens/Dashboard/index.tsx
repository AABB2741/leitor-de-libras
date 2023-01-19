import {
    useCallback
} from "react";
import {
    ScrollView,
    Image,
    BackHandler,
    Platform
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";
import { useUser } from "../../contexts/user";

import Font from "../../components/Font";
import Infos from "./Infos";
import Tips from "./Tips";
import WhatToDo from "./WhatToDo";

import log from "../../utils/log";
import createStyles from "./styles";

interface DashboardProps {
    navigation: NativeStackNavigationProp<DashboardParamList, "Home">;
}

export default function Dashboard({ navigation }: DashboardProps) {
    const {user} = useUser();
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    useFocusEffect(useCallback(() => {
        function handleBack() {
            log(`Saindo do APP em ${Platform.OS}`, { color: "fgRed" });
            BackHandler.exitApp();
            return true;
        }

        const sub = BackHandler.addEventListener("hardwareBackPress", handleBack);

        return sub.remove;
    }, []));

    return (
        <ScrollView style={styles.container}>
            <Image style={styles.logo} source={require("../../../assets/imgs/horizontal-logo.png")} />
            <Infos navigation={navigation} />
            <WhatToDo />
            <Tips />
        </ScrollView>
    );
}
