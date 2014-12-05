var Tsp;
(function (Tsp) {
    function nextInt(min, max) {
        return Math.floor((Math.random() * max) + min);
    }
    Tsp.nextInt = nextInt;

    function quickSort(c, left, right) {
        var i = left;
        var j = right;
        var mid = Math.floor((i + j) / 2);
        var p = c[mid];
        var tmp;
        while (i <= j) {
            while (c[i].cost < p.cost) {
                i++;
            }
            while (c[j].cost > p.cost) {
                j--;
            }
            if (i <= j) {
                tmp = c[i];
                c[i] = c[j];
                c[j] = tmp;
                i++;
                j--;
            }
            if (left < j) {
                quickSort(c, left, j);
            }
            if (i < right) {
                quickSort(c, i, right);
            }
        }
    }
    Tsp.quickSort = quickSort;
})(Tsp || (Tsp = {}));
//# sourceMappingURL=ChromosomeUtils.js.map
