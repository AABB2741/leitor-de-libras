import { useState, useEffect, createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { useSettings } from "./Settings";

import light from "../theme/light.json";
import dark from "../theme/dark.json"; // Mudar paleta
import amoled from "../theme/amoled.json";

import Theme from "../@types/Theme";

interface ColorsProviderProps {
    children: JSX.Element;
}

const ColorsContext = createContext<Theme>(dark);

export default function ColorsProvider({ children }: ColorsProviderProps) {
    const [theme, setTheme] = useState<Theme>(light);
    const {settings} = useSettings();
    const scheme = settings?.display?.appearance?.theme == "auto" ? useColorScheme() : (settings.display.appearance.theme ?? "light");

    useEffect(() => {
        if (scheme == "amoled") {
            setTheme(amoled);
        } else if (scheme == "dark") {
            setTheme(dark);
        } else {
            setTheme(light);
        }
    }, [scheme]);

    return (
        <ColorsContext.Provider value={theme}>
            {children}
        </ColorsContext.Provider>
    );
}

export const useColors = () => useContext(ColorsContext);
