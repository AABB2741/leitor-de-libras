export default function normalize(text: string, lowerCase?: boolean) {
    return lowerCase ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim().toLowerCase() : text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
}
