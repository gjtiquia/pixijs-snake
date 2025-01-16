import { Application, Graphics } from "pixi.js";

(async () => {
    const app = new Application();

    // for DevTools
    (globalThis as any).__PIXI_APP__ = app;

    await app.init({ background: "#1c1917", resizeTo: window });

    document.getElementById("pixi-container")!.appendChild(app.canvas);

    const UNIT_LENGTH = app.screen.width / 10;
    const UNIT_TIME_INTERVAL_MS = 200;

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
