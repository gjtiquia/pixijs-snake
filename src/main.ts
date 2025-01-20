import { Application } from "pixi.js";
import { createGlobalContext } from "./GlobalContext";
import { createSnake } from "./Snake";
import { createBoundary } from "./Boundary";

declare global {
    var __PIXI_APP__: Application
}

(async () => {
    const app = new Application();
    globalThis.__PIXI_APP__ = app; // For Dev Tools

    await app.init({ background: "#1c1917", resizeTo: window });

    document.getElementById("pixi-container")!.appendChild(app.canvas);

    const ctx = createGlobalContext(app);

    let boundary = createBoundary(ctx);
    app.stage.addChild(boundary);

    let snake = createSnake(ctx);
    app.stage.addChild(snake.container);

    ctx.playerInput.startPolling();

    // TODO : should refactor to separate data and rendering, to prepare for multiplayer

    app.ticker.add((ticker) => {
        snake.update(ctx, ticker);
    });
})();
