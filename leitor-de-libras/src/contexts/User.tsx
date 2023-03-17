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
    signUp: (name: string, email: string, password: string) => Promise<ResponseCode>;
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

    async function signUp(name: string, email: string, password: string): Promise<ResponseCode> {
        if (!name.trim() || !email.trim() || !password.trim())
            return "empty_fields";

        if (!email.includes("@"))
            return "invalid_email";

        if (password.length < 8)
            return "invalid_password_length";

        try {
            const { data } = await axios.post<UserProps & { token: string }>(`${api.address}/user/signUp`, {
                name,
                email,
                password
            });

            if (!data)
                return "unknown_err";

            const u = await Storage.setItem("user", {
                avatar: user?.avatar,
                name: data?.name,
                email: data?.email,
                about_me: data?.about_me
            });

            setUser(u);

            return "ok";
        } catch (e) {
            const err: any = e;
            log(`Erro ao solicitar cadastro à API: ${err}`, { color: "fgRed" });

            if (err?.response?.status === 409) {
                return "email_already_in_use";
            } else return err?.response?.code ?? "unknown_err";
        }
    }

    async function login(email: string, password: string): Promise<ResponseCode> {
        if (!email.trim() || !password.trim())
            return "empty_fields";

        try {
            const { data } = await axios.post<UserProps & { token: string }>(`${api.address}/user/login`, {
                email,
                password
            }, { timeout: 15000 });

            const u = await Storage.setItem("user", {
                avatar: data?.avatar,
                name: data?.name,
                email: data?.email,
                about_me: data?.about_me
            });

            log(`Conectado. Token de acesso: ${data.token}`);
            setUser(u);
            return "ok";
        } catch (e) {
            const err: any = e;
            log(`Erro ao solicitar login à API: ${err}`, { color: "fgRed" });

            if (err?.response?.status === 401) {
                return "invalid_credentials";
            } else return "network_err";
        }
    }

    // function login(email: string, password: string): Promise<ResponseCode> | "empty_fields" {
    //     if (!email.trim() || !password.trim())
    //         return "empty_fields";

    //     return new Promise((resolve, reject) => {
    //         axios.post<UserProps & { token: string }>(`${api.address}/user/login`, {
    //             email,
    //             password
    //         }, { timeout: 15000 }).then(response => {
    //             const { data } = response;
    //             Storage.setItem("user", {
    //                 avatar: data.avatar,
    //                 name: data.name,
    //                 email: data.email
    //             }).then(u => {
    //                 log(`Conectado. Dados recebidos: ${JSON.stringify(u)}`);
    //                 setUser(u);
    //                 resolve("ok");
    //             });
    //         }).catch(e => {
    //             if (e?.response?.status === 401) {
    //                 resolve("invalid_credentials");
    //             } else resolve("network_err");
    //         });
    //     });
    // }

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
        <UserContext.Provider value={{ user, signed, token: "AS(VU*KDasu8k9dvu8k9sadv89alsdJ*)", signUp, login, logOut }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
