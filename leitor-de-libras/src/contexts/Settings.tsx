import {
    useState,
    useEffect,
    createContext,
    useContext
} from "react";

import * as Storage from "../services/Storage";
import SETTINGS from "../constants/settings.json";
import { DeepPartial } from "../utils/DeepPartial";
import merge from "ts-deepmerge";

type SettingsProps = typeof SETTINGS;

interface SettingsValue {
    settings: SettingsProps;
    saveSettings: (config: DeepPartial<SettingsProps>) => Promise<void>;
}

interface SettingsProviderProps {
    children: JSX.Element;
}

const SettingsContext = createContext<SettingsValue>({} as SettingsValue);

export default function SettingsProvider({ children }: SettingsProviderProps) {
    const [settings, setSettings] = useState<DeepPartial<SettingsProps> | null>(null);

    async function saveSettings(config: DeepPartial<SettingsProps>) {
        console.log("Salvando: " + JSON.stringify(config));
        const newSettings = merge(settings ?? {}, config);
        await Storage.setItem("@settings", newSettings);
        setSettings(newSettings);
    }

    useEffect(() => {
        Storage.getItem<DeepPartial<SettingsProps>>("@settings").then(data => {
            setSettings(data);
        });
    }, []);

    if (!settings)
        return null;

    return (
        <SettingsContext.Provider value={{ settings: merge(SETTINGS, settings ?? {}) as SettingsProps, saveSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => useContext(SettingsContext);
