import { useState, useEffect, createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { useSettings } from "./settings";

import log from "../utils/log";
import getTheme, { ThemeName } from "../theme/getTheme";

import { ThemeProps } from "../theme/getTheme";

interface ColorsProviderProps {
    children: JSX.Element;
}

const ColorsContext = createContext<ThemeProps>({} as ThemeProps);

export default function ColorsProvider({ children }: ColorsProviderProps) {
    const [theme, setTheme] = useState<ThemeProps | null>(null);
    const {settings} = useSettings();
    const deviceTheme = useColorScheme() ?? "light";
    const scheme: ThemeName = settings?.display?.appearance?.theme == "auto" ? (deviceTheme == "dark" ? "amoled" : "light") : (settings.display.appearance.theme ?? "light");

    useEffect(() => {
        log(`Carregando paleta de cores "${scheme}"...`, { color: "fgGray" });
        setTheme(getTheme(scheme));
    }, [deviceTheme, settings]);

    if (!theme)
        return null;
    log("Paleta de cores carregada", { color: "fgGray", tab: true })
    return (
        <ColorsContext.Provider value={theme}>
            {children}
        </ColorsContext.Provider>
    );
}

export const useColors = () => useContext(ColorsContext);
