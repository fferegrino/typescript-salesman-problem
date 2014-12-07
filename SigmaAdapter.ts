/// <reference path="sigmajs/sigmajs.d.ts" />
/// <reference path="Point.ts" />

module View {
    var nodeColor: string = "#ff0";
    var edgeColor: string = "#f00";
    var sgma: SigmaJs.Sigma;
    var innerPoints: Tsp.Point[];
    export function createSigma(container: string, points: Tsp.Point[]) {
        sgma = new sigma(container);
        innerPoints = points;
        drawNodes();
        sgma.refresh();
    }

    export function drawEdges(chromosome: Tsp.Chromosome) {
        for (var i = 0; i < chromosome.length - 1; i++) {

            sgma.graph.addEdge({
                id: "n" + i,
                source: chromosome.getPoint(i).name,
                target: chromosome.getPoint(i + 1).name,
                color: edgeColor
            });
            
        }
    }

    export function drawEdgesFromArray(array) {
        for (var i = 0; i < array.length - 1; i++) {

            sgma.graph.addEdge({
                id: "n" + i,
                source: array[i]._name,
                target: array[i+1]._name,
                color: edgeColor
            });

        }
    }

    export function replaceEdgesFromArray(array) {
        sgma.graph.clear();
        drawNodes();
        drawEdgesFromArray(array);
        sgma.refresh();
    }

    export function replaceEdges(chromosome: Tsp.Chromosome) {
        sgma.graph.clear();
        drawNodes();
        drawEdges(chromosome);
        sgma.refresh();
    }

    export function drawNodes() {
        for (var i = 0; i < innerPoints.length; i++) {
            sgma.graph.addNode({
                id: innerPoints[i].name,
                x: innerPoints[i].x,
                y: innerPoints[i].y,
                size: 1,
                color: nodeColor
            });
        }
    }
}