import { Application, Point } from "pixi.js";
import { createPlayerInput, PlayerInput } from "./PlayerInput";

export function createGlobalContext(app: Application) {
    return new GlobalContext(app);
}

export class GlobalContext {
    app: Application;
    playerInput: PlayerInput;

    UNIT_LENGTH: number;
    WORLD_SIZE: Point;
    WORLD_POSITION: any;
    WORLD_CENTER_Y_OFFSET: number;

    UPPER_BOUND_Y: number
    LOWER_BOUND_Y: number;
    LEFT_BOUND_X: number;
    RIGHT_BOUND_X: number;

    constructor(app: Application) {
        this.app = app;
        this.playerInput = createPlayerInput();

        this.UNIT_LENGTH = 20;

        this.WORLD_SIZE = new Point(15, 15);
        this.WORLD_CENTER_Y_OFFSET = -145;
        this.WORLD_POSITION = new Point(app.screen.width / 2, app.screen.height / 2 + this.WORLD_CENTER_Y_OFFSET);

        this.UPPER_BOUND_Y = - this.WORLD_SIZE.y * this.UNIT_LENGTH / 2;
        this.LOWER_BOUND_Y = + this.WORLD_SIZE.y * this.UNIT_LENGTH / 2;
        this.LEFT_BOUND_X = - this.WORLD_SIZE.x * this.UNIT_LENGTH / 2;
        this.RIGHT_BOUND_X = + this.WORLD_SIZE.x * this.UNIT_LENGTH / 2;
    }
}