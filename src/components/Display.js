export default class Display {
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.ctx = game.ctx;

        this.logoImage = document.querySelector('#logo');
        this.shotImage = document.querySelector('#shot');
        this.subroundsDuckWhite = document.querySelector('#subround_duck_white');
        this.subroundsDuckRed = document.querySelector('#subround_duck_red');
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

    showNumberRound() {
        this.ctx.font = "18px 'Press Start 2P'";
        this.ctx.fillStyle = '#47dd24';

        let round = "00" + this.game.gameStats.round;
        round = round.substr(round.length-2);

        this.ctx.fillText('R=' + round, 73.1, 598.5);
    }

    showScore() {
        // Thanks it we can display score in format 'SSSSSS'
        let score = "000000" + this.game.gameStats.score;
        score = score.substr(score.length-6);

        this.ctx.font = "22px 'Press Start 2P'";
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(score, 582, 647);
        this.ctx.fillText('SCORE', 603, 672);
    }

    showAvailableShoots() {
        for (let i = 0; i < 3 - this.game.gameStats.shoot; i++) {
            this.ctx.drawImage(this.shotImage, 78 + (i * 22), 625);
        }
    }

    showSubRoundsScore() {
        this.game.gameStats.correctHits.forEach((hit, index) => {
            if (hit === -1 || hit === 0) {
                this.ctx.drawImage(this.subroundsDuckWhite, 274 + (index * 25), 625);
            } else if (hit === 1) {
                this.ctx.drawImage(this.subroundsDuckRed, 274 + (index * 25), 625);
            } else {
                // this.ctx.drawImage(this.subroundsDuckBlack, 274 + (index * 25), 625);
                return;
            }
        })
    }

    draw() {
        if (!this.game.gamestate) {
            // if paused
            // this.menuScreen();
            this.pausedScreen();
        } else if (this.game.gamestate === 2) {
            this.menuScreen();
        } else {
            this.showNumberRound();
            this.showScore();
            this.showAvailableShoots();
            this.showSubRoundsScore();
        }

    }

    update() {

    }


}