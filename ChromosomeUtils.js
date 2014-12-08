var Tsp;
(function (Tsp) {
    function nextInt(min, max) {
        return Math.floor((Math.random() * (max - min)) + min);
    }
    Tsp.nextInt = nextInt;
    function next() {
        return Math.random();
    }
    Tsp.next = next;

    function truncate(n, digits) {
        var multiplier = Math.pow(10, digits), adjustedNum = n * multiplier, truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

        return truncatedNum / multiplier;
    }
    Tsp.truncate = truncate;
    ;

    function chromosomeComparer(a, b) {
        if (a.cost < b.cost)
            return -1;
        if (a.cost > b.cost)
            return 1;
        return 0;
    }
    Tsp.chromosomeComparer = chromosomeComparer;
})(Tsp || (Tsp = {}));
//# sourceMappingURL=ChromosomeUtils.js.map
