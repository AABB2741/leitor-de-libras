import { useState, useEffect, createContext, useContext } from "react";

import USER, { UserProps } from "../constants/user";

import log from "../utils/log";

type UserContextValue = {
    user: UserProps | null;
    signed: null | boolean; // null significa que ainda não foi carregado
    logOut: () => void;
}

interface UserProviderProps {
    children: JSX.Element;
}

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null);
    const [signed, setSigned] = useState<boolean | null>(null);

    async function logOut() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(false);
            }, 2500);
        });
    }

    useEffect(() => {
        log("Carregando informações do usuário...", { color: "fgGray" });
        setTimeout(() => {
            setUser(USER);
            setSigned(true);
        }, 2500);
    }, []);

    return (
        <UserContext.Provider value={{ user, signed, logOut }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
