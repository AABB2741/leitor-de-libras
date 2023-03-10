import { useState, useEffect, createContext, useContext } from "react";
import * as Storage from "../services/Storage";
import axios from "axios";

import USER from "../constants/user";

import api from "../constants/api.json";
import log from "../utils/log";

type UserContextValue = {
    user: UserProps | null;
    signed: null | boolean; // null significa que ainda não foi carregado
    usingLocal: boolean | null;
    token?: string;
    login: (email: string, password: string) => Promise<boolean>;
    logOut: () => Promise<boolean>;
}

interface UserProviderProps {
    children: JSX.Element;
}

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null);
    const [signed, setSigned] = useState<boolean | null>(null);
    const [usingLocal, setUsingLocal] = useState<boolean | null>(null);

    async function login(email: string, password: string) {
        log("Fazendo login...", { color: "fgGray" });
        if (!email.trim() || !password.trim())
            return false;

        // TODO: Terminar requisição de login
        const response = await axios.post<UserProps & { token: string }>(`${api.address}/user/login`, {
            email,
            password
        });

        console.log(response);

        return false;
    }

    async function logOut() {
        log("Desconectando-se...", { color: "fgGray" });
        await Storage.deleteItem("user");
        setUser(null);
        setSigned(false);
        setUsingLocal(false);
        log("Desconectado", { tab: true });
        return true;
    }

    // TODO: Verificar alterações de conexão; se estiver usando conta local e achar internet, tentar conectar
    useEffect(() => {
        log("Carregando informações do usuário...", { color: "fgGray" });
        Storage.getItem("user").then(user => {
            if (!user) {
                setUser(null);
                setSigned(false);
                setUsingLocal(false);
            } else {
                setUser(user);
                setSigned(true);
                setUsingLocal(false);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, signed, usingLocal, token: "AS(VU*KDasu8k9dvu8k9sadv89alsdJ*)", login, logOut }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
