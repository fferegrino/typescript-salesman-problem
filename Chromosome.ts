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

        public static cyclicMate(parent1: Chromosome, parent2: Chromosome): Chromosome[] {

            var results = [
                new Chromosome(parent1.points, parent1._cutPoint, parent1._mutationProb)
                , new Chromosome(parent1.points, parent1._cutPoint, parent2._mutationProb)
            ];

            var chromosomeLength = parent1.length;
            var startPointS1 = nextInt(0, chromosomeLength - 1);
            var startPointS2 = startPointS1;

            var ax1 = parent1.getPoint(startPointS1);
            var ax2: Point;

            while (!ax1.equals(ax2)) {
                ax2 = parent1.getPoint(startPointS1);
                results[0].setPoint(startPointS1, ax2);
                var i: Point = parent2.getPoint(startPointS1);
                startPointS1 = parent1.getPosition(i);
                ax2 = i;
            }

            ax1 = parent2.getPoint(startPointS2);
            ax2 = null;


            while (!ax1.equals(ax2)) {
                ax2 = parent2.getPoint(startPointS2);
                results[1].setPoint(startPointS2, ax2);
                var i: Point = parent1.getPoint(startPointS2);
                startPointS2 = parent2.getPosition(i);
                ax2 = i;
            }


            //for (var ii = 0; ii < parent1.length; ii++) {
            //    if()
            //}
            return results;
        }
    }

}