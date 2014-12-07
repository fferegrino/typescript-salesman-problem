/// <reference path="sigmajs/sigmajs.d.ts" />
/// <reference path="Point.ts" />
var View;
(function (View) {
    var nodeColor = "#ff0";
    var edgeColor = "#f00";
    var sgma;
    var innerPoints;
    function createSigma(container, points) {
        sgma = new sigma(container);
        innerPoints = points;
        drawNodes();
        sgma.refresh();
    }
    View.createSigma = createSigma;

    function drawEdges(chromosome) {
        for (var i = 0; i < chromosome.length - 1; i++) {
            sgma.graph.addEdge({
                id: "n" + i,
                source: chromosome.getPoint(i).name,
                target: chromosome.getPoint(i + 1).name,
                color: edgeColor
            });
        }
    }
    View.drawEdges = drawEdges;

    function drawEdgesFromArray(array) {
        for (var i = 0; i < array.length - 1; i++) {
            sgma.graph.addEdge({
                id: "n" + i,
                source: array[i]._name,
                target: array[i + 1]._name,
                color: edgeColor
            });
        }
    }
    View.drawEdgesFromArray = drawEdgesFromArray;

    function replaceEdgesFromArray(array) {
        sgma.graph.clear();
        drawNodes();
        drawEdgesFromArray(array);
        sgma.refresh();
    }
    View.replaceEdgesFromArray = replaceEdgesFromArray;

    function replaceEdges(chromosome) {
        sgma.graph.clear();
        drawNodes();
        drawEdges(chromosome);
        sgma.refresh();
    }
    View.replaceEdges = replaceEdges;

    function drawNodes() {
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
    View.drawNodes = drawNodes;
})(View || (View = {}));
//# sourceMappingURL=SigmaAdapter.js.map
