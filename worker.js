
importScripts('Chromosome.js');
importScripts('ChromosomeUtils.js');
importScripts('Point.js');
importScripts('Simulator.js');
var i = 0;
var __points;
var __simulator;
function startWork(pointsArray) {
    __points = new Array(pointsArray.length);
    for (var i = 0; i < pointsArray.length; i++) {
        __points[i] = new Tsp.Point(pointsArray[i]._name, pointsArray[i]._x, pointsArray[i]._y);
    }
    __simulator = new Tsp.Simulator(__points, 10, 0);
    __simulator.initialize();
    __simulator.start(function (chromosome) {
        postMessage(JSON.stringify(chromosome));
    });
}

self.onmessage = function (data) {
    startWork(JSON.parse(data.data));
}