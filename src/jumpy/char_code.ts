/* eslint-disable */
const DEFAULT_PRIMARY_CHARS = [
    'q', 'w', 'e', 'r',
    'a', 's', 'd', 'f',
    '1', '2', '3', '4',
    'z', 'x', 'c', 'v',
];

const ALL_ALLOWED_CHARS = [
    'q', 'w', 'e', 'r',
    'a', 's', 'd', 'f',
    '1', '2', '3', '4',
    'z', 'x', 'c', 'v',
    'p', 'o', 'i',
    'l', 'k', 'j',
    'm', 'n',
    '0', '9',
    't', 'y', 'u',
    'g', 'h',
    'b',
    '5', '6', '7', '8',
];
/* eslint-enable */

function combineElements(arrA: string[], arrB: string[], callback: (s: string) => void): void {
    const results: { text: string; i: number; j: number; t: number }[] = [];

    for (let i = 0; i < arrA.length; i++) {
        for (let j = 0; j < arrB.length; j++) {
            results.push({
                i,
                j,
                text: arrA[i] + arrB[j],
                t: i + j,
            });
        }
    }

    results
        .sort((a, b) => {
            if (a.t !== b.t) return a.t - b.t;
            if (a.i !== b.i) return a.i - b.i;
            return a.j - b.j;
        })
        .forEach((elem) => callback(elem.text));
}

export function createCharCodeSet(primaryCharacters = DEFAULT_PRIMARY_CHARS): string[] {
    const primaryChars = primaryCharacters.filter((char) => ALL_ALLOWED_CHARS.includes(char));
    const secondaryChars = ALL_ALLOWED_CHARS.filter((char) => !primaryChars.includes(char));

    const codeSet: string[] = [];
    const callback = (str: string): void => {
        codeSet.push(str);
    };

    combineElements(primaryChars, primaryChars, callback);
    combineElements(primaryChars, secondaryChars, callback);
    combineElements(secondaryChars, secondaryChars, callback);

    return codeSet;
}
