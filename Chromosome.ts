module Tsp {
    export class Chromosome {
        points: Array<Point>;
        private _length: number;
        private _cost: number;
        private _cutPoint: number;
        private _mutationProb: number;


        constructor(points: Array<Point>, cutPoint: number, mutationProbability: number) {
            this._length = points.length;
            this._cost = 0;
            this.points = new Array(this.length);

            var usadas: Array<Boolean>;
            usadas = new Array(points.length);
            for (var i = 0; i < this.length; i++) usadas[i] = false;

            for (var i = 0; i < this.length; i++) {
                var candidata: number;
                do {
                    candidata = Tsp.nextInt(0, this.length);
                    var x = candidata;
                } while (usadas[candidata]);
                this.setPoint(i, points[candidata]);
                usadas[candidata] = true;
            }
        }

        get length(): number {
            return this._length;
        }

        get cost(): number {
            if (this._cost === 0) {
                for (var i = 0; i < this.length - 1; i++) {
                    this._cost += this.points[i].distanceToPoint(this.points[i + 1]);
                }
            }
            return this._cost;
        }

        public getPosition(point: Point): number {
            var i = 0;
            for (; i < this._length; i++) {
                if (this.points[i].equals(point)) {
                    return i;
                }
            }
            return -1;
        }

        public getPoint(i: number): Point {
            return this.points[i];
        }

        private setPoint(i: number, point: Point) {
            this.points[i] = point;
        }

        public toString(): string {
            var a = "";
            for (var i = 0; i < this._length; i++) {
                a += this.points[i] != null ? this.points[i].name : "-";
            }
            a += ": " + truncate(this.cost, 3);
            return a;
        }

        public resetCost(): void {
            this._cost = 0;
        }

        public mutar(): boolean {
            if (this._mutationProb > Tsp.next()) {
            var i = Tsp.nextInt(0, this._length - 1);
            var j = Tsp.nextInt(0, this._length - 1);
            var point = this.points[i];
            this.points[i] = this.points[j];
            this.points[j] = point;
            return true;
            }
            return false;
        }

        public static cyclicMate(parent1: Chromosome, parent2: Chromosome, children1: Chromosome, children2: Chromosome): void {


            children1.resetCost();
            children2.resetCost();
            for (var j = 0; j < parent1.length; j++) {
                children1.setPoint(j, null);
                children2.setPoint(j, null);
            }

            var chromosomeLength = parent1.length;
            var startPointS1 = nextInt(0, chromosomeLength - 1);
            var startPointS2 = nextInt(0, chromosomeLength - 1);

            var ax1 = parent1.getPoint(startPointS1);
            var ax2: Point;

            while (!ax1.equals(ax2)) {
                ax2 = parent1.getPoint(startPointS1);
                children1.setPoint(startPointS1, ax2);
                var i: Point = parent2.getPoint(startPointS1);
                startPointS1 = parent1.getPosition(i);
                ax2 = i;
            }

            ax1 = parent2.getPoint(startPointS2);
            ax2 = null;


            while (!ax1.equals(ax2)) {
                ax2 = parent2.getPoint(startPointS2);
                children2.setPoint(startPointS2, ax2);
                var i: Point = parent1.getPoint(startPointS2);
                startPointS2 = parent2.getPosition(i);
                ax2 = i;
            }

            for (var iii = 0; iii < parent1.length; iii++) {
                if (children1.getPoint(iii) == null) {
                    children1.setPoint(iii, parent2.getPoint(iii));
                }
                if (children2.getPoint(iii) == null) {
                    children2.setPoint(iii, parent1.getPoint(iii));
                }

            }
        }
    }

}