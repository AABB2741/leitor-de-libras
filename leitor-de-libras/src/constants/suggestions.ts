export type SuggestionProps = {
    msg: string;
    shortMsg?: string;
    respondsTo?: string[];
    initial?: boolean;
}

const SUGGESTIONS: SuggestionProps[] = [{
    msg: "Olá, tudo bem?",
    respondsTo: ["olá", "oi"],
    initial: true
}, {
    msg: "Tudo ótimo!",
    respondsTo: ["tudo bem"]
}, {
    msg: "Qual seu nome?",
    respondsTo: ["tudo ótimo"]
}, {
    msg: "Prefiro não dizer",
    respondsTo: ["nome"]
}, {
    msg: "Onde fica o banheiro?",
    initial: true,
    respondsTo: ["precisa", "tudo ótimo"]
}, {
    msg: "Pode me ajudar?",
    initial: true,
    respondsTo: ["tudo ótimo"]
}, {
    msg: "Do que você precisa?",
    respondsTo: ["ajuda", "ok"]
}, {
    shortMsg: "Onde tem hospital?",
    msg: "Você sabe onde tem algum hospital por perto?",
    respondsTo: ["precisa"]
}, {
    msg: "Deixa pra lá",
    respondsTo: ["precisa"]
}, {
    msg: "Vou verificar",
    respondsTo: ["onde", "você sabe"]
}, {
    msg: "Não sei",
    respondsTo: ["onde", "você sabe"]
}, {
    msg: "Não",
    respondsTo: ["mais algum", "você sabe", "onde"]
}, {
    msg: "Obrigado!"
}, {
    msg: "Ok, obrigado!",
    respondsTo: ["Não sei"]
}, {
    msg: "De nada",
    respondsTo: ["obrigado", "obrigada", "ok, obrigado", "vlw", "valeu"]
}, {
    shortMsg: "Mais algo?",
    msg: "Precisa de mais alguma coisa?",
    respondsTo: ["obrigado", "obrigada", "ok", "obrigado", "vlw", "valeu"]
}, {
    msg: "Preciso ir",
    respondsTo: ["obrigado", "obrigada", "ok, obrigado", "vlw", "valeu", "de nada", "por nada", "por nd"]
}, {
    msg: "Ok",
    respondsTo: ["preciso ir", "prefiro", "vou verificar", "não", "nada"]
}, {
    msg: "Tchau",
    respondsTo: ["tchau", "flw", "preciso ir", "até a próxima"]
}];

export default SUGGESTIONS;
