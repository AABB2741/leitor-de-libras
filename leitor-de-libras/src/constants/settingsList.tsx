import {
    Atom,
    GlobeStand,
    PaintBrushHousehold,
    TestTube
} from "phosphor-react-native";
import { LangProps } from "../contexts/Lang";

import Appearance from "../screens/Configure/Appearance";

type Setting = {
    icon: ({ color, size, weight }: { color: string, size: number, weight?: "regular" | "fill" }) => React.ReactNode;
    location: SettingsLocation;
    title: string;
    desc?: string;
    content: React.ReactNode;
}

export type Category = {
    category: SettingsCategory;
    title: string;
    settings: Setting[];
}

interface Props {
    lang: LangProps
}

export default function getSettings({ lang }: Props) {
    const settingsList: Category[] = [{
        category: "display",
        title: lang.settings.display.title,
        settings: [{
            location: "appearance",
            title: lang.settings.display.appearance.title,
            desc: lang.settings.display.appearance.desc.replace("%s", lang.appName),
            icon: ({ color, size, weight }) => <PaintBrushHousehold color={color} size={size} weight={weight} />,
            content: <Appearance />
        }, {
            location: "lang",
            title: lang.settings.display.lang.title,
            desc: lang.settings.display.lang.desc,
            icon: ({ color, size, weight }) => <GlobeStand color={color} size={size} weight={weight} />,
            content: null
        }]
    }, {
        category: "test",
        title: "Segunda categoria de teste",
        settings: [{
            location: "test2",
            title: "Opção teste 2",
            icon: ({ color, size, weight }) => <TestTube color={color} size={size} weight={weight} />,
            content: null
        }, {
            location: "test3",
            title: "Opção teste 3",
            desc: "Config 5 ∙ Config 6",
            icon: ({ color, size, weight }) => <Atom color={color} size={size} weight={weight} />,
            content: null
        }]
    }];

    return settingsList;
}
