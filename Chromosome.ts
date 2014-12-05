module Tsp {
    export class Chromosome {
        points: Array<Point>;
        private _length: number;
        private _cost: number;
        constructor(points: Array<Point>) {
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

        public getPoint(i: number): Point {
            return this.points[i];
        }

        private setPoint(i: number, point: Point) {
            this.points[i] = point;
        }
    }

}