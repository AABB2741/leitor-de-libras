import { useState, createContext, useContext } from "react";

import light from "../theme/light.json";
import dark from "../theme/dark.json"; // Mudar paleta
import amoled from "../theme/amoled.json";

import Theme from "../@types/Theme";

interface ColorsProviderProps {
    children: JSX.Element;
}

const ColorsContext = createContext<Theme>(dark);

export default function ColorsProvider({ children }: ColorsProviderProps) {
    return (
        <ColorsContext.Provider value={amoled}>
            {children}
        </ColorsContext.Provider>
    );
}

export const useColors = () => useContext(ColorsContext);
