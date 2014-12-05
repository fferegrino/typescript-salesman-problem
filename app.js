window.onload = function () {
    //var el = document.getElementById('content');
    var mutacion = 0.4;
    var longitudCorte = 4;

    var points = [
        new Tsp.Point("A", 1.3, 1),
        new Tsp.Point("B", 1.6, 2.5),
        new Tsp.Point("C", 2, 3.5),
        new Tsp.Point("D", 2, 1.3),
        new Tsp.Point("E", 2.3, 2.7),
        new Tsp.Point("F", 2.6, 3),
        new Tsp.Point("G", 3, 1.6),
        new Tsp.Point("H", 3.3, 2),
        new Tsp.Point("I", 3.6, 3)];

    var simulator = new Tsp.Simulator(points, 10, 50);
    simulator.initialize(created);
    simulator.start(generatedSolution);
};

function created(points) {
    View.createSigma("container", points);
}

function generatedSolution(chromosome) {
    View.replaceEdges(chromosome);
    document.getElementById("costo").innerText = chromosome.cost.toString();
}
//# sourceMappingURL=app.js.map
