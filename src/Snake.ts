import { Container, Graphics, Point, Ticker } from "pixi.js";
import { GlobalContext } from "./GlobalContext";
import { getRandomWorldPosition } from "./utils";

export function createSnake(ctx: GlobalContext) {
    return new Snake(ctx);
}

class Snake {
    container: Container;
    bodyContainers: Container[];

    elapsedTime: number;
    velocity: Point;

    constructor(ctx: GlobalContext) {
        this.container = this.createSnakeContainer(ctx);
        this.bodyContainers = [];
        this.elapsedTime = 0;
        this.velocity = new Point(0, 1); // Downwards by default
    }
    private createSnakeContainer(ctx: GlobalContext) {
        let snakeHead = this.createRect(ctx);
        snakeHead.label = "Snake Head";

        let randomPosition = getRandomWorldPosition(ctx);
        snakeHead.position.set(randomPosition.x, randomPosition.y);

        let container = new Container();
        container.label = "Snake";

        container.addChild(snakeHead);

        return container;
    }

    public update(ctx: GlobalContext, ticker: Ticker) {

        // TODO : should implement as input buffer, cuz can still immediately turn left from right if was able to sneak an "up" between "frames"
        const playerInput = ctx.playerInput;
        let playerX = 0;
        let playerY = 0;
        if (playerInput.up && this.velocity.y !== 1) playerY -= 1
        if (playerInput.down && this.velocity.y !== -1) playerY += 1
        if (playerInput.left && this.velocity.x !== 1) playerX -= 1;
        if (playerInput.right && this.velocity.x !== -1) playerX += 1;
        if (Math.abs(playerX) === 1 && Math.abs(playerY) === 1) { /* keep previous velocity */ } // temporary solution to prevent diagonal movement
        else if (playerX !== 0 || playerY !== 0) this.velocity.set(playerX, playerY);

        const UNIT_TIME_INTERVAL_MS = 200;
        this.elapsedTime += ticker.deltaMS;

        if (this.elapsedTime > UNIT_TIME_INTERVAL_MS) {
            this.elapsedTime = 0;

            let snakeHead = this.container.getChildByLabel("Snake Head")!; // TODO : refactor
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

            let previousTailPosition = snakeHead.position.clone();
            if (this.bodyContainers.length > 0)
                previousTailPosition = this.bodyContainers[this.bodyContainers.length - 1].position.clone();


            // TODO : update children
            for (let i = this.bodyContainers.length - 1; i > 0; i--) {
                console.log("update")
                let body = this.bodyContainers[i];
                let previousBody = this.bodyContainers[i - 1];
                body.position.set(previousBody.position.x, previousBody.position.y);
            }

            if (this.bodyContainers.length > 0)
                this.bodyContainers[0].position.set(snakeHead.position.x, snakeHead.position.y);

            snakeHead.position.set(x, y);


            const app = ctx.app;
            let food = app.stage.getChildByLabel("World Container")!.getChildByLabel("Food")!;

            const wasEatenThisFrame = snakeHead.position.equals(food.position);
            if (wasEatenThisFrame) {
                let newBody = this.createRect(ctx);
                newBody.position = previousTailPosition.clone();

                this.bodyContainers.push(newBody);
                this.container.addChild(newBody);
            }
        }
    }

    private createRect(ctx: GlobalContext) {
        const UNIT_LENGTH = ctx.UNIT_LENGTH;
        const PADDING = 0.9;

        let rect = new Graphics()
            .rect(0, 0, UNIT_LENGTH * PADDING, UNIT_LENGTH * PADDING)
            .fill("#f5f5f4");

        rect.updateTransform({ pivotX: rect.width / 2, pivotY: rect.height / 2 });

        return rect;
    }
}