import "react-native-get-random-values";
import { v4 as uuid4 } from "uuid";

import * as AsyncStorage from "@react-native-async-storage/async-storage";
import merge from "ts-deepmerge";
import { SettingsProps } from "../constants/settings";
import { DeepPartial } from "../utils/DeepPartial";

type Saves = {
    "user": UserProps,
    "#session_token": string;
    "@settings": SettingsProps;
    "@introduction": {
        "skip_login": boolean;
        "conversations": boolean;
    };
    "@talk:conversations": MeetProps[];
    "@talk:messages": {
        conversationId: string;
        messages: Msg[];
    }[];
};

import log, { LogConfigs } from "../utils/log";

function dbLog(msg: string, options?: LogConfigs) {
    log(msg, { from: "DB", ...options });
}

export async function getItem<T extends keyof Saves>(key: T, tab?: boolean): Promise<Saves[T] | null> {
    dbLog(`Obtendo dados de "${key}"`, { tab });
    const data = await AsyncStorage.default.getItem(key);
    log(`Dados obtidos de "${key}".`, { color: "fgGray", tab: true })
    return data ? JSON.parse(data) : null;
}

export async function setItem<T extends keyof Saves>(key: T, value: Saves[T], tab?: boolean): Promise<Saves[T]> {
    dbLog(`Definindo dados em "${key}"`, { tab });
    await AsyncStorage.default.setItem(key, JSON.stringify(value));
    log(`Dados definidos para "${key}".`, { color: "fgGray", tab: true })
    return value;
}

export async function mergeItem<T extends keyof Saves>(key: T, value: DeepPartial<Saves[T]>) {
    dbLog(`Fundindo dados de "${key}"`);
    const data = await getItem(key, true) ?? {};
    const resTemp = merge(data, value);
    // TODO: Verificar se isso funciona
    if (isSavesOfType<T>(resTemp)) {
        const res = resTemp;
        await setItem(key, res, true);
        dbLog(`Itens de "${key}" fundidos.`, { tab: true });
    } else {
        throw new Error(`Tipo inválido para ${key}`);
    }

    function isSavesOfType<T extends keyof Saves>(value: unknown): value is Saves[T] {
        return typeof value === "object" && value !== null;
    }
}

export async function deleteItem<T extends keyof Saves>(key: T, tab?: boolean): Promise<Saves[T] | null> {
    dbLog(`Excluindo "${key}"`);
    const data = await getItem(key);
    await AsyncStorage.default.removeItem(key);
    return data;
}

export async function pushItem<T extends keyof Saves, U = Saves[T] extends any[] ? Saves[T][number] : never>(key: T, value: U): Promise<U & { id: string }> {
    dbLog(`Inserindo dados em "${key}"`);
    const data = await getItem(key, true) ?? [] as unknown[T];
    if (!Array.isArray(data))
        throw new TypeError(`Tentando inserir um elemento em uma base de dados que não é um array (${key}).`);

    const item = {
        ...value,
        id: uuid4()
    }

    data.push(item);
    await setItem(key, data as Saves[T], true);
    dbLog(`Dados inseridos em "${key}"`, { tab: true });
    return item;
}

export async function updateItem<T extends keyof Saves, U extends Saves[T] extends any[] ? Saves[T][number] : never>(key: T, predicate: (value: U, index: number, obj: U[]) => boolean, value: Partial<U>): Promise<U | null> {
    dbLog(`Atualizando dados de "${key}"`);
    const data = (await getItem(key, true) ?? []) as U[];
    if (!Array.isArray(data))
        throw new TypeError(`Tentando atualizar um elemento de uma base de dados que não é um array (${key}).`);

    const index = data.findIndex(predicate);

    const newItem = {
        ...data[index],
        ...value
    }

    if (index === -1) {
        data.push(newItem);
    } else data[index] = newItem;

    setItem(key, data as U);
    return newItem;
}

export async function findItem<T extends keyof Saves, U extends Saves[T] extends any[] ? Saves[T][number] : never>(key: T, predicate: (value: U, index: number, obj: U[]) => boolean): Promise<U | null> {
    dbLog(`Procurando itens em "${key}"`);
    const data = (await getItem(key, true) ?? []) as U[];
    if (!Array.isArray(data))
        throw new TypeError(`Tentando procurar um elemento de uma base de dados que não é um array (${key})`);

    const res = data.find(predicate);
    dbLog(`Item em "${key}" procurado`, { tab: true });
    return res ?? null;
}

export async function removeItem<T extends keyof Saves, U extends Saves[T] extends any[] ? Saves[T][number] : never>(key: T, predicate: (value: U, index: number, obj: U[]) => boolean): Promise<U | null> {
    dbLog(`Removendo item de "${key}"`);
    const data = (await getItem(key, true) ?? []) as U[];
    if (!Array.isArray(data))
        throw new TypeError(`Tentando excluir um elemento de uma base de dados que não é um array (${key})`);

    const index = data.findIndex(predicate);
    if (index === -1) {
        dbLog(`O item a remover de "${key}" não foi encontrado`);
        return null;
    }

    const exclude = data[index];
    data.splice(index, 1);
    await setItem(key, data as U, true);
    dbLog(`Dado de "${key}" excluído`);
    return exclude;
}

export const clear = () => AsyncStorage.default.multiRemove(["@settings", "@introduction", "@talk:conversations", "@talk:messages"]);
