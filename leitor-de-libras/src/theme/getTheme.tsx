import light from "./light.json";
import dark from "./dark.json";
import amoled from "./amoled.json";
import midnight from "./midnight.json";
import {
    BatteryChargingVertical,
    Lamp,
    MoonStars,
    Sun
} from "phosphor-react-native";

type ThemeListItem = {
    name: ThemeName,
    theme: ThemeProps;
    icon: ({ color, size, weight }: { color: string; size: number, weight: "fill" | "regular" }) => JSX.Element;
};

export const THEMES: ThemeListItem[] = [{
    name: "light",
    theme: light,
    icon: props => <Sun {...props} />
}, {
    name: "dark",
    theme: dark,
    icon: props => <MoonStars {...props} />
}, {
    name: "amoled",
    theme: amoled,
    icon: props => <BatteryChargingVertical {...props} />
}, {
    name: "midnight",
    theme: midnight,
    icon: props => <Lamp {...props} />
}];

export default function getTheme(name: ThemeName): ThemeProps {
    return THEMES.find(theme => theme.name === name)?.theme ?? light;
}

export type ThemeProps = typeof light;
export type ThemeName = "auto" | "light" | "dark" | "amoled" | "midnight";
