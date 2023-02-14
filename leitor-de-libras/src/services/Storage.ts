import "react-native-get-random-values";
import { v4 as uuid4 } from "uuid";

import * as AsyncStorage from "@react-native-async-storage/async-storage";
import merge from "ts-deepmerge";
import { SettingsProps } from "../constants/settings";
import { DeepPartial } from "../utils/DeepPartial";

type Saves = {
    "_teste": boolean;
    "_outro": string;
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

export async function setItem<T extends keyof Saves>(key: T, value: Object, tab?: boolean): Promise<Object> {
    dbLog(`Definindo dados em "${key}"`, { tab });
    await AsyncStorage.default.setItem(key, JSON.stringify(value));
    log(`Dados definidos para "${key}".`, { color: "fgGray", tab: true })
    return value;
}

export async function mergeItem<T extends keyof Saves>(key: T, value: DeepPartial<Saves[T]>) {
    dbLog(`Fundindo dados de "${key}"`);
    const data = await getItem(key, true) ?? {};
    const res = merge(data, value);
    await setItem(key, res as DeepPartial<Saves[T]> & Object, true);
    dbLog(`Itens de "${key}" fundidos.`, { tab: true });
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
    await setItem(key, data, true);
    dbLog(`Dados inseridos em "${key}"`, { tab: true });
    return item;
}

// (X) TODO: Verificar o porquê de quando é trocado por "U", o value de predicate dá erro                                                     V
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

    setItem(key, data);
    return newItem;
}

// export async function findItem<T extends keyof Saves, U extends Saves[T] extends any[] ? Saves[T][number] : never>(key: T, predicate: (value: U, index: number, obj: U[]) => boolean): Promise<U | null> {
//     dbLog(`Procurando itens em "${key}"`);
//     const data = await getItem(key, true) ?? [];
// }

export async function findItem<T extends keyof Saves, U extends Saves[T] extends any[] ? Saves[T][number] : never>(key: T, predicate: (value: U, index: number, obj: U[]) => boolean): Promise<U | null> {
    dbLog(`Procurando itens em "${key}"`);
    const data = (await getItem(key, true) ?? []) as U[];
    if (!Array.isArray(data))
        throw new TypeError(`Tentando procurar um elemento de uma base de dados que não é um array (${key})`);

    const res = data.find(predicate);
    dbLog(`Item em "${key}" procurado`, { tab: true });
    return res ?? null;
}

// TODO: Finalizar a função de atualizar item do banco
/*
export async function updateItem<T extends keyof Saves>(key: T, predicate: (value: Saves[T]) => boolean, value: DeepPartial<Saves[T]>) {
    const data = await getItem(key, true) ?? [] as Saves[T][];
    if (!Array.isArray(data))
        throw new TypeError(`Tentando atualizar um elemento de uma base de dados que não é um array (${key}).`);

    const index = data.findIndex(predicate);
    const found = data[index] ?? {};
    const res = { ...found, ...value };
    return res;
}
*/

export const clear = AsyncStorage.default.clear;
