export default class Display {
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.ctx = game.ctx;

        this.logoImage = document.querySelector('#logo');
    }

    menuScreen() {
        this.ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.fill();
        this.ctx.font = "20px 'Press Start 2P'";
        this.ctx.fillStyle = '#ff9c39';
        this.ctx.textAlign = 'center';

        this.ctx.drawImage(
            this.logoImage,
            this.gameWidth / 2 - this.logoImage.width / 2,
            this.gameHeight * 0.1
        );

        this.ctx.fillText('GAME A    1 DUCK ', this.gameWidth / 2, this.gameHeight * 0.6);
        this.ctx.fillText('GAME B    2 DUCKS', this.gameWidth / 2, this.gameHeight * 0.66);

        this.ctx.fillStyle = '#47dd24';
        this.ctx.fillText(`BEST SCORE  =  ${this.game.gameStats.bestScore}`, this.gameWidth / 2, this.gameHeight * 0.8);

        this.ctx.fillStyle = 'white';
        this.ctx.fillText('© 2020 Adi52', this.gameWidth / 2, this.gameHeight * 0.86);
    }

    pausedScreen() {
        this.ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        this.ctx.fillStyle = "rgba(0,0,0,0.5)";
        this.ctx.fill();
        this.ctx.font = "75px 'Press Start 2P'";
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);
    }

    draw() {
        if (!this.game.gamestate) {
            // if paused
            // this.menuScreen();
            this.pausedScreen();
        } else if (this.game.gamestate === 2) {
            this.menuScreen();
        }

    }

    update() {

    }


}