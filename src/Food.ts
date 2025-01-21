import { Container, Graphics } from "pixi.js";
import { GlobalContext } from "./GlobalContext";
import { getRandomWorldPosition } from "./utils";

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

        rect.label = "Food"

        const randomPosition = getRandomWorldPosition(ctx);
        rect.position.set(randomPosition.x, randomPosition.y);
        rect.updateTransform({ pivotX: rect.width / 2, pivotY: rect.height / 2 })

        this.container = rect;
    }

    public update(ctx: GlobalContext) {
        const app = ctx.app;
        const snakeHead = app.stage.getChildByLabel("World Container")?.getChildByLabel("Snake")?.getChildByLabel("Snake Head")!; // TODO : Refactor

        // Assumes snake is updated first
        // TODO : perhaps should pass snake here... since update of food depends on update of snake...?
        const wasEatenThisFrame = this.container.position.equals(snakeHead.position);
        if (wasEatenThisFrame) {
            let randomPosition = getRandomWorldPosition(ctx);
            this.container.position.set(randomPosition.x, randomPosition.y); // TODO : random position
        }
    }
}
