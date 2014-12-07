var Tsp;
(function (Tsp) {
    var Simulator = (function () {
        function Simulator(points, chromosomesCount, maxGenerations) {
            this._ncrhoms = 10;
            this._i = 0;
            this._currentGeneration = 0;
            this._maxGenerations = maxGenerations;
            this._points = points;
            this._crossPoblation = Math.floor(chromosomesCount / 2);
            this._favoredPoblation = Math.floor(this._crossPoblation / 2);
            this._ncrhoms = chromosomesCount;
            this._chromosomes = new Array(this._ncrhoms);
        }
        Simulator.prototype.initialize = function (callback) {
            for (var i = 0; i < this._ncrhoms; i++) {
                this._chromosomes[i] = new Tsp.Chromosome(this._points, 0, 0);
            }
            Tsp.quickSort(this._chromosomes, 0, this._chromosomes.length - 1);
            if (callback) {
                callback(this._points);
            }
        };

        Simulator.prototype.start = function (callback) {
            this._callback = callback;
            var self = this;

            //while (this._currentGeneration++ <= this._maxGenerations) {
            //    var iOff: number = this._crossPoblation;
            //    for (var j = 0; j < this._favoredPoblation; j++) {
            //        var children = Chromosome.cyclicMate(this._chromosomes[j], this._chromosomes[j + 1]);
            //        if (iOff < this._chromosomes.length - 1) {
            //            this._chromosomes[iOff] = children[0];
            //            this._chromosomes[iOff+1] = children[1];
            //        }
            //        iOff += 2;
            //    }
            //    Tsp.quickSort(this._chromosomes, 0, this._chromosomes.length - 1);
            //}
            //if (callback) {
            //    callback(this._chromosomes[0]);
            //}
            setTimeout(function () {
                self.f();
            }, 1000);
            //while (this._currentGeneration <= this._maxGenerations) {
            //    this._currentGeneration++;
            //}
        };

        Simulator.prototype.f = function () {
            var self = this;
            setTimeout(function () {
                self.f();
            }, 1000);
            if (this._callback) {
                this._callback(this._chromosomes[(this._i++) % this._ncrhoms]);
            }
        };
        return Simulator;
    })();
    Tsp.Simulator = Simulator;
})(Tsp || (Tsp = {}));
//# sourceMappingURL=Simulator.js.map
