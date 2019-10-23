// Use this file until Electron 6 lands in VSCode
export function* matchAll(s: string, r: RegExp): Iterable<RegExpMatchArray> {
    if (!r.flags.includes('g')) {
        const result = r.exec(s);
        if (result == null) return;

        yield result;
        return;
    }

    while (true) {
        const result = r.exec(s);
        if (result == null) {
            return;
        }
        yield result;
    }
}
