import {
    View,
    Image,
    TouchableOpacity
} from "react-native";
import { Gear, PencilSimpleLine } from "phosphor-react-native";
import { useColors } from "../../../contexts/Colors";
import { useUser } from "../../../contexts/User";

import createStyles from "./styles";

import Font from "../../../components/Font";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
    navigation: NativeStackNavigationProp<DashboardParamList, "Home">;
}

export default function Infos({ navigation }: Props) {
    const user = useUser();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <Image source={user.avatar} style={styles.avatar} />
                <View style={styles.userData}>
                    <Font preset="subtitle" numberOfLines={1} style={styles.username}>{user.name}</Font>
                    <Font preset="desc" numberOfLines={1} style={styles.email}>{user.email}</Font>
                </View>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Customize")}>
                    <PencilSimpleLine color={colors.font} size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Settings")}>
                    <Gear color={colors.font} size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
