var cromosomas;

window.onload = () => {
    var container = document.getElementById('container');
    var mutacion: number = 0.4;
    var longitudCorte: number = 4;

    var points = [
        new Tsp.Point("A", 1, 1)
        , new Tsp.Point("B", 6, 4)
        , new Tsp.Point("C", 1, 4)
        , new Tsp.Point("D", 6, 1.2)
        , new Tsp.Point("E", 2, 1.5)
        , new Tsp.Point("F", 3, 1.2)
        , new Tsp.Point("G", 4, 1.5)
        , new Tsp.Point("H", 5, 1.2)
        , new Tsp.Point("I", 1.5, 2)
        , new Tsp.Point("J", 2.9, 3)
        , new Tsp.Point("K", 3.1, 3.2)
        , new Tsp.Point("L", 3.8, 3.4)];

    cromosomas = new Array(4);
    cromosomas[0] = new Tsp.Chromosome(points, 0, 0.5);
    cromosomas[1] = new Tsp.Chromosome(points, 0, 0.5);
    cromosomas[2] = new Tsp.Chromosome(points, 0, 0.5);
    cromosomas[3] = new Tsp.Chromosome(points, 0, 0.5);;


    //document.getElementById('btn').onclick = () => { cruza(); };
    //Tsp.quickSort(cromosomas, 0, cromosomas.length - 1);
    //dibuja();
    View.createSigma('container', points);
    var str = JSON.stringify(points);
    var worker = new Worker('worker.js');
    worker.onmessage = (evt) => {
        var chr = JSON.parse(evt.data);
        View.replaceEdgesFromArray(chr.points);
        console.log(chr._cost);
    };
    worker.postMessage(str);

};

function cruza() {
    Tsp.Chromosome.cyclicMate(cromosomas[0], cromosomas[1], cromosomas[2], cromosomas[3]);
    Tsp.quickSort(cromosomas, 0, cromosomas.length - 1);
    dibuja();
}

function dibuja() {

    document.getElementById('p1').innerText = cromosomas[0].toString();
    document.getElementById('p2').innerText = cromosomas[1].toString();
    document.getElementById('c1').innerText = cromosomas[2].toString();
    document.getElementById('c2').innerText = cromosomas[3].toString();
}