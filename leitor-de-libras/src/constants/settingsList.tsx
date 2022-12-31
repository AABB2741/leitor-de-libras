import {
    Atom,
    PaintBrush,
    TestTube
} from "phosphor-react-native";
import { LangProps } from "../contexts/Lang";

export type SettingsCategory = "display" | "test";
export type SettingsLocation = "theme";

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
        }]
    }, {
        category: "test",
        title: "Segunda categoria de teste",
        settings: [{
            location: "theme",
            title: "Opção teste 2",
            icon: ({ color, size }) => <TestTube color={color} size={size} />
        }, {
            location: "theme",
            title: "Opção teste 3",
            desc: "Config 5 ∙ Config 6",
            icon: ({ color, size }) => <Atom color={color} size={size} />
        }]
    }];
    return settingsList;
}
