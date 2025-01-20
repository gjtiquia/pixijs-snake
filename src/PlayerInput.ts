export function createPlayerInput() {
    return new PlayerInput();
}

export class PlayerInput {
    up: boolean = false;
    down: boolean = false;
    left: boolean = false;
    right: boolean = false;

    public startPolling() {
        window.addEventListener("keydown", (e) => {
            console.log("keydown", e.code);

            switch (e.code) {
                case "KeyW": this.up = true; break;
                case "KeyA": this.left = true; break;
                case "KeyS": this.down = true; break;
                case "KeyD": this.right = true; break;
            }
        });

        window.addEventListener("keyup", (e) => {
            console.log("keyup", e.code);

            switch (e.code) {
                case "KeyW": this.up = false; break;
                case "KeyA": this.left = false; break;
                case "KeyS": this.down = false; break;
                case "KeyD": this.right = false; break;
            }
        });
    }
}