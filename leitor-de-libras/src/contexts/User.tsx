import { useState, useEffect, createContext, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { useLang } from "./lang";
import * as Storage from "../services/Storage";
import * as SecureStore from "expo-secure-store";

import USER from "../constants/user";

import { api } from "../lib/api";
import log from "../utils/log";

type UserContextValue = {
    user: UserProps;
    signed: null | boolean; // null significa que ainda não foi carregado
    signUp: (
        name: string,
        email: string,
        password: string
    ) => Promise<ResponseCode>;
    login: (
        email: string,
        password: string
    ) => Promise<ResponseCode> | "empty_fields";
    logOut: () => Promise<boolean>;
    loadUser: () => Promise<void>;
};

interface UserProviderProps {
    children: JSX.Element;
}

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export default function UserProvider({ children }: UserProviderProps) {
    const lang = useLang();

    const [user, setUser] = useState<UserProps | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const signed = !!user;

    useEffect(() => {
        loadUser();
    }, []);

    async function signUp(
        name: string,
        email: string,
        password: string
    ): Promise<ResponseCode> {
        if (!name.trim() || !email.trim() || !password.trim())
            return "empty_fields";

        if (!email.includes("@")) return "invalid_email";

        if (password.length < 8) return "invalid_password_length";

        try {
            const { data } = await api.post<UserProps & { token: string }>(
                `/user/signUp`,
                {
                    name,
                    email,
                    password,
                }
            );

            if (!data) return "unknown_err";

            const u = await Storage.setItem("user", {
                avatar: user?.avatar,
                name: data?.name,
                email: data?.email,
                aboutMe: data?.aboutMe,
            });
            await SecureStore.setItemAsync("token", data.token);

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

    async function login(
        email: string,
        password: string
    ): Promise<ResponseCode> {
        if (!email.trim() || !password.trim()) return "empty_fields";

        try {
            log("Tentando fazer login...");

            const { data } = await api.post<UserProps & { token: string }>(
                "/user/login",
                {
                    email,
                    password,
                },
                { timeout: 15000 }
            );

            const u = await Storage.setItem("user", {
                avatar: data?.avatar,
                name: data?.name,
                email: data?.email,
                aboutMe: data?.aboutMe,
            });

            if (!data?.token) return "data_retrieve_error";

            // TODO: Remover uso do storage para guardar token
            await SecureStore.setItemAsync("token", data.token);

            log(`Conectado. Token de acesso: ${data.token}`, {
                color: "fgGray",
                tab: true,
            });
            setUser(u);
            setToken(data.token);
            return "ok";
        } catch (e) {
            const err: any = e;
            log(`Erro ao solicitar login à API: ${err}`, { color: "fgRed" });

            if (err?.response?.status === 401) {
                return "invalid_credentials";
            } else return "network_err";
        }
    }

    async function logOut() {
        log("Desconectando-se...");
        log("Excluindo token de autenticação...", {
            color: "fgGray",
            tab: true,
        });

        await SecureStore.deleteItemAsync("token");

        try {
            log("Solicitando à API a exclusão do token", {
                color: "fgGray",
                tab: true,
            });
        } catch (e) {
            log("Erro ao solicitar exclusão do token: " + e);
        }

        log("Excluindo usuário salvo localmente...", {
            color: "fgGray",
            tab: true,
        });
        await Storage.deleteItem("user");
        setUser(null);
        log("Desconectado", { tab: true, color: "fgGray" });
        return true;
    }

    // TODO: Verificar alterações de conexão; se estiver usando conta local e achar internet, tentar conectar
    async function loadUser() {
        log("Carregando informações do usuário...", { color: "fgGray" });
        const token = await SecureStore.getItemAsync("token");
        let res = await Storage.getItem("user");

        try {
            log("Obtendo informações do usuário no servidor...", { color: "fgGray" })
            const { data } = await api.get<UserProps>("/user/get", {
                headers: {
                    Authorization: token
                }
            });

            console.log(data);
            res = { ...res, ...data };
        } catch (err) {
            console.error(err);
        }

        setUser(res);

        // log("Obtendo token de sessão salvo...", { color: "fgGray" });
        // const token = await SecureStore.getItemAsync("token");
        // log(
        //     token
        //         ? `Token encontrado: ${token}`
        //         : "Não há um token de autenticação salvo.",
        //     { color: "fgGray", tab: true }
        // );
        // setToken(token);
        // log("Carregando informações do usuário...", { color: "fgGray" });
        // const user = await Storage.getItem("user");
        // setUser(user);
    }

    const baseUser: Partial<UserProps> = {
        name: lang.general.anonymous,
        avatar: require("../../assets/imgs/profile-picture.jpg"),
    };

    const finalUser = { ...baseUser, ...user } as UserProps;

    return (
        <UserContext.Provider
            value={{ user: finalUser, signed, loadUser, signUp, login, logOut }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
