import { useState, useEffect, createContext, useContext } from "react";
import merge from "ts-deepmerge";
import * as Storage from "../services/Storage";

import Settings from "../data/settings.json";

type SettingsProps = {
    settings: typeof Settings;
    setSettings: React.Dispatch<React.SetStateAction<typeof Settings>> | (() => void);
};

interface SettingsProviderProps {
    children: JSX.Element;
}

const SettingsContext = createContext<SettingsProps>({ settings: Settings, setSettings: () => null });

export default function SettingsProvider({ children }: SettingsProviderProps) {
    const [settings, setSettings] = useState(Settings);

    useEffect(() => {
        Storage.getItem<typeof Settings>("@settings").then(data => {
            setSettings(merge(data ?? {}, Settings));
        });
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            { children }
        </SettingsContext.Provider>
    );
}

export const useSettings = () => useContext(SettingsContext);
