import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    View
} from "react-native";

import Font from "../../components/Font";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";
import { useUser } from "../../contexts/User";

import createStyles from "./styles";

import Infos from "./Infos";
import Tips from "./Tips";
import Category from "../../components/Category";
import WhatToDo from "./WhatToDo";

interface Props {
    navigation: NativeStackNavigationProp<DashboardParamList, "Home">;
}

export default function Dashboard({ navigation }: Props) {
    const user = useUser();
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });
    
    return (
        <View style={styles.container}>
            <Font preset="title" style={styles.welcome}>{user.signed ? lang.dashboard.signed_welcome.replace("%s", user.name ?? "") : lang.dashboard.welcome}</Font>
            <Infos navigation={navigation} />
            <Tips />
            <WhatToDo />
        </View>
    );
}
