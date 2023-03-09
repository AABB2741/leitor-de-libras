import en_US from "./en_US.json"
import pt_BR from "./pt_BR.json";

export type LangProps = typeof pt_BR;

export function getLang(lang?: Lang): LangProps {
    const langs = {
        pt_BR,
        en_US
    };

    return (langs[lang ?? "pt_BR"] ?? langs["pt_BR"]) as LangProps;
}
