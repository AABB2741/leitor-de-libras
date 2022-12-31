import {
    Atom,
    PaintBrush,
    TestTube
} from "phosphor-react-native";
import { LangProps } from "../contexts/Lang";

type Setting = {
    icon: ({ color, size, weight }: { color: string, size: number, weight?: "regular" | "fill" }) => React.ReactNode;
    title: string;
    desc?: string;
}

export type Category = {
    title: string;
    settings: Setting[];
}

interface Props {
    lang: LangProps
}

export default function getSettings({ lang }: Props) {
    const settingsList: Category[] = [{
        title: lang.settings.display.title,
        settings: [{
            title: lang.settings.display.theme.title,
            desc: lang.settings.display.theme.desc,
            icon: ({ color, size, weight }) => <PaintBrush color={color} size={size} weight={weight} />
        }]
    }, {
        title: "Segunda categoria de teste",
        settings: [{
            title: "Opção teste 2",
            icon: ({ color, size }) => <TestTube color={color} size={size} />
        }, {
            title: "Opção teste 3",
            desc: "Config 5 ∙ Config 6",
            icon: ({ color, size }) => <Atom color={color} size={size} />
        }]
    }];
    return settingsList;
}
