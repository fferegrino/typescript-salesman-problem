var Tsp;
(function (Tsp) {
    var Chromosome = (function () {
        function Chromosome(points) {
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

        Chromosome.prototype.getPoint = function (i) {
            return this.points[i];
        };

        Chromosome.prototype.setPoint = function (i, point) {
            this.points[i] = point;
        };
        return Chromosome;
    })();
    Tsp.Chromosome = Chromosome;
})(Tsp || (Tsp = {}));
//# sourceMappingURL=Chromosome.js.map
