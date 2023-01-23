import {
    useState,
    useEffect,
    createContext,
    useContext
} from "react";

import * as Storage from "../services/Storage";
import SETTINGS from "../constants/settings";
import { DeepPartial } from "../utils/DeepPartial";

import merge from "ts-deepmerge";
import log from "../utils/log";

type SettingsProps = typeof SETTINGS;

interface SettingsValue {
    settings: SettingsProps;
    restartRequired: boolean;
    setRestartRequired: React.Dispatch<React.SetStateAction<boolean>>;
    saveSettings: (config: DeepPartial<SettingsProps>) => Promise<void>;
}

interface SettingsProviderProps {
    children: JSX.Element;
}

const SettingsContext = createContext<SettingsValue>({} as SettingsValue);

export default function SettingsProvider({ children }: SettingsProviderProps) {
    const [restartRequired, setRestartRequired] = useState(false);
    const [settings, setSettings] = useState<DeepPartial<SettingsProps> | null>(null);

    async function saveSettings(config: DeepPartial<SettingsProps>) {
        log(`Atualizando novas configurações: ${JSON.stringify(config)}`);
        const newSettings = merge(settings ?? {}, config);
        await Storage.setItem("@settings", newSettings);
        setSettings(newSettings);
    }

    useEffect(() => {
        log("Carregando configurações...", { color: "fgGray" })
        Storage.getItem("@settings").then(data => {
            setSettings(data ?? {});
        });
    }, []);
    
    if (settings === null)
        return null;

    log("Configurações carregadas", { color: "fgGray" })

    return (
        <SettingsContext.Provider value={{ settings: merge(SETTINGS, settings) as SettingsProps, saveSettings, restartRequired, setRestartRequired }}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => useContext(SettingsContext);
