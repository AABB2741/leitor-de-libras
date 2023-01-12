import * as AsyncStorage from "@react-native-async-storage/async-storage";
type Saves = "@settings";

import log from "../utils/log";

function dbLog(msg: string) {
    log(msg, {from: "DB"});
}

export async function getItem<T = Object>(key: Saves, tab?: boolean): Promise<T | null> {
    dbLog(`${tab ? "\t↳ " : ""}Obtendo itens de "${key}"`);
    const data = await AsyncStorage.default.getItem(key);
    return data ? JSON.parse(data) : null;
}

export async function setItem<T = Object>(key: Saves, value: T, tab?: boolean): Promise<T> {
    dbLog(`${tab ? "\t↳ " : ""}Definindo itens em "${key}"`);
    await AsyncStorage.default.setItem(key, JSON.stringify(value));
    return value;
}
