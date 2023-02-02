export type SuggestionProps = {
    msg: string;
    shortMsg?: string;
    respondsTo?: string[];
    initial?: boolean;
}

const SUGGESTIONS: SuggestionProps[] = [{
    msg: "Olá, tudo bem?",
    respondsTo: ["olá"],
    initial: true
}, {
    msg: "Estou bem!",
    respondsTo: ["bem"]
}, {
    msg: "Onde fica o banheiro?",
    initial: true,
    respondsTo: ["precisa"]
}, {
    msg: "Pode me ajudar?",
    initial: true
}, {
    msg: "Do que você precisa?",
    respondsTo: ["ajuda"]
}, {
    shortMsg: "Onde tem hospital?",
    msg: "Você sabe onde tem algum hospital por perto?",
    respondsTo: ["precisa"]
}, {
    msg: "Deixa pra lá",
    respondsTo: ["precisa"]
}];

export default SUGGESTIONS;
