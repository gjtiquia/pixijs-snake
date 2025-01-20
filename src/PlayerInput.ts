export function createPlayerInput() {
    return new PlayerInput();
}

export class PlayerInput {
    up: boolean = false;
    down: boolean = false;
    left: boolean = false;
    right: boolean = false;

    public startPolling() {

        // TODO : poll button inputs on mobile

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
    }
}