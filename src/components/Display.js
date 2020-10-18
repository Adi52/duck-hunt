
export default class Display {
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.ctx = game.ctx;
    }


    pausedScreen() {
        this.ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        this.ctx.fillStyle = "rgba(0,0,0,0.5)";
        this.ctx.fill();
        this.ctx.font = "75px 'Press Start 2P'";
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Paused', this.gameWidth/2, this.gameHeight/2);
    }

    draw() {
        if (!this.game.gamestate) {
            // if paused
            this.pausedScreen();
        }

    }

    update() {

    }


}