
export default class Input {
    constructor(game, canvas) {
        canvas.addEventListener("mousedown", (event) => {
            if (game.gamestate) {
                // Thanks this if we can't set mouseX and mouseY when game is paused
                let rect = canvas.getBoundingClientRect();
                this.mouseX = event.clientX - rect.left;
                this.mouseY = event.clientY - rect.top;


                if (game.canShoot && this.limitShoot) {
                    this.counter = 0;
                    game.gameStats.shoot++;
                }
            }
        });

        document.addEventListener("keydown", event => {
            if (event.keyCode === 27) {
                game.togglePause();
            }
        })

        this.counter = 0;
    }

    limitClick(deltaTime) {
        this.counter += deltaTime/16;
        this.limitShoot = this.counter >= 50;
    }
}