module Tsp {
    export class Alea {
        s0: number;
        s1: number;
        s2: number;
        c: number;

        constructor(args: any) {
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

        public random() {
            var t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32
            this.s0 = this.s1;
            this.s1 = this.s2;
            return this.s2 = t - (this.c = t | 0);
        }

        public uInt32() {
            return this.random() * 0x100000000;
        }

        n: number = 0xefc8249d;

        private mash(data) {
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
            return (this.n >>> 0) * 2.3283064365386963e-10; // 2^-32
        }
    }
}