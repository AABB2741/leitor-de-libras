import { LangProps } from "../lang/getLang";

export type SuggestionProps = {
    msg: string;
    shortMsg?: string;
    respondsTo?: string[];
    initial?: boolean;
}

export default function getSuggestions(lang: LangProps) {
    const SUGGESTIONS: SuggestionProps[] = [{
        ...lang.conversations.suggestions.greetings,
        initial: true
    }, {
        ...lang.conversations.suggestions.im_ok
    }, {
        ...lang.conversations.suggestions.ask_bathroom,
        initial: true,
    }, {
        ...lang.conversations.suggestions.ask_help,
        initial: true
    }, {
        ...lang.conversations.suggestions.what_you_need,
        respondsTo: ["ajuda", "ok"]
    }, {
        ...lang.conversations.suggestions.ask_hospital
    }, {
        ...lang.conversations.suggestions.nevermind
    }, {
        ...lang.conversations.suggestions.ill_check
    }, {
        ...lang.conversations.suggestions.idk
    }, {
        ...lang.conversations.suggestions.no
    }, {
        ...lang.conversations.suggestions.thanks
    }, {
        ...lang.conversations.suggestions.ok_thanks
    }, {
        ...lang.conversations.suggestions.youre_welcome
    }, {
        ...lang.conversations.suggestions.anything_else
    }, {
        ...lang.conversations.suggestions.need_to_go
    }, {
        ...lang.conversations.suggestions.ok
    }, {
        ...lang.conversations.suggestions.bye
    }];

    return SUGGESTIONS;
}
