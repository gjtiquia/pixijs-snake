import { Application, Graphics, Point } from "pixi.js";

(async () => {
    const app = new Application();

    // for DevTools
    (globalThis as any).__PIXI_APP__ = app;

    await app.init({ background: "#1c1917", resizeTo: window });

    document.getElementById("pixi-container")!.appendChild(app.canvas);

    const UNIT_LENGTH = 30;
    const WORLD_SIZE = new Point(10, 10);
    const UNIT_TIME_INTERVAL_MS = 100;

    const BOUNDARY_WIDTH = 10;

    let upperBoundaryRect = new Graphics()
        .rect(0, 0, WORLD_SIZE.x * UNIT_LENGTH + 2 * BOUNDARY_WIDTH, BOUNDARY_WIDTH)
        .fill("#ff0000")
    let lowerBoundaryRect = new Graphics()
        .rect(0, 0, WORLD_SIZE.x * UNIT_LENGTH + 2 * BOUNDARY_WIDTH, BOUNDARY_WIDTH)
        .fill("#ff0000")
    let leftBoundaryRect = new Graphics()
        .rect(0, 0, BOUNDARY_WIDTH, WORLD_SIZE.y * UNIT_LENGTH + 2 * BOUNDARY_WIDTH)
        .fill("#ff0000")
    let rightBoundaryRect = new Graphics()
        .rect(0, 0, BOUNDARY_WIDTH, WORLD_SIZE.y * UNIT_LENGTH + 2 * BOUNDARY_WIDTH)
        .fill("#ff0000")

    upperBoundaryRect.position.set(
        app.screen.width / 2,
        app.screen.height / 2 - WORLD_SIZE.y * UNIT_LENGTH / 2 - BOUNDARY_WIDTH / 2,
    )
    lowerBoundaryRect.position.set(
        app.screen.width / 2,
        app.screen.height / 2 + WORLD_SIZE.y * UNIT_LENGTH / 2 + BOUNDARY_WIDTH / 2,
    )
    leftBoundaryRect.position.set(
        app.screen.width / 2 - WORLD_SIZE.x * UNIT_LENGTH / 2 - BOUNDARY_WIDTH / 2,
        app.screen.height / 2
    )
    rightBoundaryRect.position.set(
        app.screen.width / 2 + WORLD_SIZE.x * UNIT_LENGTH / 2 + BOUNDARY_WIDTH / 2,
        app.screen.height / 2
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

    app.stage.addChild(upperBoundaryRect);
    app.stage.addChild(lowerBoundaryRect);
    app.stage.addChild(leftBoundaryRect);
    app.stage.addChild(rightBoundaryRect);

    let rect = new Graphics()
        .rect(0, 0, UNIT_LENGTH, UNIT_LENGTH)
        .fill("#f5f5f4");

    rect.position.set(app.screen.width / 2, app.screen.height / 2)
    rect.updateTransform({ pivotX: UNIT_LENGTH / 2, pivotY: UNIT_LENGTH / 2 });

    app.stage.addChild(rect);

    let elapsedTime = 0;

    app.ticker.add((ticker) => {

        elapsedTime += ticker.deltaMS;
        if (elapsedTime > UNIT_TIME_INTERVAL_MS) {
            elapsedTime = 0;

            let { x, y } = rect.position;
            y += UNIT_LENGTH; // Moves downwards!

            if (y > app.screen.height - UNIT_LENGTH)
                y = UNIT_LENGTH;

            rect.position.set(x, y);
        }
    });
})();
