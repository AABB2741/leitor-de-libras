import {
    View,
    useColorScheme
} from "react-native";
import {
    BatteryChargingVertical,
    MoonStars,
    Palette,
    Sun
} from "phosphor-react-native";
import FixedCategory from "../../../components/FixedCategory";
import Font from "../../../components/Font";
import { useColors } from "../../../contexts/Colors";
import { useLang } from "../../../contexts/Lang";

import ThemeOption from "./ThemeOption";

import light from "../../../theme/light.json"
import dark from "../../../theme/dark.json"
import amoled from "../../../theme/amoled.json"

import createStyles from "./styles";

export default function Appearance() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    // const deviceTheme = useColorScheme();
    // console.log(deviceTheme);

    return (
        <View>
            <FixedCategory
                title={lang.settings.display.appearance.theme.title}
                desc={lang.settings.display.appearance.theme.desc.replace("%s", lang.appName)}
            >
                <ThemeOption
                    icon={({ color, size, weight }) => <Palette color={color} size={size} weight={weight} />}
                    name={lang.settings.display.appearance.theme.auto.name}
                    example={lang.settings.display.appearance.theme.auto.example}
                    sample={amoled}
                />
                <ThemeOption
                    icon={({ color, size, weight }) => <Sun color={color} size={size} weight={weight} />}
                    name={lang.settings.display.appearance.theme.light.name}
                    example={lang.settings.display.appearance.theme.light.example}
                    sample={light}
                />
                <ThemeOption
                    icon={({ color, size, weight }) => <MoonStars color={color} size={size} weight={weight} />}
                    name={lang.settings.display.appearance.theme.dark.name}
                    example={lang.settings.display.appearance.theme.dark.example}
                    sample={dark}
                />
                <ThemeOption
                    icon={({ color, size, weight }) => <BatteryChargingVertical color={color} size={size} weight={weight} />}
                    name={lang.settings.display.appearance.theme.amoled.name}
                    example={lang.settings.display.appearance.theme.amoled.example}
                    sample={amoled}
                />
            </FixedCategory>
            <FixedCategory title={lang.settings.display.appearance.custom_fonts.title}>

            </FixedCategory>
        </View>
    )
}
