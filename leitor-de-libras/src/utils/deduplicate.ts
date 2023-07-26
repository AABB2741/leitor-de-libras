/**
 * Removes duplicated items in two arrays.
 * The second array passed will overwrite the first
 * 
 * @example
 * const ar1 = [{a: 1}, {b: 3}]
 * const ar2 = [{a: 2}, {c: 4}]
 * deduplicate(ar1, ar2, (a, b) => a.a == b.a) // [{a: 2}, {b: 3}, {c: 4}]
 * 
 * @returns
 * [newArray, ar1Duplicated] // newArray -> ar2 merged to ar1; ar1Duplicated -> ar1 overwritten items
 */
export function deduplicate<T extends any>(ar1: T[], ar2: T[], predicate: (a: T, b: T) => boolean): [T[], T[]] {
    const res: T[] = [];
    const duplicated: T[] = []

    for (let i of ar1) {
        let repeated = false;

        for (let j of ar2) {
            let r = predicate(i, j)

            if (r) {
                res.push(j);
                duplicated.push(i);
                repeated = true;
                break;
            }
        }

        if (!repeated) {
            res.push(i);
        }
    }

    return [res, duplicated];
}
