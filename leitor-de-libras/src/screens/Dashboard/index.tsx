import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PencilSimpleLine } from "phosphor-react-native";
import {
    View,
    TouchableOpacity,
    Image
} from "react-native";

import Font from "../../components/Font";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";
import { useUser } from "../../contexts/User";

import createStyles from "./styles";

import Infos from "./Infos";
import Tips from "./Tips";

interface Props {
    navigation: NativeStackNavigationProp<RootStackParamList, "Dashboard">;
}

export default function Dashboard({ navigation }: Props) {
    const user = useUser();
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });
    
    return (
        <View style={styles.container}>
            <Font preset="title" style={styles.welcome}>{user.signed ? lang.dashboard.signed_welcome.replace("%s", user.name ?? "") : lang.dashboard.welcome}</Font>
            <Infos />
            <Tips />
        </View>
    );
}
