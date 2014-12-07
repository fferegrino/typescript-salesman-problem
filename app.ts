

window.onload = () => {
    var container = document.getElementById('container');
    var mutacion: number = 0.4;
    var longitudCorte: number = 4;

    var points = [
        new Tsp.Point("A", 1.3, 1)
        , new Tsp.Point("B", 1.6, 2.5)
        , new Tsp.Point("C", 2, 3.5)
        , new Tsp.Point("D", 2, 1.3)
        , new Tsp.Point("E", 2.3, 2.7)
        , new Tsp.Point("F", 2.6, 3)
        , new Tsp.Point("G", 3, 1.6)
        , new Tsp.Point("H", 3.3, 2)
        , new Tsp.Point("I", 3.6, 3)];
    //var simulator = new Tsp.Simulator(points, 10, 2);
    //simulator.initialize(created);
    //simulator.start(generatedSolution);
    View.createSigma('container', points);
    var str = JSON.stringify(points);

    var worker = new Worker('worker.js');
    worker.onmessage = (evt) => {
        View.replaceEdgesFromArray( JSON.parse(evt.data).points);
    };

    worker.postMessage(str);

};


function created(points) {
    View.createSigma("container", points);
}

function generatedSolution(chromosome: Tsp.Chromosome) {
    View.replaceEdges(chromosome);
    document.getElementById("costo").innerText = chromosome.cost.toString();
}