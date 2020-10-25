export default class Input {
    constructor(game, canvas) {
        this.game = game;
        canvas.addEventListener("mousedown", (event) => {
            if (game.gamestate === 2) {
                this.menuOptionClicked();
            }

            if (game.gamestate) {
                // Thanks this if we can't set mouseX and mouseY when game is paused
                let rect = canvas.getBoundingClientRect();
                this.mouseX = event.clientX - rect.left;
                this.mouseY = event.clientY - rect.top;

                // console.log(this.mouseX, this.mouseY);

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

    menuOptionClicked() {
        if (this.game.input.mouseX > 217 && this.game.input.mouseX < 525 &&
            this.game.input.mouseY > 415 && this.game.input.mouseY < 432) {
            this.game.gamestate = 1;
            this.game.gameMode = 1;
            this.game.start();
            this.game.newRound();

        }
        if (this.game.input.mouseX > 217 && this.game.input.mouseX < 553 &&
            this.game.input.mouseY > 458 && this.game.input.mouseY < 475) {
            this.game.gamestate = 1;
            this.game.gameMode = 2;
            this.game.newRound();

        }

    }

    limitClick(deltaTime) {
        this.counter += deltaTime / 16;
        this.limitShoot = this.counter >= 50;
    }
}