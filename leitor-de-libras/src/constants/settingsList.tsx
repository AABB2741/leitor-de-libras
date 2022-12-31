import {
    Atom,
    Flask,
    TestTube
} from "phosphor-react-native";
import { LangProps } from "../contexts/Lang";

type Setting = {
    icon: ({ color, size }: { color: string, size: number }) => React.ReactNode;
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
        title: "Categoria de teste",
        settings: [{
            title: "Opção teste 1",
            desc: "Config 1 ∙ Config 2 ∙ Config 3 ∙ Config 4",
            icon: ({ color, size }) => <Flask color={color} size={size} />
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
