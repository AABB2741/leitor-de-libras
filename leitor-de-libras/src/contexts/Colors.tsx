import { useState, useEffect, createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { useSettings } from "./settings";

import light from "../theme/light.json";
import dark from "../theme/dark.json"; // Mudar paleta
import darkula from "../theme/darkula.json";
import amoled from "../theme/amoled.json";

import Theme from "../@types/Theme";

interface ColorsProviderProps {
    children: JSX.Element;
}

const ColorsContext = createContext<Theme>(dark);

export default function ColorsProvider({ children }: ColorsProviderProps) {
    const [theme, setTheme] = useState<Theme | null>(null);
    const {settings} = useSettings();
    const deviceTheme = useColorScheme();
    const scheme = settings?.display?.appearance?.theme == "auto" ? deviceTheme : (settings.display.appearance.theme ?? "light");

    useEffect(() => {
        if (scheme == "amoled") {
            setTheme(amoled);
        } else if (scheme == "dark") {
            setTheme(dark);
        } else if (scheme == "darkula") {
            setTheme(light);
        }
    }, [deviceTheme, settings]);

    if (!theme)
        return null;

    return (
        <ColorsContext.Provider value={theme}>
            {children}
        </ColorsContext.Provider>
    );
}

export const useColors = () => useContext(ColorsContext);
