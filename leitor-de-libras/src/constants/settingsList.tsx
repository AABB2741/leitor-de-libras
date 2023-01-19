import {
    Atom,
    Gauge,
    GlobeStand,
    Info,
    PaintBrushHousehold,
    TestTube
} from "phosphor-react-native";

import { LangProps } from "../lang/getLang";

import Appearance from "../screens/Configure/Appearance";
import Lang from "../screens/Configure/Lang";
import Performance from "../screens/Configure/Performance";

export type Category = {
    category: keyof SettingsLocation;
    title: string;
    settings: Setting[];
}

type Setting = {
    icon: ({ color, size, weight }: { color: string, size: number, weight?: "regular" | "fill" }) => React.ReactNode;
    location: SettingsLocation[keyof SettingsLocation];
    title: string;
    desc?: string;
    component: () => React.ReactNode;
}

interface getSettingsProps {
    lang: LangProps;
}

export default function getSettings({ lang }: getSettingsProps) {
    const settingsList: Category[] = [{
        category: "display",
        title: lang.settings.display.title,
        settings: [{
            location: "appearance",
            title: lang.settings.display.appearance.title,
            desc: lang.settings.display.appearance.desc.replace("%s", lang.appName),
            icon: ({ color, size, weight }) => <PaintBrushHousehold color={color} size={size} weight={weight} />,
            component: Appearance
        }, {
            location: "lang",
            title: lang.settings.display.lang.title,
            desc: lang.settings.display.lang.desc,
            icon: ({ color, size, weight }) => <GlobeStand color={color} size={size} weight={weight} />,
            component: Lang
        }, {
            location: "performance",
            title: lang.settings.display.performance.title,
            desc: lang.settings.display.performance.desc,
            icon: props => <Gauge {...props} />,
            component: Performance
        }]
    }];

    return settingsList;
}
