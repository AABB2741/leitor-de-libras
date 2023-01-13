import {
    View,
    useColorScheme
} from "react-native";
import {
    BatteryChargingVertical,
    Drop,
    MoonStars,
    Palette,
    Sun
} from "phosphor-react-native";
import FixedCategory from "../../../components/FixedCategory";
import Font from "../../../components/Font";
import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";

import ThemeOption from "./ThemeOption";

import getTheme, { THEMES } from "../../../theme/getTheme";

import createStyles from "./styles";

export default function Appearance() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const scheme = useColorScheme();

    return (
        <View>
            <FixedCategory
                title={lang.settings.display.appearance.theme.title}
                desc={lang.settings.display.appearance.theme.desc.replace("%s", lang.appName)}
            >
                <ThemeOption
                    theme="auto"
                    icon={({ color, size, weight }) => <Palette color={color} size={size} weight={weight} />}
                    name={lang.settings.display.appearance.theme.auto.name}
                    example={lang.settings.display.appearance.theme.auto.example}
                    sample={scheme == "light" ? getTheme("light") : getTheme("dark")}
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
            </FixedCategory>
            <FixedCategory title={lang.settings.display.appearance.custom_fonts.title}>

            </FixedCategory>
        </View>
    )
}
