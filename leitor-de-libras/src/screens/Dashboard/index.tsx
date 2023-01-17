import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    ScrollView,
    Image
} from "react-native";

import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";
import { useUser } from "../../contexts/user";

import createStyles from "./styles";

import Font from "../../components/Font";
import Infos from "./Infos";
import Tips from "./Tips";
import WhatToDo from "./WhatToDo";

interface DashboardProps {
    navigation: NativeStackNavigationProp<DashboardParamList, "Home">;
}

export default function Dashboard({ navigation }: DashboardProps) {
    const {user} = useUser();
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <ScrollView style={styles.container}>
            <Image style={styles.logo} source={require("../../../assets/imgs/horizontal-logo.png")} />
            <Infos navigation={navigation} />
            <WhatToDo />
            <Tips />
        </ScrollView>
    );
}
