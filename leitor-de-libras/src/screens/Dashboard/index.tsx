import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    View,
    TouchableOpacity
} from "react-native";

import Font from "../../components/Font";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";

import createStyles from "./styles";

interface Props {
    navigation: NativeStackNavigationProp<RootStackParamList, "Dashboard">;
}

export default function Dashboard({ navigation }: Props) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });
    
    return (
        <View style={styles.container}>
            <Font preset="title">{lang.dashboard.welcome.replace("%s", "Jorge Henrique")}</Font>
        </View>
    );
}
