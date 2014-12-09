module Tsp {
    export class Simulator {
        private _chromosomes: Tsp.Chromosome[];
        private _points: Tsp.Point[];
        private _numeroCromosomas: number = 10;
        private _currentGeneration: number;
        private _maxGenerations: number;
        private _poblacionNoFavorecida: number;
        private _poblacionFavorecida: number;
        private _lastValue: number;
        private _repetition: number;
        private _maxRepetitions: number;


        private _loadedData;

        constructor(points: Tsp.Point[], numeroCromosomas: number, maxGenerations: number, maxRepetitions: number) {
            this._lastValue = 0;
            this._repetition = 0;
            this._currentGeneration = 0;
            this._maxGenerations = maxGenerations;
            this._points = points;
            this._numeroCromosomas = numeroCromosomas;
            this._maxRepetitions = maxRepetitions;
        }

        public initialize(callback: any): void {
            this._chromosomes = new Array(this._numeroCromosomas);
            this._poblacionNoFavorecida = Math.floor(this._numeroCromosomas / 2);
            this._poblacionFavorecida = Math.floor(this._poblacionNoFavorecida / 2);
            for (var i = 0; i < this._numeroCromosomas; i++) {
                this._chromosomes[i] = new Tsp.Chromosome(this._points, 0, 0.8);
            }
            this._chromosomes.sort(Tsp.chromosomeComparer);
            if (callback) {
                callback(this._points);
            }
            console.log("Poblacion total " + this._numeroCromosomas + "; Poblacion favorecida: " + this._poblacionFavorecida + "; Poblacion no favorecida " + this._poblacionNoFavorecida);
        }


        public start(callback: any) {
            this._callback = callback;
            var self = this;
            while (this._currentGeneration <= this._maxGenerations && this._repetition < this._maxRepetitions) {
                this._currentGeneration++;
                var offset: number = this._poblacionNoFavorecida;
                for (var j = 0; j < this._poblacionFavorecida; j++) {
                    if (offset < this._chromosomes.length - 1) {
                        Chromosome.cyclicMate(
                            this._chromosomes[j],
                            this._chromosomes[j + 1],
                            this._chromosomes[offset],
                            this._chromosomes[offset + 1]
                            );
                        this._chromosomes[offset].mutar();
                        this._chromosomes[offset + 1].mutar();
                        this._chromosomes[offset].mutar();
                        this._chromosomes[offset + 1].mutar();
                        this._chromosomes[offset].mutar();
                        this._chromosomes[offset + 1].mutar();
                        offset += 2;
                    }
                }
                this._chromosomes.sort(Tsp.chromosomeComparer);
                if (this._lastValue == this._chromosomes[0].cost) {
                    for (var flat = 0; flat < this._poblacionFavorecida; flat++) {
                        this._chromosomes[flat].mutar();
                    }
                    this._repetition++;
                } else {
                    this._lastValue = this._chromosomes[0].cost;
                    this._repetition = 0;
                }
                if (this._callback) {
                    this._callback(this._chromosomes[0], this._currentGeneration);
                }
            }
            console.log("Done");
        }

        private _i: number = 0;
        private _callback;
        f() {
            var self = this;
            setTimeout(() => { self.f(); }, 1000);
            if (this._callback) {
                this._callback(this._chromosomes[(this._i++) % this._numeroCromosomas]);
            }
        }

    }
}