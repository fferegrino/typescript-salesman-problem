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

        Chromosome.prototype.toString = function () {
            var a = "";
            for (var i = 0; i < this._length; i++) {
                a += this.points[i] != null ? this.points[i].name : "-";
            }
            a += ": " + Tsp.truncate(this.cost, 3);
            return a;
        };

        Chromosome.prototype.resetCost = function () {
            this._cost = 0;
        };

        Chromosome.prototype.mutar = function () {
            if (this._mutationProb < Tsp.next()) {
                var i = Tsp.nextInt(0, this._length - 1);
                var j = Tsp.nextInt(0, this._length - 1);
                var point = this.points[i];
                this.points[i] = this.points[j];
                this.points[j] = point;
                return true;
            }
            return false;
        };

        Chromosome.cyclicMate = function (parent1, parent2, children1, children2) {
            for (var j = 0; j < parent1.length; j++) {
                children1.setPoint(j, null);
                children2.setPoint(j, null);
            }

            var chromosomeLength = parent1.length;
            var startPointS1 = Tsp.nextInt(0, chromosomeLength - 1);
            var startPointS2 = Tsp.nextInt(0, chromosomeLength - 1);

            var ax1 = parent1.getPoint(startPointS1);
            var ax2;

            while (!ax1.equals(ax2)) {
                ax2 = parent1.getPoint(startPointS1);
                children1.setPoint(startPointS1, ax2);
                var i = parent2.getPoint(startPointS1);
                startPointS1 = parent1.getPosition(i);
                ax2 = i;
            }
            ax1 = parent2.getPoint(startPointS2);
            ax2 = null;

            while (!ax1.equals(ax2)) {
                ax2 = parent2.getPoint(startPointS2);
                children2.setPoint(startPointS2, ax2);
                var i = parent1.getPoint(startPointS2);
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

            children1.resetCost();
            children2.resetCost();
        };
        return Chromosome;
    })();
    Tsp.Chromosome = Chromosome;
})(Tsp || (Tsp = {}));
//# sourceMappingURL=Chromosome.js.map
