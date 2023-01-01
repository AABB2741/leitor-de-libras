import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    ScrollView
} from "react-native";

import Font from "../../components/Font";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";
import { useUser } from "../../contexts/User";

import createStyles from "./styles";

import Infos from "./Infos";
import Tips from "./Tips";
import WhatToDo from "./WhatToDo";

interface DashboardProps {
    navigation: NativeStackNavigationProp<DashboardParamList, "Home">;
}

export default function Dashboard({ navigation }: DashboardProps) {
    const user = useUser();
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });
    
    return (
        <ScrollView style={styles.container}>
            <Font preset="title" style={styles.welcome}>{user.signed ? lang.dashboard.signed_welcome.replace("%s1", lang.appName).replace("%s2", user.name ?? "") : lang.dashboard.welcome.replace("%s", lang.appName)}</Font>
            <Infos navigation={navigation} />
            <Tips />
            <WhatToDo />
        </ScrollView>
    );
}
