import { Application, Point } from "pixi.js";

export function createGlobalContext(app: Application) {
    return new GlobalContext(app);
}

export class GlobalContext {
    app: Application;

    UNIT_LENGTH: number;
    WORLD_SIZE: Point;

    UPPER_BOUND_Y: number
    LOWER_BOUND_Y: number;
    LEFT_BOUND_X: number;
    RIGHT_BOUND_X: number;

    constructor(app: Application) {
        this.app = app;

        this.UNIT_LENGTH = 20;
        this.WORLD_SIZE = new Point(15, 15);

        this.UPPER_BOUND_Y = app.screen.height / 2 - this.WORLD_SIZE.y * this.UNIT_LENGTH / 2;
        this.LOWER_BOUND_Y = app.screen.height / 2 + this.WORLD_SIZE.y * this.UNIT_LENGTH / 2;
        this.LEFT_BOUND_X = app.screen.width / 2 - this.WORLD_SIZE.x * this.UNIT_LENGTH / 2;
        this.RIGHT_BOUND_X = app.screen.width / 2 + this.WORLD_SIZE.x * this.UNIT_LENGTH / 2;
    }
}