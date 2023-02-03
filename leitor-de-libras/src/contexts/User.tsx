import { useState, useEffect, createContext, useContext } from "react";

import USER, { UserProps } from "../constants/user";

import log from "../utils/log";

type UserContextValue = {
    user?: UserProps;
    signed: boolean;
    logOut: () => void;
}

interface UserProviderProps {
    children: JSX.Element;
}

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null);

    async function logOut() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(false);
            }, 1000);
        });
    }

    useEffect(() => {
        log("Carregando informações do usuário...", { color: "fgGray" });
        setTimeout(() => {
            setUser(USER);
        }, 1000);
    }, []);

    if (user === null)
        return null;
    log(`Usuário "${user.name ?? "Anônimo"}" carregado`, { color: "fgGray", tab: true });
    return (
        <UserContext.Provider value={{ user, signed: true, logOut }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
