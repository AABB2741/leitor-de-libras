import {
    View
} from "react-native";
import { Wrench } from "phosphor-react-native";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";

import Font from "../../components/Font";

import createStyles from "./styles";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import getSettings from "../../constants/settingsList";
import Empty from "../../components/Empty";

interface Props {
    navigation: NativeStackNavigationProp<DashboardParamList, "Configure">;
    route: RouteProp<DashboardParamList, "Configure">;
}

export default function Configure({ navigation, route }: Props) {
    const { location } = route.params;

    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });
    const settingsList = getSettings({ lang });
    const setting = settingsList.find(s => s.category == route.params.category)?.settings.find(s => s.location == route.params.location);
    console.log(route.params)
    if (!setting) {
        return (
            <View style={styles.emptyContainer}>
                <Empty
                    icon={({ color, size }) => <Wrench color={color} size={size} />}
                    title={lang.settings.not_found.title}
                    desc={lang.settings.not_found.desc}
                    options={[{
                        label: lang.settings.not_found.back,
                        onPress: () => navigation.navigate("Settings"),
                        highlight: true
                    }]}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Font preset="title">{setting.title}</Font>
        </View>
    )
}
