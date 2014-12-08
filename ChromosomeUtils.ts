module Tsp {
    export function nextInt(min: number, max: number): number {
        return Math.floor((Math.random() * (max - min)) + min);
    }
    export function next(): number {
        return Math.random();
    }

    export function truncate(n: number, digits: number): number {
        var multiplier = Math.pow(10, digits),
            adjustedNum = n * multiplier,
            truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

        return truncatedNum / multiplier;
    };

    export function chromosomeComparer(a: Tsp.Chromosome, b: Tsp.Chromosome): number {
        if (a.cost < b.cost)
            return -1;
        if (a.cost > b.cost)
            return 1;
        return 0;
    }

} 