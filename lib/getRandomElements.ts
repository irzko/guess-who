import seedrandom from 'seedrandom';



export function getRandomElements(array:any[], n: number, seed: string) {
    const random = seedrandom(seed);
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, n);
}
