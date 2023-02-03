import * as AsyncStorage from "@react-native-async-storage/async-storage";
import merge from "ts-deepmerge";
import { SettingsProps } from "../constants/settings";
import { DeepPartial } from "../utils/DeepPartial";

type Saves = {
    "@settings": SettingsProps;
    "@introduction": {
        "skip_login": boolean;
        "conversations": boolean;
    },
    "conversations": ConversationProps[]
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
    await setItem(key, res as DeepPartial<Saves[T]>, true);
    dbLog(`Itens de "${key}" fundidos.`, { tab: true });
}

export const clear = AsyncStorage.default.clear;
