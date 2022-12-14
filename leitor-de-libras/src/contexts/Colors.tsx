import { useState, createContext, useContext } from "react";

import light from "../theme/light.json";
import dark from "../theme/dark.json";

import Theme from "../@types/Theme";

interface Props {
    children: React.ReactNode;
}

const ColorsContext = createContext<Theme>(dark);

export default function ColorsProvider({ children }: Props) {
    return (
        <ColorsContext.Provider value={dark}>
            {children}
        </ColorsContext.Provider>
    );
}

export const useColors = () => useContext(ColorsContext);
