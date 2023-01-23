import * as AsyncStorage from "@react-native-async-storage/async-storage";
import { SettingsProps } from "../constants/settings";
import { DeepPartial } from "../utils/DeepPartial";

type Saves = {
    "@settings": SettingsProps;
    "@welcome": {
        "skip_login": boolean;
    }
};

import log, { LogConfigs } from "../utils/log";

function dbLog(msg: string, options?: LogConfigs) {
    log(msg, { from: "DB", ...options });
}

export async function getItem<T extends keyof Saves>(key: T, tab?: boolean): Promise<Saves[T] | null> {
    dbLog(`${tab ? "\t↳ " : ""}Obtendo dados de "${key}"`);
    const data = await AsyncStorage.default.getItem(key);
    log(`Dados obtidos de "${key}".`, { color: "fgGray", tab: true })
    return data ? JSON.parse(data) : null;
}

export async function setItem<T extends keyof Saves>(key: T, value: DeepPartial<Saves[T]>, tab?: boolean): Promise<DeepPartial<Saves[T]>> {
    dbLog(`${tab ? "\t↳ " : ""}Definindo dados em "${key}"`);
    await AsyncStorage.default.setItem(key, JSON.stringify(value));
    log(`Dados definidos para "${key}".`, { color: "fgGray", tab: true })
    return value;
}
