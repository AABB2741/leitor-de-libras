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
import getLang, { LangProps } from "../lang/getLang";

import log from "../utils/log";

import merge from "ts-deepmerge";
import pt_BR from "../lang/pt_BR.json";
import en_US from "../lang/en_US.json";

interface LangProviderProps {
    children: JSX.Element;
}

const LangContext = createContext<LangProps>(pt_BR);

export default function LangProvider({ children }: LangProviderProps) {
    const { settings } = useSettings();
    const [lang, setLang] = useState<LangProps | null>(null);

    useEffect(() => {
        log(`Carregando pacote de idiomas "${lang?.langName ?? "default"}"...`, { color: "fgGray" });
        setLang(getLang(settings.display.lang ?? "pt_BR"));
    }, [settings]);

    if (!lang)
        return null;
    log("Pacote de idiomas carregado", { color: "fgGray", tab: true })
    return (
        <LangContext.Provider value={lang}>
            {children}
        </LangContext.Provider>
    );
}

export const useLang = () => useContext(LangContext);
