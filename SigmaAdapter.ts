/// <reference path="sigmajs/sigmajs.d.ts" />
/// <reference path="Point.ts" />

module View {
    var nodeColor: string = "#f00";
    var edgeColor: string = "#f00";
    var sgma: SigmaJs.Sigma;
    var innerPoints: Tsp.Point[];
    export function createSigma(container: string, points: Tsp.Point[]) {

        var settings: any = new Object();
        settings["mouseWheelEnabled"] = false;
        sgma = new sigma(container);
        sgma.bind('clickStage', (event) => {

            //sgma.graph.addNode({
            //    id: 'n' + event.data.captor.clientX + event.data.captor.clientY,
            //    label: 'n' + event.data.captor.clientX + event.data.captor.clientY,
            //    x: event.data.captor.x,
            //    y: event.data.captor.y,
            //    size: 1,
            //    color: nodeColor
            //});
            //sgma.refresh();
            //console.log(event);
        });
        //var settings = '{ mouseEnabled: false }';
        sgma.settings(settings);
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
                target: array[i + 1]._name,
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
                label: innerPoints[i].name,
                x: innerPoints[i].x,
                y: innerPoints[i].y,
                size: 1,
                color: nodeColor
            });
        }
    }
}