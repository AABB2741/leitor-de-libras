import { DeepPartial } from "../utils/DeepPartial";
import merge from "ts-deepmerge";

import pt_BR from "./pt_BR.json";
import en_US from "./en_US.json";

type LangListItem = {
    name: LangName;
    lang: DeepPartial<LangProps>;
}

export const LANGS: LangListItem[] = [{
    name: "pt_BR",
    lang: pt_BR
}, {
    name: "en_US",
    lang: en_US
}];

export default function getLang(name: LangName) {
    return merge(pt_BR, LANGS.find(l => l.name === name)?.lang ?? {}) as LangProps;
}

export type LangProps = typeof pt_BR;
export type LangName = "auto" | "pt_BR" | "en_US";
