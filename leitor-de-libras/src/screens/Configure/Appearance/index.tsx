import {
    View,
    ScrollView,
    useColorScheme
} from "react-native";
import {
    Palette
} from "phosphor-react-native";

import FixedCategory from "../../../components/FixedCategory";
import ThemeOption from "./ThemeOption";
import Toggle from "../../../components/Toggle";

import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";
import { useSettings } from "../../../contexts/settings";
import getTheme, { THEMES } from "../../../theme/getTheme";

import createStyles from "./styles";

export default function Appearance() {
    const { settings, saveSettings, setRestartRequired } = useSettings();
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });
    
    const scheme = useColorScheme();

    return (
        <View>
            <FixedCategory
                title={lang.settings.display.appearance.theme.title}
                desc={lang.settings.display.appearance.theme.desc.replace("%s", lang.appName)}
                disableVerticalSpacing
                headerPadding={20}
            >
                <ScrollView style={styles.themesContainer} contentContainerStyle={styles.themes} horizontal showsHorizontalScrollIndicator={false}>
                    <ThemeOption
                        theme="auto"
                        icon={({ color, size, weight }) => <Palette color={color} size={size} weight={weight} />}
                        name={lang.settings.display.appearance.theme.auto.name}
                        example={lang.settings.display.appearance.theme.auto.example}
                        sample={scheme == "light" ? getTheme("light") : getTheme("amoled")}
                    />
                    {THEMES.map(t => (
                        <ThemeOption
                            theme={t.name}
                            icon={t.icon}
                            name={lang.settings.display.appearance.theme[t.name].name}
                            example={lang.settings.display.appearance.theme[t.name].example}
                            sample={t.theme}
                            key={t.name}
                        />
                    ))}
                </ScrollView>
            </FixedCategory>
            <FixedCategory
                title={lang.settings.display.appearance.other.title}
                headerPadding={20}
                contentPadding={20}
                disableVerticalSpacing
            >
                <Toggle
                    label={lang.settings.display.appearance.other.custom_fonts}
                    value={settings.display.appearance.custom_fonts}
                    onValueChange={custom_fonts => {
                        setRestartRequired(true);
                        saveSettings({display: {appearance:{ custom_fonts }} });
                    }}
                />
                <Toggle
                    label={lang.settings.display.appearance.other.connection_alerts}
                    value={settings.display.appearance.connection_alerts}
                    onValueChange={connection_alerts => {
                        saveSettings({display: {appearance:{ connection_alerts }} });
                    }}
                />
            </FixedCategory>
        </View>
    )
}
