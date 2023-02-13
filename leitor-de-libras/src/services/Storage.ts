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

// export async function pushItem<T extends keyof Saves, K extends Saves[T]>(key: Saves[T] extends Object[] ? T : never, value: DeepPartial<K[keyof K]>): Promise<typeof value & { id: string }> {
//     dbLog(`Inserindo dados em "${key}"`);
//     const data = await getItem(key, true) as Object[] | null ?? [];
//     const item = {
//         ...value,
//         id: uuid4()
//     }
//     data.push(item);
//     await setItem(key, data, true);
//     return item;
// }

export async function pushItem(...keys: (keyof Saves)[]) {

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
