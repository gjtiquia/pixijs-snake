import { Application, Graphics, Point } from "pixi.js";

declare global {
    var __PIXI_APP__: Application
}

(async () => {
    const app = new Application();

    // for DevTools
    globalThis.__PIXI_APP__ = app;

    await app.init({ background: "#1c1917", resizeTo: window });

    document.getElementById("pixi-container")!.appendChild(app.canvas);

    const UNIT_LENGTH = 20;
    const WORLD_SIZE = new Point(15, 15);
    const UNIT_TIME_INTERVAL_MS = 100;

    const BOUNDARY_RECT_THICKNESS = 10;

    const UPPER_BOUND_Y = app.screen.height / 2 - WORLD_SIZE.y * UNIT_LENGTH / 2;
    const LOWER_BOUND_Y = app.screen.height / 2 + WORLD_SIZE.y * UNIT_LENGTH / 2;
    const LEFT_BOUND_X = app.screen.width / 2 - WORLD_SIZE.x * UNIT_LENGTH / 2;
    const RIGHT_BOUND_X = app.screen.width / 2 + WORLD_SIZE.x * UNIT_LENGTH / 2;

    let upperBoundaryRect = new Graphics()
        .rect(0, 0, WORLD_SIZE.x * UNIT_LENGTH + 2 * BOUNDARY_RECT_THICKNESS, BOUNDARY_RECT_THICKNESS)
        .fill("#ff0000")
    let lowerBoundaryRect = new Graphics()
        .rect(0, 0, WORLD_SIZE.x * UNIT_LENGTH + 2 * BOUNDARY_RECT_THICKNESS, BOUNDARY_RECT_THICKNESS)
        .fill("#ff0000")
    let leftBoundaryRect = new Graphics()
        .rect(0, 0, BOUNDARY_RECT_THICKNESS, WORLD_SIZE.y * UNIT_LENGTH + 2 * BOUNDARY_RECT_THICKNESS)
        .fill("#ff0000")
    let rightBoundaryRect = new Graphics()
        .rect(0, 0, BOUNDARY_RECT_THICKNESS, WORLD_SIZE.y * UNIT_LENGTH + 2 * BOUNDARY_RECT_THICKNESS)
        .fill("#ff0000")

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

    app.stage.addChild(upperBoundaryRect);
    app.stage.addChild(lowerBoundaryRect);
    app.stage.addChild(leftBoundaryRect);
    app.stage.addChild(rightBoundaryRect);

    let rect = new Graphics()
        .rect(0, 0, UNIT_LENGTH, UNIT_LENGTH)
        .fill("#f5f5f4");

    rect.position.set(app.screen.width / 2, UPPER_BOUND_Y + UNIT_LENGTH / 2)
    rect.updateTransform({ pivotX: UNIT_LENGTH / 2, pivotY: UNIT_LENGTH / 2 });

    app.stage.addChild(rect);

    let elapsedTime = 0;

    app.ticker.add((ticker) => {

        elapsedTime += ticker.deltaMS;
        if (elapsedTime > UNIT_TIME_INTERVAL_MS) {
            elapsedTime = 0;

            let { x, y } = rect.position;
            y += UNIT_LENGTH; // Moves downwards!

            if (y > LOWER_BOUND_Y - UNIT_LENGTH / 2)
                y = UPPER_BOUND_Y + UNIT_LENGTH / 2;

            rect.position.set(x, y);
        }
    });
})();
