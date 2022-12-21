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

export default function Infos() {
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
                <TouchableOpacity style={styles.button}>
                    <PencilSimpleLine color={colors.font} size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Gear color={colors.font} size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
