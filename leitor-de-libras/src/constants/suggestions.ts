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
}, {
    msg: "Vou verificar",
    respondsTo: ["onde", "você sabe"]
}, {
    msg: "Não sei",
    respondsTo: ["onde", "você sabe"]
}, {
    msg: "Obrigado(a)!"
}, {
    msg: "Ok, obrigado(a)!",
    respondsTo: ["Não sei"]
}, {
    msg: "De nada",
    respondsTo: ["obrigado", "obrigada", "obrigado(a)", "ok, obrigado", "vlw", "valeu"]
}, {
    shortMsg: "Mais algo?",
    msg: "Precisa de mais alguma coisa?",
    respondsTo: ["obrigado", "obrigada", "obrigado(a)", "ok, obrigado", "vlw", "valeu"]
}, {
    msg: "Preciso ir",
    respondsTo: ["obrigado", "obrigada", "obrigado(a)", "ok, obrigado", "vlw", "valeu", "de nada", "por nada", "por nd"]
}, {
    msg: "Ok",
    respondsTo: ["preciso ir"]
}, {
    msg: "Tchau",
    respondsTo: ["tchau", "flw", "preciso ir", "até a próxima"]
}];

export default SUGGESTIONS;
