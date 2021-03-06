﻿module Tsp {
    export class Point {
        private _name: string;
        private _x: number;
        private _y: number;

        constructor(name: string, x: number, y: number) {
            this._name = name;
            this._x = x;
            this._y = y;
        }

        get x(): number {
            return this._x;
        }
        set x(x: number) {
            this._x = x;
        }

        get y(): number {
            return this._y;
        }
        set y(y: number) {
            this._y = y;
        }


        get name(): string {
            return this._name;
        }

        public equals(other: Point): boolean {
            if (other != undefined)
                return this._name === other.name;
            return false;
        }

        private distance(x: number, y: number): number {
            var nX = this._x - x;
            var nY = this._y - y;

            return Math.sqrt(Math.pow(nX, 2) + Math.pow(nY, 2));
        }

        public toString(): string {
            return this.name + "(" + this.x + "," + this.y + ")";
        }

        public distanceToPoint(point: Point): number {
            return this.distance(point._x, point._y);
        }
    }
} 