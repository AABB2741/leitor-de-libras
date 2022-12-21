import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    View,
    TouchableOpacity
} from "react-native";

import Font from "../../components/Font";
import { useColors } from "../../contexts/Colors";

import createStyles from "./styles";

interface Props {
    navigation: NativeStackNavigationProp<RootStackParamList, "Dashboard">;
}

export default function Dashboard({ navigation }: Props) {
    const colors = useColors();
    const styles = createStyles({ colors });
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
                <Font preset="button">Ir para camera</Font>
            </TouchableOpacity>
        </View>
    );
}
