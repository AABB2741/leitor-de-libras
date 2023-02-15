import {
    View,
    Image,
    TouchableOpacity
} from "react-native";
import {
    Activity,
    GearSix,
    UserCircle,
    UserCirclePlus
} from "phosphor-react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useColors } from "../../../contexts/colors";
import { useUser } from "../../../contexts/user";
import { useLang } from "../../../contexts/lang";

import Loading from "../../../components/Loading";

import createStyles from "./styles";

import Font from "../../../components/Font";

interface InfosProps {
    navigation: NativeStackNavigationProp<DashboardParamList, "Dashboard">;
}

export default function Infos({ navigation }: InfosProps) {
    const lang = useLang();
    const { user, signed } = useUser();
    const colors = useColors();

    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            {signed === false && (
                <TouchableOpacity style={styles.login}>
                    <UserCirclePlus color={colors.font} size={36} />
                    <Font family="ubuntu" style={styles.loginLabel}>{lang.general.login}</Font>
                </TouchableOpacity>
            )}
            {signed === null && (
                <View style={styles.loading}>
                    <Loading size={16} />
                    <Font style={styles.loadingLabel}>{lang.general.user.loading}</Font>
                </View>
            )}
            {signed && (
                <View style={styles.userContainer}>
                    <Image source={user?.avatar} style={styles.avatar} />
                    <View style={styles.userData}>
                        <Font family="ubuntu" numberOfLines={1} style={styles.username}>{user?.name}</Font>
                        <Font numberOfLines={1} style={styles.email}>{user?.email}</Font>
                    </View>
                </View>
            )}
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Customize")}>
                    <Activity color={colors.font} size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Settings")}>
                    <GearSix color={colors.font} size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
