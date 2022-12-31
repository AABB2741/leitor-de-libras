import {
    Atom,
    Globe,
    GlobeStand,
    PaintBrush,
    TestTube
} from "phosphor-react-native";
import { LangProps } from "../contexts/Lang";

export type SettingsCategory = "display" | "test";
export type SettingsLocation = "theme" | "lang" | "test2" | "test3";

type Setting = {
    icon: ({ color, size, weight }: { color: string, size: number, weight?: "regular" | "fill" }) => React.ReactNode;
    location: SettingsLocation;
    title: string;
    desc?: string;
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
            location: "theme",
            title: lang.settings.display.theme.title,
            desc: lang.settings.display.theme.desc,
            icon: ({ color, size, weight }) => <PaintBrush color={color} size={size} weight={weight} />
        }, {
            location: "lang",
            title: lang.settings.display.lang.title,
            desc: lang.settings.display.lang.desc,
            icon: ({ color, size, weight }) => <GlobeStand color={color} size={size} weight={weight} />
        }]
    }, {
        category: "test",
        title: "Segunda categoria de teste",
        settings: [{
            location: "test2",
            title: "Opção teste 2",
            icon: ({ color, size, weight }) => <TestTube color={color} size={size} weight={weight} />
        }, {
            location: "test3",
            title: "Opção teste 3",
            desc: "Config 5 ∙ Config 6",
            icon: ({ color, size, weight }) => <Atom color={color} size={size} weight={weight} />
        }]
    }];
    return settingsList;
}
