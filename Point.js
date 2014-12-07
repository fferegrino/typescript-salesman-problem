var Tsp;
(function (Tsp) {
    var Point = (function () {
        function Point(name, x, y) {
            this._name = name;
            this._x = x;
            this._y = y;
        }
        Object.defineProperty(Point.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (x) {
                this._x = x;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Point.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (y) {
                this._y = y;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Point.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });

        Point.prototype.equals = function (other) {
            if (other != undefined)
                return this._name === other.name;
            return false;
        };

        Point.prototype.distance = function (x, y) {
            var nX = this._x - x;
            var nY = this._y - y;

            return Math.sqrt(Math.pow(nX, 2) + Math.pow(nY, 2));
        };

        Point.prototype.toString = function () {
            return this.name + "(" + this.x + "," + this.y + ")";
        };

        Point.prototype.distanceToPoint = function (point) {
            return this.distance(point._x, point._y);
        };
        return Point;
    })();
    Tsp.Point = Point;
})(Tsp || (Tsp = {}));
//# sourceMappingURL=Point.js.map
