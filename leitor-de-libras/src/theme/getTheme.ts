import light from "./light.json";
import dark from "./dark.json";
import amoled from "./amoled.json";
import darkula from "./darkula.json";

type ThemeListItem = {
    name: ThemeName,
    theme: ThemeProps;
};

export const THEMES: ThemeListItem[] = [{
    name: "light",
    theme: light
}, {
    name: "dark",
    theme: dark
}, {
    name: "amoled",
    theme: amoled
}, {
    name: "darkula",
    theme: darkula
}];

export default function getTheme(name: ThemeName): ThemeProps {
    return THEMES.find(theme => theme.name === name)?.theme ?? light;
}

export type ThemeProps = typeof light;
export type ThemeName = "light" | "dark" | "amoled" | "darkula";
