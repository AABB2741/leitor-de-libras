import { useState, createContext, useContext } from "react";
import Settings from "../constants/settings";
import SettingsProps from "../@types/SettingsProps";

interface Props {
    children: React.ReactNode;
}

const SettingsContext = createContext<SettingsProps>(Settings);

export default function SettingsProvider({ children }: Props) {
    return (
        <SettingsContext.Provider value={Settings}>
            { children }
        </SettingsContext.Provider>
    );
}

export const useSettings = () => useContext(SettingsContext);
