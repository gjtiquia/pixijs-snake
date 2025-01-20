import { Container, Graphics, Ticker } from "pixi.js";
import { GlobalContext } from "./GlobalContext";

export function createSnake(ctx: GlobalContext) {
    return new Snake(ctx);
}

class Snake {
    container: Container;
    elapsedTime: number;

    constructor(ctx: GlobalContext) {
        this.container = this.createSnakeContainer(ctx);
        this.elapsedTime = 0;
    }

    private createSnakeContainer(ctx: GlobalContext) {
        const app = ctx.app;
        const UNIT_LENGTH = ctx.UNIT_LENGTH;
        const UPPER_BOUND_Y = ctx.UPPER_BOUND_Y;

        let snakeHead = new Graphics()
            .rect(0, 0, UNIT_LENGTH, UNIT_LENGTH)
            .fill("#f5f5f4");

        snakeHead.position.set(app.screen.width / 2, UPPER_BOUND_Y + UNIT_LENGTH / 2)
        snakeHead.updateTransform({ pivotX: snakeHead.width / 2, pivotY: snakeHead.height / 2 });
        snakeHead.label = "Snake Head";

        let container = new Container();
        container.label = "Snake";

        container.addChild(snakeHead);

        return container;
    }

    public update(ctx: GlobalContext, ticker: Ticker) {
        const UNIT_TIME_INTERVAL_MS = 100;

        const UNIT_LENGTH = ctx.UNIT_LENGTH;
        const UPPER_BOUND_Y = ctx.UPPER_BOUND_Y;
        const LOWER_BOUND_Y = ctx.LOWER_BOUND_Y;

        this.elapsedTime += ticker.deltaMS;
        if (this.elapsedTime > UNIT_TIME_INTERVAL_MS) {
            this.elapsedTime = 0;

            let snakeHead = this.container.getChildByLabel("Snake Head");
            let { x, y } = snakeHead!.position;
            y += UNIT_LENGTH; // Moves downwards!

            if (y > LOWER_BOUND_Y - UNIT_LENGTH / 2)
                y = UPPER_BOUND_Y + UNIT_LENGTH / 2;

            snakeHead!.position.set(x, y);
        }
    }
}