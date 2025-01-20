import { Container, Graphics } from "pixi.js";
import { GlobalContext } from "./GlobalContext";
import { getRandomInt } from "./utils";

export function createFood(ctx: GlobalContext) {
    return new Food(ctx);
}

export class Food {
    container: Container;

    constructor(ctx: GlobalContext) {

        const COLOR = "#ffff00";
        const UNIT_LENGTH = ctx.UNIT_LENGTH;
        const PADDING = UNIT_LENGTH * 0.4;

        let rect = new Graphics()
            .rect(0, 0, UNIT_LENGTH - PADDING, UNIT_LENGTH - PADDING)
            .fill(COLOR)

        const LEFT_BOUND_X = ctx.LEFT_BOUND_X;
        const LOWER_BOUND_Y = ctx.LOWER_BOUND_Y;

        // TODO : random position
        rect.position.set(LEFT_BOUND_X + UNIT_LENGTH / 2, LOWER_BOUND_Y - UNIT_LENGTH / 2);
        rect.updateTransform({ pivotX: rect.width / 2, pivotY: rect.height / 2 })

        this.container = rect;
    }

    public update(ctx: GlobalContext) {
        const app = ctx.app;
        const snakeHead = app.stage.getChildByLabel("Snake")?.getChildByLabel("Snake Head")!; // TODO : Refactor

        // Assumes snake is updated first
        // TODO : perhaps should pass snake here... since update of food depends on update of snake...?
        const wasEatenThisFrame = this.container.position.equals(snakeHead.position);
        if (wasEatenThisFrame) {

            const WORLD_SIZE = ctx.WORLD_SIZE;
            const randomX = getRandomInt(0, WORLD_SIZE.x);
            const randomY = getRandomInt(0, WORLD_SIZE.y);

            const UNIT_LENGTH = ctx.UNIT_LENGTH;

            const LEFT_BOUND_X = ctx.LEFT_BOUND_X;
            const xPos = LEFT_BOUND_X + randomX * UNIT_LENGTH + UNIT_LENGTH / 2;

            const UPPER_BOUND_Y = ctx.UPPER_BOUND_Y;
            const yPos = UPPER_BOUND_Y + randomY * UNIT_LENGTH + UNIT_LENGTH / 2;

            this.container.position.set(xPos, yPos); // TODO : random position
        }
    }
}