import { Application, Container } from "pixi.js";
import { createGlobalContext } from "./GlobalContext";
import { createSnake } from "./Snake";
import { createBoundary } from "./Boundary";
import { createFood } from "./Food";

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

    let boundary = createBoundary(ctx);
    app.stage.addChild(boundary);

    let food = createFood(ctx);
    app.stage.addChild(food.container);

    let snake = createSnake(ctx);
    app.stage.addChild(snake.container);

    ctx.playerInput.startPolling();

    app.ticker.add((ticker) => {
        snake.update(ctx, ticker);
        food.update(ctx);
    });
})();

function createControlUI() {
    // TODO : wip
}

class ControlUI {
    container: Container;

    constructor() {

        // let 
        // TODO : create 4 rects, save as members, player input listens to these 4 rect events

        let container = new Container();


        this.container = container;
    }
}