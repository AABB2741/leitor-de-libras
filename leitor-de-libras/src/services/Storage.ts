import * as AsyncStorage from "@react-native-async-storage/async-storage";
type Saves = "@settings";

function log(msg: string) {
    const d = new Date();
    console.log(`[${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}] ${msg}`);
}

export async function getItem<T = Object>(key: Saves, tab?: boolean): Promise<T | null> {
    log(`${tab ? "\t↳ " : ""}Obtendo itens de "${key}"`);
    const data = await AsyncStorage.default.getItem(key);
    return data ? JSON.parse(data) : null;
}

export async function setItem<T = Object>(key: Saves, value: T, tab?: boolean): Promise<T> {
    log(`${tab ? "\t↳ " : ""}Definindo itens em "${key}"`);
    await AsyncStorage.default.setItem(key, JSON.stringify(value));
    return value;
}
