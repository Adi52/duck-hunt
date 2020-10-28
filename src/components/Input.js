export default class Input {
    constructor(game, canvas) {
        this.game = game;
        canvas.addEventListener("mousedown", (event) => {
            if (game.gamestate === 2) {
                this.menuStartGame();
            }

            if (game.gamestate) {
                // Thanks this if we can't set mouseX and mouseY when game is paused
                let rect = canvas.getBoundingClientRect();
                this.mouseX = event.clientX - rect.left;
                this.mouseY = event.clientY - rect.top;

                // console.log(this.mouseX, this.mouseY);

                if (game.canShoot && this.limitShoot) {
                    this.game.sounds.gunShot.play();
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

    menuStartGame() {
        if (this.game.input.mouseX > 236 && this.game.input.mouseX < 531 &&
            this.game.input.mouseY > 447 && this.game.input.mouseY < 473) {
            this.game.gamestate = 1;
            this.game.gameStats.round = 0;
            this.game.start();
            this.game.newRound();
        }
    }

    limitClick(deltaTime) {
        this.counter += deltaTime / 16;
        this.limitShoot = this.counter >= 50;
    }
}