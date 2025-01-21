import { Application, Container, DEG_TO_RAD, Graphics, Point, Transform } from "pixi.js";
import { createGlobalContext, GlobalContext } from "./GlobalContext";
import { createSnake } from "./Snake";
import { createBoundary } from "./Boundary";
import { createFood } from "./Food";
import { createControlUI } from "./ControlUI";

declare global {
    var __PIXI_APP__: Application
}

// TODO : should refactor to separate data and rendering, to prepare for multiplayer

(async () => {
    const app = new Application();
    globalThis.__PIXI_APP__ = app; // For Dev Tools

    await app.init({ background: "#1c1917", resizeTo: window });

    document.getElementById("pixi-container")!.appendChild(app.canvas);

    const ctx = createGlobalContext(app);

    let worldContainer = new Container();
    worldContainer.label = "World Container";
    worldContainer.position.set(ctx.WORLD_POSITION.x, ctx.WORLD_POSITION.y);

    let boundary = createBoundary(ctx);
    worldContainer.addChild(boundary);

    let food = createFood(ctx);
    worldContainer.addChild(food.container);

    let snake = createSnake(ctx);
    worldContainer.addChild(snake.container);

    app.stage.addChild(worldContainer);

    let controlUI = createControlUI(ctx);
    app.stage.addChild(controlUI.container);

    ctx.playerInput.startPolling(controlUI);

    app.ticker.add((ticker) => {
        snake.update(ctx, ticker);
        food.update(ctx);
    });
})();

