

window.onload = () => {
    var el = document.getElementById('content');
    var points: Tsp.Point[] = [new Tsp.Point("A", 1, 1)
        , new Tsp.Point("A", 1, 2)
        , new Tsp.Point("A", 3, 4)
        , new Tsp.Point("A", 1, 66)
        , new Tsp.Point("A", 5, 19)
        , new Tsp.Point("A", 53, 41)];
    var cromosoma1 = new Tsp.Chromosome(points);
    for (var i = 0; i < cromosoma1.length; i++) {
        document.getElementById("content").innerText += cromosoma1.getPoint(i).x + " " + cromosoma1.getPoint(i).y + ";";
    }
    document.getElementById("content").innerText += "::::Costo " + cromosoma1.cost;



    var cromosoma2 = new Tsp.Chromosome(points);
    for (var i = 0; i < cromosoma2.length; i++) {
        document.getElementById("content").innerText += cromosoma2.getPoint(i).x + " " + cromosoma2.getPoint(i).y + ";";
    }
    document.getElementById("content").innerText += "::::Costo " + cromosoma2.cost;
};