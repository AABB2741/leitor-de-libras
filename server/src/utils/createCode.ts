export function createCode(length: number = 6) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    const res = Math.floor(min + Math.random() * (max - min + 1));
    return res.toString();
}