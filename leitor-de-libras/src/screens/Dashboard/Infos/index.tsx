import {
    View,
    Image,
    TouchableOpacity
} from "react-native";
import {
    BellSimple,
    GearSix,
    UserCirclePlus
} from "phosphor-react-native";

import { useColors } from "../../../contexts/colors";
import { useUser } from "../../../contexts/user";
import { useLang } from "../../../contexts/lang";

import createStyles from "./styles";

import Font from "../../../components/Font";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface InfosProps {
    navigation: NativeStackNavigationProp<DashboardParamList, "Home">;
}

export default function Infos({ navigation }: InfosProps) {
    const lang = useLang();
    const {user, signed} = useUser();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            {!signed && (
                <TouchableOpacity style={styles.login}>
                    <UserCirclePlus color={colors.font} size={36} />
                    <Font preset="button" style={styles.loginLabel}>{lang.general.login}</Font>
                </TouchableOpacity>
            )}
            {signed && (
                <View style={styles.userContainer}>
                    <Image source={user?.avatar} style={styles.avatar} />
                    <View style={styles.userData}>
                        <Font preset="subtitle" numberOfLines={1} style={styles.username}>{user?.name}</Font>
                        <Font preset="desc" numberOfLines={1} style={styles.email}>{user?.email}</Font>
                    </View>
                </View>
            )}
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Customize")}>
                    <BellSimple color={colors.font} size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Settings")}>
                    <GearSix color={colors.font} size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
