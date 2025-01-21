import { ControlUI } from "./ControlUI";

export function createPlayerInput() {
    return new PlayerInput();
}

export class PlayerInput {
    up: boolean = false;
    down: boolean = false;
    left: boolean = false;
    right: boolean = false;

    public startPolling(controlUI: ControlUI) {

        window.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "KeyW": this.up = true; break;
                case "KeyA": this.left = true; break;
                case "KeyS": this.down = true; break;
                case "KeyD": this.right = true; break;
            }
        });

        window.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "KeyW": this.up = false; break;
                case "KeyA": this.left = false; break;
                case "KeyS": this.down = false; break;
                case "KeyD": this.right = false; break;
            }
        });

        controlUI.upButton.on("pointerdown", () => this.up = true);
        controlUI.downButton.on("pointerdown", () => this.down = true);
        controlUI.leftButton.on("pointerdown", () => this.left = true);
        controlUI.rightButton.on("pointerdown", () => this.right = true);

        controlUI.upButton.on("pointerup", () => this.up = false);
        controlUI.downButton.on("pointerup", () => this.down = false);
        controlUI.leftButton.on("pointerup", () => this.left = false);
        controlUI.rightButton.on("pointerup", () => this.right = false);

        controlUI.upButton.on("pointerupoutside", () => this.up = false);
        controlUI.downButton.on("pointerupoutside", () => this.down = false);
        controlUI.leftButton.on("pointerupoutside", () => this.left = false);
        controlUI.rightButton.on("pointerupoutside", () => this.right = false);
    }
}