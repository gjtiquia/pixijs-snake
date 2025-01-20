import { Application, Container, Graphics, Point, Ticker } from "pixi.js";

declare global {
    var __PIXI_APP__: Application
}

class GlobalContext {
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

(async () => {
    const app = new Application();
    globalThis.__PIXI_APP__ = app; // For Dev Tools

    await app.init({ background: "#1c1917", resizeTo: window });

    document.getElementById("pixi-container")!.appendChild(app.canvas);

    const ctx = new GlobalContext(app);

    let boundary = createBoundary(ctx);
    app.stage.addChild(boundary);

    let snake = createSnake(ctx);
    app.stage.addChild(snake.container);

    app.ticker.add((ticker) => {
        snake.update(ctx, ticker);
    });
})();

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

function createSnake(ctx: GlobalContext) {

    return new Snake(ctx);
}

function createBoundary(ctx: GlobalContext) {

    const BOUNDARY_RECT_THICKNESS = 10;
    const BOUNDARY_RECT_COLOR = "#ff0000";

    const app = ctx.app;
    const WORLD_SIZE = ctx.WORLD_SIZE;
    const UNIT_LENGTH = ctx.UNIT_LENGTH;
    const UPPER_BOUND_Y = ctx.UPPER_BOUND_Y;
    const LOWER_BOUND_Y = ctx.LOWER_BOUND_Y;
    const LEFT_BOUND_X = ctx.LEFT_BOUND_X;
    const RIGHT_BOUND_X = ctx.RIGHT_BOUND_X;

    let upperBoundaryRect = new Graphics()
        .rect(0, 0, WORLD_SIZE.x * UNIT_LENGTH + 2 * BOUNDARY_RECT_THICKNESS, BOUNDARY_RECT_THICKNESS)
        .fill(BOUNDARY_RECT_COLOR)
    let lowerBoundaryRect = new Graphics()
        .rect(0, 0, WORLD_SIZE.x * UNIT_LENGTH + 2 * BOUNDARY_RECT_THICKNESS, BOUNDARY_RECT_THICKNESS)
        .fill(BOUNDARY_RECT_COLOR)
    let leftBoundaryRect = new Graphics()
        .rect(0, 0, BOUNDARY_RECT_THICKNESS, WORLD_SIZE.y * UNIT_LENGTH + 2 * BOUNDARY_RECT_THICKNESS)
        .fill(BOUNDARY_RECT_COLOR)
    let rightBoundaryRect = new Graphics()
        .rect(0, 0, BOUNDARY_RECT_THICKNESS, WORLD_SIZE.y * UNIT_LENGTH + 2 * BOUNDARY_RECT_THICKNESS)
        .fill(BOUNDARY_RECT_COLOR)

    upperBoundaryRect.position.set(
        app.screen.width / 2,
        UPPER_BOUND_Y - BOUNDARY_RECT_THICKNESS / 2,
    )
    lowerBoundaryRect.position.set(
        app.screen.width / 2,
        LOWER_BOUND_Y + BOUNDARY_RECT_THICKNESS / 2,
    )
    leftBoundaryRect.position.set(
        LEFT_BOUND_X - BOUNDARY_RECT_THICKNESS / 2,
        app.screen.height / 2,
    )
    rightBoundaryRect.position.set(
        RIGHT_BOUND_X + BOUNDARY_RECT_THICKNESS / 2,
        app.screen.height / 2,
    )

    upperBoundaryRect.updateTransform({
        pivotX: upperBoundaryRect.width / 2,
        pivotY: upperBoundaryRect.height / 2,
    })
    lowerBoundaryRect.updateTransform({
        pivotX: lowerBoundaryRect.width / 2,
        pivotY: lowerBoundaryRect.height / 2,
    })
    leftBoundaryRect.updateTransform({
        pivotX: leftBoundaryRect.width / 2,
        pivotY: leftBoundaryRect.height / 2,
    })
    rightBoundaryRect.updateTransform({
        pivotX: rightBoundaryRect.width / 2,
        pivotY: rightBoundaryRect.height / 2,
    })

    upperBoundaryRect.label = "Upper Boundary Rect";
    lowerBoundaryRect.label = "Lower Boundary Rect";
    leftBoundaryRect.label = "Left Boundary Rect";
    rightBoundaryRect.label = "Right Boundary Rect";

    let container = new Container();
    container.addChild(upperBoundaryRect);
    container.addChild(lowerBoundaryRect);
    container.addChild(leftBoundaryRect);
    container.addChild(rightBoundaryRect);

    return container;
}