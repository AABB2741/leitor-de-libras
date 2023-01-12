import {
    useState,
    useEffect,
    createContext,
    useContext
} from "react";
import {
    Platform
} from "react-native";

import { useSettings } from "./settings";
import { LangProps } from "../lang/getLang";

import merge from "ts-deepmerge";
import pt_BR from "../lang/pt_BR.json";
import en_US from "../lang/en_US.json";

interface LangProviderProps {
    children: JSX.Element;
}

const LangContext = createContext<LangProps>(pt_BR);

export default function LangProvider({ children }: LangProviderProps) {
    const {settings} = useSettings();
    const [lang, setLang] = useState<LangProps | null>(null);

    useEffect(() => {
        setLang(pt_BR);
    }, [settings]);

    if (!lang)
        return null;

    return (
        <LangContext.Provider value={lang}>
            {children}
        </LangContext.Provider>
    );
}

export const useLang = () => useContext(LangContext);
