import { useState } from "react";
import {
    View,
    ScrollView
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Eraser, GearSix, MagnifyingGlass } from "phosphor-react-native";

import getSettings from "../../constants/settingsList";

import { useColors } from "../../contexts/colors";
import { useSettings } from "../../contexts/settings";
import { useLang } from "../../contexts/lang";

import Font from "../../components/Font";
import Header from "../../components/Header";

import createStyles from "./styles";
import ConfigSection from "./ConfigSection";

interface SettingsProps {
    navigation: NativeStackNavigationProp<DashboardParamList, "Settings">;
}

export default function Settings({ navigation }: SettingsProps) {
    const lang = useLang();
    const colors = useColors();
    const { settings, restartRequired } = useSettings();
    const styles = createStyles({ colors });
    const settingsList = getSettings({ lang });

    const [headerY, setHeaderY] = useState(0);
    const [opacity, setOpacity] = useState(0);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 20 }}
            stickyHeaderIndices={[0, 2]}
            onScroll={settings.display.performance.reduce_animations ? undefined : e => {
                const { y } = e.nativeEvent.contentOffset;
                setOpacity(y / headerY);
            }}
            scrollEventThrottle={100}
        >
            <View style={styles.statusBarFix} />
            <View style={styles.presentation} onLayout={e => setHeaderY(e.nativeEvent.layout.height)}>
                <GearSix size={36} weight="fill" color={colors.font} />
                <Font preset="title" style={styles.title}>{lang.settings.title}</Font>
            </View>
            <Header
                title={lang.settings.title}
                opacity={settings.display.performance.reduce_animations ? 1 : opacity}
                rightOptions={[{
                    icon: props => <Eraser {...props} />
                }, {
                    icon: props => <MagnifyingGlass {...props} />,
                }]}
            />
            {restartRequired && (
                <View style={styles.warning}>
                    <Font preset="text" style={{ color: colors.font2 }}>{lang.general.warning.replace("%s", lang.settings.restart_required)}</Font>
                </View>
            )}
            {settingsList.map((props, index) => <ConfigSection { ...props } navigation={navigation} key={index} />)}
        </ScrollView>
    );
}
