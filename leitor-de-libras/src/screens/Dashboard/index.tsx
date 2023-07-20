import {
    useCallback
} from "react";
import {
    ScrollView,
    Image,
    BackHandler,
    Platform,
    Text,
    TouchableOpacity
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUser } from "../../contexts/user";
import axios from "axios";

import { useColors } from "../../contexts/colors";
import api from "../../constants/api.json";

import Infos from "./Infos";
import NetworkState from "./NetworkState";
import WhatToDo from "./WhatToDo";
import Tips from "./Tips";

import log from "../../utils/log";
import createStyles from "./styles";

interface DashboardProps {
    navigation: NativeStackNavigationProp<DashboardParamList, "Dashboard">;
}

export default function Dashboard({ navigation }: DashboardProps) {
    const { token } = useUser();
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

    async function ping() {
        log(`Fazendo ping em ${api.address}/ping...`, { color: "fgGray" });
        const startTime = new Date().getTime();
        // const response = await axios.get(`${api.address}/ping`);
        const response = await axios.get(`${api.address}/ping`, {
            headers: {
                "x-access-token": token
            }
        });
        const endTime = new Date().getTime();
        log(`Resposta de ${api.name} em ${endTime - startTime}ms: ${JSON.stringify(response.data)}`, { color: "fgGray", tab: true });
    }

    return (
        <ScrollView style={styles.container}>
            <Image style={styles.logo} source={require("../../../assets/imgs/horizontal-logo.png")} />
            <Infos navigation={navigation} />
            <NetworkState />
            <WhatToDo />
            <Tips navigation={navigation} />
            {/* <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 5 }} onPress={ping}>
                <Text style={{ color: "white" }}>Ping</Text>
            </TouchableOpacity> */}
        </ScrollView>
    );
}
