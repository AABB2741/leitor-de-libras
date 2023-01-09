import { useState, createContext, useContext } from "react";
import merge from "ts-deepmerge";
import pt_BR from "../lang/pt_BR.json";
import en_US from "../lang/en_US.json";

export type LangProps = typeof pt_BR

interface LangProviderProps {
    children: JSX.Element;
}

const ln = merge(pt_BR, en_US);

const LangContext = createContext<LangProps>(pt_BR);

export default function LangProvider({ children }: LangProviderProps) {
    return (
        <LangContext.Provider value={pt_BR}>
            {children}
        </LangContext.Provider>
    );
}

export const useLang = () => useContext(LangContext);
