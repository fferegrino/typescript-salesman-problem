var Tsp;
(function (Tsp) {
    var Chromosome = (function () {
        function Chromosome(points, cutPoint, mutationProbability) {
            this._length = points.length;
            this._cost = 0;
            this.points = new Array(this.length);

            var usadas;
            usadas = new Array(points.length);
            for (var i = 0; i < this.length; i++)
                usadas[i] = false;

            for (var i = 0; i < this.length; i++) {
                var candidata;
                do {
                    candidata = Tsp.nextInt(0, this.length);
                    var x = candidata;
                } while(usadas[candidata]);
                this.setPoint(i, points[candidata]);
                usadas[candidata] = true;
            }
        }
        Object.defineProperty(Chromosome.prototype, "length", {
            get: function () {
                return this._length;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Chromosome.prototype, "cost", {
            get: function () {
                if (this._cost === 0) {
                    for (var i = 0; i < this.length - 1; i++) {
                        this._cost += this.points[i].distanceToPoint(this.points[i + 1]);
                    }
                }
                return this._cost;
            },
            enumerable: true,
            configurable: true
        });

        Chromosome.prototype.getPosition = function (point) {
            var i = 0;
            for (; i < this._length; i++) {
                if (this.points[i].equals(point)) {
                    return i;
                }
            }
            return -1;
        };

        Chromosome.prototype.getPoint = function (i) {
            return this.points[i];
        };

        Chromosome.prototype.setPoint = function (i, point) {
            this.points[i] = point;
        };

        Chromosome.cyclicMate = function (parent1, parent2) {
            var results = [
                new Chromosome(parent1.points, parent1._cutPoint, parent1._mutationProb),
                new Chromosome(parent1.points, parent1._cutPoint, parent2._mutationProb)
            ];

            var chromosomeLength = parent1.length;
            var startPointS1 = Tsp.nextInt(0, chromosomeLength - 1);
            var startPointS2 = startPointS1;

            var ax1 = parent1.getPoint(startPointS1);
            var ax2;

            while (!ax1.equals(ax2)) {
                ax2 = parent1.getPoint(startPointS1);
                results[0].setPoint(startPointS1, ax2);
                var i = parent2.getPoint(startPointS1);
                startPointS1 = parent1.getPosition(i);
                ax2 = i;
            }

            ax1 = parent2.getPoint(startPointS2);
            ax2 = null;

            while (!ax1.equals(ax2)) {
                ax2 = parent2.getPoint(startPointS2);
                results[1].setPoint(startPointS2, ax2);
                var i = parent1.getPoint(startPointS2);
                startPointS2 = parent2.getPosition(i);
                ax2 = i;
            }

            //for (var ii = 0; ii < parent1.length; ii++) {
            //    if()
            //}
            return results;
        };
        return Chromosome;
    })();
    Tsp.Chromosome = Chromosome;
})(Tsp || (Tsp = {}));
//# sourceMappingURL=Chromosome.js.map
