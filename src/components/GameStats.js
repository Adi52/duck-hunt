
export default class GameStats {
    constructor() {
        this.score = 0;
        this.bestScore = 0;

        this.shoots = 3;

        this.correctHits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.missHits = 5;

        this.currentSubRound = 1;
        this.round = 1;

    }

    // Round 01-10 = You need to hit 6 targets out of 10
    // Round 11-12 = You need to hit 7 targets out of 10
    // Round 13-14 = You need to hit 8 targets out of 10
    // Round 15-19 = You need to hit 9 targets out of 10
    // Round 20-up = Miss one and the game is over
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

    changePointsPerDuck() {
        if (this.round < 6) {
            this.duck.points = 500;
            this.redDuck.points = 1000;
            this.blueDuck.points = 1500;
        } else if (this.round < 11) {
            this.duck.points = 800;
            this.redDuck.points = 1600;
            this.blueDuck.points = 2400;
        } else {
            this.duck.points = 1000;
            this.redDuck.points = 2000;
            this.blueDuck.points = 3000;
        }
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