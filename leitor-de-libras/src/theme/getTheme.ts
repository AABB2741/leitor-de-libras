import Theme from "../@types/Theme";

import light from "./light.json";
import dark from "./dark.json";
import amoled from "./amoled.json";
import darkula from "./darkula.json";

type ThemeListItem = {
    name: ThemeName,
    theme: Theme;
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

export type ThemeProps = typeof light;
export type ThemeName = "light" | "dark" | "amoled" | "darkula";
