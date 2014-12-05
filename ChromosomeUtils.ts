module Tsp {
    export function nextInt(min: number, max: number): number {
        return Math.floor((Math.random() * max) + min);
    }

    export function quickSort(c: Array<Chromosome>, left: number, right: number) {
        var i: number = left;
        var j: number = right;
        var mid: number = Math.floor((i + j) / 2);
        var p: Chromosome = c[mid];
        var tmp: Chromosome;
        while (i <= j) {
            while (c[i].cost < p.cost) {
                i++;
            }
            while (c[j].cost > p.cost) {
                j--;
            }
            if (i <= j) {
                tmp = c[i];
                c[i] = c[j];
                c[j] = tmp;
                i++; j--;
            }
            if (left < j) {
                quickSort(c, left, j);
            }
            if (i < right) {
                quickSort(c, i, right);
            }
        }
    }
} 