import {
    ChatsCircle,
    ClockClockwise,
    Code,
    Gauge,
    GlobeStand,
    IconProps,
    Info,
    PaintBrushHousehold
} from "phosphor-react-native";

import { LangProps } from "../lang/getLang";

import Appearance from "../screens/Configure/Appearance";
import DevTools from "../screens/Configure/DevTools";
import Lang from "../screens/Configure/Lang";
import Performance from "../screens/Configure/Performance";

import LiTalks from "../screens/Configure/LiTalks";

export type Category = {
    category: keyof SettingsLocation;
    title: string;
    settings: Setting[];
}

type Setting = {
    icon: ({ color, size, weight }: IconProps) => React.ReactNode;
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
            icon: props => <PaintBrushHousehold {...props} />,
            component: Appearance
        }, {
            location: "lang",
            title: lang.settings.display.lang.title,
            desc: lang.settings.display.lang.desc,
            icon: props => <GlobeStand {...props} />,
            component: Lang
        }, {
            location: "performance",
            title: lang.settings.display.performance.title,
            desc: lang.settings.display.performance.desc,
            icon: props => <Gauge {...props} />,
            component: Performance
        }]
    }, {
        category: "features",
        title: lang?.settings?.features?.title,
        settings: [{
            location: "litalks",
            title: lang.settings.features.litalks.title,
            icon: props => <ChatsCircle {...props} />,
            component: LiTalks
        }]
    }, {
        category: "more",
        title: lang.settings.more.title,
        settings: [{
            location: "dev_tools",
            title: lang.settings.more.dev_tools.title,
            icon: props => <Code {...props} />,
            component: DevTools
        }, {
            location: "update",
            title: lang.settings.more.check_updates.title,
            icon: props => <ClockClockwise {...props} />,
            component: () => null
        }, {
            location: "about",
            title: lang.settings.more.about.title.replace("%s", lang.appName),
            icon: props => <Info {...props} />,
            component: () => null
        }]
    }];

    return settingsList;
}
