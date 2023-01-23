import * as AsyncStorage from "@react-native-async-storage/async-storage";
type Saves = "@settings";

import log, { LogConfigs } from "../utils/log";

function dbLog(msg: string, options?: LogConfigs) {
    log(msg, { from: "DB", ...options });
}

export async function getItem<T = Object>(key: Saves, tab?: boolean): Promise<T | null> {
    dbLog(`${tab ? "\t↳ " : ""}Obtendo dados de "${key}"`);
    const data = await AsyncStorage.default.getItem(key);
    log(`Dados obtidos de "${key}".`, { color: "fgGray", tab: true })
    return data ? JSON.parse(data) : null;
}

export async function setItem<T = Object>(key: Saves, value: T, tab?: boolean): Promise<T> {
    dbLog(`${tab ? "\t↳ " : ""}Definindo dados em "${key}"`);
    await AsyncStorage.default.setItem(key, JSON.stringify(value));
    log(`Dados definidos para "${key}".`, { color: "fgGray", tab: true })
    return value;
}
