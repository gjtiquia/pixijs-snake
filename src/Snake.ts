import { Container, Graphics, Point, Ticker } from "pixi.js";
import { GlobalContext } from "./GlobalContext";
import { getRandomWorldPosition } from "./utils";

export function createSnake(ctx: GlobalContext) {
    return new Snake(ctx);
}

class Snake {
    container: Container;
    elapsedTime: number;
    velocity: Point;

    constructor(ctx: GlobalContext) {
        this.container = this.createSnakeContainer(ctx);
        this.elapsedTime = 0;
        this.velocity = new Point(0, 1); // Downwards by default
    }
    private createSnakeContainer(ctx: GlobalContext) {
        const UNIT_LENGTH = ctx.UNIT_LENGTH;

        let snakeHead = new Graphics()
            .rect(0, 0, UNIT_LENGTH, UNIT_LENGTH)
            .fill("#f5f5f4");

        let randomPosition = getRandomWorldPosition(ctx);
        snakeHead.position.set(randomPosition.x, randomPosition.y);

        snakeHead.updateTransform({ pivotX: snakeHead.width / 2, pivotY: snakeHead.height / 2 });
        snakeHead.label = "Snake Head";

        let container = new Container();
        container.label = "Snake";

        container.addChild(snakeHead);

        return container;
    }

    public update(ctx: GlobalContext, ticker: Ticker) {

        // TODO : dun allow diagonal movement
        const playerInput = ctx.playerInput;
        let playerX = 0;
        let playerY = 0;
        if (playerInput.up) playerY -= 1
        if (playerInput.down) playerY += 1
        if (playerInput.left) playerX -= 1;
        if (playerInput.right) playerX += 1;
        if (playerX !== 0 || playerY !== 0) this.velocity.set(playerX, playerY);

        const UNIT_TIME_INTERVAL_MS = 120;
        this.elapsedTime += ticker.deltaMS;

        if (this.elapsedTime > UNIT_TIME_INTERVAL_MS) {
            this.elapsedTime = 0;

            let snakeHead = this.container.getChildByLabel("Snake Head");
            let { x, y } = snakeHead!.position;

            const UNIT_LENGTH = ctx.UNIT_LENGTH;
            x += this.velocity.x * UNIT_LENGTH;
            y += this.velocity.y * UNIT_LENGTH;

            const UPPER_BOUND_Y = ctx.UPPER_BOUND_Y;
            const LOWER_BOUND_Y = ctx.LOWER_BOUND_Y;
            const LEFT_BOUND_X = ctx.LEFT_BOUND_X;
            const RIGHT_BOUND_X = ctx.RIGHT_BOUND_X;

            if (x < LEFT_BOUND_X + UNIT_LENGTH / 2)
                x = RIGHT_BOUND_X - UNIT_LENGTH / 2;
            else if (x > RIGHT_BOUND_X - UNIT_LENGTH / 2)
                x = LEFT_BOUND_X + UNIT_LENGTH / 2;

            if (y < UPPER_BOUND_Y + UNIT_LENGTH / 2)
                y = LOWER_BOUND_Y - UNIT_LENGTH / 2;
            else if (y > LOWER_BOUND_Y - UNIT_LENGTH / 2)
                y = UPPER_BOUND_Y + UNIT_LENGTH / 2;

            snakeHead!.position.set(x, y);
        }
    }
}