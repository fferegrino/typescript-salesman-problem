// I/O elements:
var generateButton: HTMLButtonElement;
var startButton: HTMLButtonElement;
var generationsInput: HTMLInputElement;
var populationInput: HTMLInputElement;
var pointsNumberInput: HTMLInputElement;
var maxRepeatingCountInput: HTMLInputElement;
var currentGenerationLabel: HTMLElement;
var currentSolutionLabel: HTMLElement;

// TSP related:
var points: Tsp.Point[];
var generations: number;
var population: number;
var pointsQty: number;
var maxRepeatingCount: number;

// worker:
var worker : Worker;

window.onload = () => {

    worker = new Worker('worker.js');

    // UI wiring
    generateButton = <HTMLButtonElement>document.getElementById('generateButton');
    startButton = <HTMLButtonElement>document.getElementById('startButton');

    generationsInput = <HTMLInputElement>document.getElementById('generationsInput');
    populationInput = <HTMLInputElement>document.getElementById('populationInput');
    pointsNumberInput = <HTMLInputElement>document.getElementById('pointsNumberInput');
    maxRepeatingCountInput = <HTMLInputElement>document.getElementById('maxRepeatingCountInput');

    currentGenerationLabel = document.getElementById('currentGenerationLabel');
    currentSolutionLabel = document.getElementById('currentSolutionLabel');

    // Bind events:
    generateButton.onclick = generateButtonClick;
    startButton.onclick = startButtonClick;
    worker.onmessage = workerUpdate;


};

function startButtonClick(event: any): void {
    var settings = {
        nodes: points,
        generations: generations,
        population: population,
        maxRepetitions: maxRepeatingCount
    };
    var str = JSON.stringify(settings);
    worker.postMessage(str);
}

function generateButtonClick(event: any): void {
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

function workerUpdate(evt): void {
    var data = JSON.parse(evt.data);
    console.log(data.chromosome);
    View.replaceEdgesFromArray(data.chromosome.points);
    currentGenerationLabel.innerText = data.generation;
    currentSolutionLabel.innerText = Tsp.truncate(data.chromosome._cost, 5).toString();
}