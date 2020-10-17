
export default class GameStats {
    constructor(game) {
        this.game = game;

        this.score = 0;
        this.bestScore = 0;

        this.shoot = 0;

        this.correctHits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.availableSubRounds = this.correctHits.length;

        this.missHits = 5;

        this.currentSubRound = 0;
        this.round = 0;

    }



    changeMissHits() {
        if (this.round < 11) {
            this.missHits = 5;
        } else if (this.round < 13) {
            this.missHits = 4;
        } else if (this.round < 15) {
            this.missHits = 3;
        } else if (this.round < 20) {
            this.missHits = 2;
        } else {
            this.missHits = 1;
        }
    }

    perfectBonus() {

        // to do
    }



    changePointsPerDuck() {
        if (this.round < 6) {
            this.game.ducks[0].points = 500;
            this.game.ducks[1].points = 1000;
            this.game.ducks[2].points = 1500;
        } else if (this.round < 11) {
            this.game.ducks[0].points = 800;
            this.game.ducks[1].points = 1600;
            this.game.ducks[2].points = 2400;
        } else {
            this.game.ducks[0].points = 1000;
            this.game.ducks[1].points = 2000;
            this.game.ducks[2].points = 3000;
        }
    }

    changeDuckSpeed() {
        this.game.duck.duckSpeed += 0.1;
    }


    setBestScore() {
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
        }
    }

    update() {
        this.changeMissHits();
        this.changePointsPerDuck();
        this.setBestScore();
    }
}