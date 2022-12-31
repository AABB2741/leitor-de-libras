import { useState, useEffect, createContext, useContext } from "react";
import merge from "ts-deepmerge";
import * as Storage from "../services/Storage";

import Settings from "../data/settings.json";

type SettingsProps = {
    settings: typeof Settings;
    setSettings: React.Dispatch<React.SetStateAction<typeof Settings>> | (() => void);
};

interface Props {
    children: React.ReactNode;
}

const SettingsContext = createContext<SettingsProps>({ settings: Settings, setSettings: () => null });

export default function SettingsProvider({ children }: Props) {
    const [settings, setSettings] = useState(Settings);

    useEffect(() => {
        Storage.getItem<typeof Settings>("@settings", true).then(data => {
            // console.log(data.display.appearance);
            // setSettings(merge(data, Settings))
        })
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            { children }
        </SettingsContext.Provider>
    );
}

export const useSettings = () => useContext(SettingsContext);
