var Tsp;
(function (Tsp) {
    var Simulator = (function () {
        function Simulator(points, chromosomesCount) {
            this._ncrhoms = 10;
            this._points = points;
            this._ncrhoms = chromosomesCount;
            this._chromosomes = new Array(this._ncrhoms);
        }
        Simulator.prototype.initialize = function (callback) {
            for (var i = 0; i < this._ncrhoms; i++) {
                this._chromosomes[i] = new Tsp.Chromosome(this._points, 0, 0);
            }
            if (callback) {
                callback(this._points);
            }
        };
        return Simulator;
    })();
    Tsp.Simulator = Simulator;
})(Tsp || (Tsp = {}));
//# sourceMappingURL=Siumlator.js.map
