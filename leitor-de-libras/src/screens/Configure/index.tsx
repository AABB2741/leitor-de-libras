import { useState } from "react";
import {
    View,
    ScrollView
} from "react-native";
import { Eraser, Wrench } from "phosphor-react-native";
import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";

import Font from "../../components/Font";

import createStyles from "./styles";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import getSettings from "../../constants/settingsList";
import Empty from "../../components/Empty";
import Header from "../../components/Header";

interface ConfigureProps {
    navigation: NativeStackNavigationProp<DashboardParamList, "Configure">;
    route: RouteProp<DashboardParamList, "Configure">;
}

export default function Configure({ navigation, route }: ConfigureProps) {
    const { location } = route.params;

    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });
    const settingsList = getSettings({ lang });
    const setting = settingsList.find(s => s.category == route.params.category)?.settings.find(s => s.location == route.params.location);

    const [headerY, setHeaderY] = useState(0);
    const [opacity, setOpacity] = useState(0);

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
        <ScrollView
            style={styles.container}
            stickyHeaderIndices={[0, 2]}
            onScroll={e => {
                const { y } = e.nativeEvent.contentOffset;
                setOpacity(y / headerY);
            }}
        >
            <View style={styles.statusBarFix} />
            <View style={styles.presentation} onLayout={e => setHeaderY(e.nativeEvent.layout.height)}>
                {setting.icon({ color: colors.font, size: 36, weight: "fill" })}
                <Font preset="title" style={styles.title}>{setting.title}</Font>
                {setting.desc && <Font preset="desc" style={styles.desc}>{setting.desc}</Font>}
            </View>
            <Header
                title={setting.title}
                opacity={opacity}
            />
            <View style={styles.content}>
                {setting.component()}
            </View>
        </ScrollView>
    )
}
