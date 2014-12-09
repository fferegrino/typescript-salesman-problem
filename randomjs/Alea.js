var Tsp;
(function (Tsp) {
    var Alea = (function () {
        function Alea(args) {
            this.n = 0xefc8249d;
            this.c = 1;
            if (args && args.length == 0) {
                args = [+new Date];
            }
            this.s0 = this.mash(' ');
            this.s1 = this.mash(' ');
            this.s2 = this.mash(' ');
            for (var i = 0; i < args.length; i++) {
                this.s0 -= this.mash(args[i]);
                if (this.s0 < 0) {
                    this.s0 += 1;
                }
                this.s1 -= this.mash(args[i]);
                if (this.s1 < 0) {
                    this.s1 += 1;
                }
                this.s2 -= this.mash(args[i]);
                if (this.s2 < 0) {
                    this.s2 += 1;
                }
            }
        }
        Alea.prototype.random = function () {
            var t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10;
            this.s0 = this.s1;
            this.s1 = this.s2;
            return this.s2 = t - (this.c = t | 0);
        };

        Alea.prototype.uInt32 = function () {
            return this.random() * 0x100000000;
        };

        Alea.prototype.mash = function (data) {
            data = data.toString();
            for (var i = 0; i < data.length; i++) {
                this.n += data.charCodeAt(i);
                var h = 0.02519603282416938 * this.n;
                this.n = h >>> 0;
                h -= this.n;
                h *= this.n;
                this.n = h >>> 0;
                h -= this.n;
                this.n += h * 0x100000000; // 2^32
            }
            return (this.n >>> 0) * 2.3283064365386963e-10;
        };
        return Alea;
    })();
    Tsp.Alea = Alea;
})(Tsp || (Tsp = {}));
//# sourceMappingURL=Alea.js.map
