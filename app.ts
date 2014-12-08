//var cromosomas: Array<Tsp.Chromosome>;

window.onload = () => {
    var container = document.getElementById('container');
    var startbtn = document.getElementById('startbtn');

    var generacionesInput = <HTMLInputElement>document.getElementById('generacionesInput');
    var generacionesValue = document.getElementById('generacionesValue');
    
    var poblacionInput = <HTMLInputElement>document.getElementById('poblacionInput');
    var fitValue = document.getElementById('fitValue');

    var mutacion: number = 0.4;
    var longitudCorte: number = 4;

    var points = [];
    for (var a = 0; a < 60; a++) {
        var x = Tsp.nextInt(0, 8) + Tsp.next();
        var y = Tsp.nextInt(0, 4) + Tsp.next();
        points.push(new Tsp.Point("N" + a, x, y));
    }
    
    //    new Tsp.Point("A", 1, 1)
    //    , new Tsp.Point("B", 6, 4)
    //    , new Tsp.Point("C", 1, 4)
    //    , new Tsp.Point("D", 6, 1.2)
    //    , new Tsp.Point("E", 2, 1.5)
    //    , new Tsp.Point("F", 3, 1.2)
    //    , new Tsp.Point("G", 4, 1.5)
    //    , new Tsp.Point("H", 5, 1.25)
    //    , new Tsp.Point("I", 4.8, 1.2)
    //    , new Tsp.Point("J", 1.5, 2)
    //    , new Tsp.Point("K", 2.9, 3)
    //    , new Tsp.Point("L", 3.1, 3.2)
    //    , new Tsp.Point("M", 3.8, 3.4)
    //    , new Tsp.Point("N", 2.8, 3.7)
    //];

    //cromosomas = new Array(4);
    //cromosomas[0] = new Tsp.Chromosome(points, 0, 0.5);
    //cromosomas[1] = new Tsp.Chromosome(points, 0, 0.5);
    //cromosomas[2] = new Tsp.Chromosome(points, 0, 0.5);
    //cromosomas[3] = new Tsp.Chromosome(points, 0, 0.5);;


    //document.getElementById('btn').onclick = () => { cruza(); };
    //cromosomas.sort(Tsp.chromosomeComparer);
    //dibuja();


    View.createSigma('sigma-container', points);

    var worker = new Worker('worker.js');
    worker.onmessage = (evt) => {
        var data = JSON.parse(evt.data);
        console.log(data.chromosome);
        View.replaceEdgesFromArray(data.chromosome.points);
        generacionesValue.innerText = data.generation;
        fitValue.innerText = Tsp.truncate(data.chromosome._cost, 4).toString();
        //console.log(chr._cost);
    };


    startbtn.onclick = (evt) => {
        var settings = {
            nodes: points,
            generations: generacionesInput.value,
            population: poblacionInput.value
        };
        var str = JSON.stringify(settings);
        worker.postMessage(str);
    };

};