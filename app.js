// I/O elements:
var generateButton;
var startButton;
var generationsInput;
var populationInput;
var pointsNumberInput;
var maxRepeatingCountInput;
var currentGenerationLabel;
var currentSolutionLabel;

// TSP related:
var points;
var generations;
var population;
var pointsQty;
var maxRepeatingCount;

// worker:
var worker;

window.onload = function () {
    worker = new Worker('worker.js');

    // UI wiring
    generateButton = document.getElementById('generateButton');
    startButton = document.getElementById('startButton');

    generationsInput = document.getElementById('generationsInput');
    populationInput = document.getElementById('populationInput');
    pointsNumberInput = document.getElementById('pointsNumberInput');
    maxRepeatingCountInput = document.getElementById('maxRepeatingCountInput');

    currentGenerationLabel = document.getElementById('currentGenerationLabel');
    currentSolutionLabel = document.getElementById('currentSolutionLabel');

    // Bind events:
    generateButton.onclick = generateButtonClick;
    startButton.onclick = startButtonClick;
    worker.onmessage = workerUpdate;
};

function startButtonClick(event) {
    var settings = {
        nodes: points,
        generations: generations,
        population: population,
        maxRepetitions: maxRepeatingCount
    };
    var str = JSON.stringify(settings);
    worker.postMessage(str);
}

function generateButtonClick(event) {
    population = parseInt(populationInput.value);
    generations = parseInt(generationsInput.value);
    pointsQty = parseInt(pointsNumberInput.value);
    maxRepeatingCount = parseInt(maxRepeatingCountInput.value);
    if (true && !isNaN(population) && !isNaN(generations) && !isNaN(pointsQty)) {
        points = new Array(pointsQty);
        for (var a = 0; a < pointsQty; a++) {
            var x = Tsp.nextInt(0, 8) + Tsp.next();
            var y = Tsp.nextInt(0, 4) + Tsp.next();
            points[a] = new Tsp.Point("N" + a, x, y);
        }
        View.createSigma('sigma-container', points);
    } else {
        console.log("error");
    }
}

function workerUpdate(evt) {
    var data = JSON.parse(evt.data);
    console.log(data.chromosome);
    View.replaceEdgesFromArray(data.chromosome.points);
    currentGenerationLabel.innerText = data.generation;
    currentSolutionLabel.innerText = Tsp.truncate(data.chromosome._cost, 5).toString();
}
//# sourceMappingURL=app.js.map
