
importScripts('Chromosome.js');
importScripts('ChromosomeUtils.js');
importScripts('Point.js');
importScripts('Simulator.js');

var i = 0;
var __points;
var __simulator;
var __generations;
var __population;
var __maxRepetitions;

function startWork(pointsArray) {
    __points = new Array(pointsArray.length);

    for (var i = 0; i < pointsArray.length; i++) {
        __points[i] = new Tsp.Point(pointsArray[i]._name, pointsArray[i]._x, pointsArray[i]._y);
    }

    __simulator = new Tsp.Simulator(__points, __population, __generations, __maxRepetitions);
    __simulator.initialize();
    __simulator.start(function (chr, gen) {
        var data = { chromosome: chr, generation: gen };
        postMessage(JSON.stringify(data));
    });
}

self.onmessage = function (data) {
    var obj = JSON.parse(data.data);
    __generations = obj.generations;
    __population = obj.population;
    __maxRepetitions = obj.maxRepetitions;
    startWork(obj.nodes);
}