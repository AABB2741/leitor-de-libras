/**
 * Removes duplicated items in two arrays.
 * The second array passed will overwrite the first
 * 
 * @example
 * const ar1 = [{a: 1}, {b: 2}]
 * const ar2 = [{a: 2}, {c: 3}]
 * deduplicate(ar1, ar2, (a, b) => a.a == b.a) // [{a: 1}, {b: 2}, {c: 3}]
 */
export function deduplicate<T extends any>(ar1: T[], ar2: T[], predicate: (a: T, b: T) => boolean): T[] {
    const res: T[] = [];

    for (let i of ar1) {
        let repeated = false;

        for (let j of ar2) {
            let r = predicate(i, j)

            if (r) {
                res.push(j);
                repeated = true;
                break;
            }
        }

        if (!repeated) {
            res.push(i);
        }
    }

    return res;
}
