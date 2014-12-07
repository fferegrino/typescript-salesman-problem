module Tsp {
    export class Simulator {
        private _chromosomes: Tsp.Chromosome[];
        private _points: Tsp.Point[];
        private _ncrhoms: number = 10;
        private _currentGeneration: number;
        private _maxGenerations: number;
        private _crossPoblation: number;
        private _favoredPoblation: number;

        private _loadedData;

        constructor(points: Tsp.Point[], chromosomesCount: number, maxGenerations: number) {
            this._currentGeneration = 0;
            this._maxGenerations = maxGenerations;
            this._points = points;
            this._crossPoblation = Math.floor(chromosomesCount / 2);
            this._favoredPoblation = Math.floor(this._crossPoblation / 2);
            this._ncrhoms = chromosomesCount;
            this._chromosomes = new Array(this._ncrhoms);

        }

        public initialize(callback: any): void {
            for (var i = 0; i < this._ncrhoms; i++) {
                this._chromosomes[i] = new Tsp.Chromosome(this._points, 0, 0);
            }
            Tsp.quickSort(this._chromosomes, 0, this._chromosomes.length - 1);
            if (callback) {
                callback(this._points);
            }
        }


        public start(callback: any) {
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
            setTimeout(() => { self.f(); }, 1000);
            //while (this._currentGeneration <= this._maxGenerations) {
            //    this._currentGeneration++;
            //}
        }

        private _i: number = 0;
        private _callback;
        f() {
            var self = this;
            setTimeout(() => { self.f(); }, 1000);
            if (this._callback) {
                this._callback(this._chromosomes[(this._i++) % this._ncrhoms]);
            }
        }

    }
}