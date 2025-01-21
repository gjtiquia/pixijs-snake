import { Container, Point, Graphics, Transform, DEG_TO_RAD } from "pixi.js";
import { GlobalContext } from "./GlobalContext";

export function createControlUI(ctx: GlobalContext) {
    return new ControlUI(ctx);
}

export class ControlUI {
    container: Container;
    upButton: Container;
    downButton: Container;
    leftButton: Container;
    rightButton: Container;

    constructor(ctx: GlobalContext) {

        let app = ctx.app;

        const BUTTON_LENGTH = 75; // TODO : this should probably scale with the width of the screen
        const BUTTON_COLOR = "#333333";
        const BUTTON_FILL_COLOR = "#999999";

        // TODO : positioning should be relative to the bottom of the app, not the middle
        const CONTROLS_Y_OFFSET = 130;
        const CONTROLS_POSITION = new Point(app.screen.width / 2, app.screen.height / 2 + CONTROLS_Y_OFFSET);

        let container = new Container();
        container.label = "Control UI"
        container.position.set(CONTROLS_POSITION.x, CONTROLS_POSITION.y);

        let upButton = new Graphics()
            .rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH)
            .fill(BUTTON_COLOR)

        let downButton = new Graphics()
            .rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH)
            .fill(BUTTON_COLOR)

        let leftButton = new Graphics()
            .rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH)
            .fill(BUTTON_COLOR)

        let rightButton = new Graphics()
            .rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH)
            .fill(BUTTON_COLOR)

        upButton.label = "Up Button";
        downButton.label = "Down Button";
        leftButton.label = "Left Button";
        rightButton.label = "Right Button";

        const OFFSET = BUTTON_LENGTH + 2;

        upButton.position.set(0, -OFFSET);
        downButton.position.set(0, OFFSET);
        leftButton.position.set(-OFFSET, 0);
        rightButton.position.set(OFFSET, 0);

        let transform = new Transform();
        transform.rotation = 45 * DEG_TO_RAD;
        transform.pivot.set(BUTTON_LENGTH / 2, BUTTON_LENGTH / 2);

        upButton.updateTransform(transform);
        downButton.updateTransform(transform);
        leftButton.updateTransform(transform);
        rightButton.updateTransform(transform);

        upButton.eventMode = "static";
        downButton.eventMode = "static";
        leftButton.eventMode = "static";
        rightButton.eventMode = "static";

        // TODO : refactor: should change the color based on PlayerInput, so the color will change even with keyboard presses
        upButton.on("pointerdown", () => upButton.clear().rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH).fill(BUTTON_FILL_COLOR))
        downButton.on("pointerdown", () => downButton.clear().rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH).fill(BUTTON_FILL_COLOR))
        leftButton.on("pointerdown", () => leftButton.clear().rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH).fill(BUTTON_FILL_COLOR))
        rightButton.on("pointerdown", () => rightButton.clear().rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH).fill(BUTTON_FILL_COLOR))

        upButton.on("pointerup", () => upButton.clear().rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH).fill(BUTTON_COLOR))
        downButton.on("pointerup", () => downButton.clear().rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH).fill(BUTTON_COLOR))
        leftButton.on("pointerup", () => leftButton.clear().rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH).fill(BUTTON_COLOR))
        rightButton.on("pointerup", () => rightButton.clear().rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH).fill(BUTTON_COLOR))

        upButton.on("pointerupoutside", () => upButton.clear().rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH).fill(BUTTON_COLOR))
        downButton.on("pointerupoutside", () => downButton.clear().rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH).fill(BUTTON_COLOR))
        leftButton.on("pointerupoutside", () => leftButton.clear().rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH).fill(BUTTON_COLOR))
        rightButton.on("pointerupoutside", () => rightButton.clear().rect(0, 0, BUTTON_LENGTH, BUTTON_LENGTH).fill(BUTTON_COLOR))

        container.addChild(upButton);
        container.addChild(downButton);
        container.addChild(leftButton);
        container.addChild(rightButton);

        this.upButton = upButton;
        this.downButton = downButton;
        this.leftButton = leftButton;
        this.rightButton = rightButton;
        this.container = container;
    }
}
