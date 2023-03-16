import { useState, useEffect, createContext, useContext } from "react";
import * as Storage from "../services/Storage";
import axios, { AxiosResponse } from "axios";

import USER from "../constants/user";

import api from "../constants/api.json";
import log from "../utils/log";

type UserContextValue = {
    user: UserProps | null;
    signed: null | boolean; // null significa que ainda não foi carregado
    token?: string;
    login: (email: string, password: string) => Promise<ResponseCode> | "empty_fields";
    logOut: () => Promise<boolean>;
}

interface UserProviderProps {
    children: JSX.Element;
}

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null);
    const signed = !!user;

    // async function login(email: string, password: string) {
    //     log("Fazendo login...", { color: "fgGray" });
    //     if (!email.trim() || !password.trim())
    //         return "empty_fields";

    //     // TODO: Terminar requisição de login
    //     try {
    //         const response = await axios.post<UserProps & { token: string }>(`${api.address}/user/login`, {
    //             email,
    //             password
    //         }, { timeout: 5000 });
    //         console.log(response);
            
    //         return "ok";
    //     } catch (e) {
    //         log("Erro ao fazer login:\n" + e, { color: "fgRed" });
    //         return "network_err";
    //     }
    // }

    function login(email: string, password: string): Promise<ResponseCode> | "empty_fields" {
        if (!email.trim() || !password.trim())
            return "empty_fields";

        return new Promise((resolve, reject) => {
            axios.post<UserProps & { token: string }>(`${api.address}/user/login`, {
                email,
                password
            }, { timeout: 15000 }).then(response => {
                const { data } = response;
                Storage.setItem("user", {
                    avatar: data.avatar,
                    name: data.name,
                    email: data.email
                }).then(u => {
                    log(`Conectado. Dados recebidos: ${JSON.stringify(u)}`);
                    setUser(u);
                    resolve("ok");
                });
            }).catch(e => {
                if (e?.response?.status === 401) {
                    resolve("invalid_credentials");
                } else resolve("network_err");
            });
        });
    }

    async function logOut() {
        log("Desconectando-se...", { color: "fgGray" });
        await Storage.deleteItem("user");
        setUser(null);
        log("Desconectado", { tab: true });
        return true;
    }

    // TODO: Verificar alterações de conexão; se estiver usando conta local e achar internet, tentar conectar
    useEffect(() => {
        log("Carregando informações do usuário...", { color: "fgGray" });
        Storage.getItem("user").then(user => {
            if (!user) {
                setUser(null);
            } else setUser(user);
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, signed, token: "AS(VU*KDasu8k9dvu8k9sadv89alsdJ*)", login, logOut }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
