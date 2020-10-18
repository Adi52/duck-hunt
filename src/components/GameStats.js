
export default class GameStats {
    constructor(game) {
        this.game = game;

        this.score = 0;
        this.bestScore = 0;
        this.perfectBonusScore = 10000;

        this.shoot = 0;
        this.missHits = 0;

        this.correctHits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.availableSubRounds = this.correctHits.length;

        this.missAvailable = 5;

        this.currentSubRound = 0;
        this.round = 0;

    }

    changePerfectBonusScore() {
        if (this.round < 11) {
            this.perfectBonusScore = 10000;
        } else if (this.round < 16) {
            this.perfectBonusScore = 15000;
        } else if (this.round < 21) {
            this.perfectBonusScore = 20000;
        } else {
            this.perfectBonusScore = 30000;
        }
    }

    changeMissHits() {
        if (this.round < 11) {
            this.missAvailable = 5;
        } else if (this.round < 13) {
            this.missAvailable = 4;
        } else if (this.round < 15) {
            this.missAvailable = 3;
        } else if (this.round < 20) {
            this.missAvailable = 2;
        } else {
            this.missAvailable = 1;
        }
    }

    perfectBonus() {
        this.score += this.perfectBonusScore;
        // Musisz jeszcze dodać wyświetlanie komunikatu "Perfect Bonus" na canvasie
    }


    summaryRounds() {
        if (this.correctHits.every(element => {return element === 1})) {
            // If player hit duck 10 times call perfect bonus
            this.perfectBonus();
        }

        this.correctHits.forEach(element => {
            if (element === -1) {
                this.missHits++;
            }
        })

        if (this.missHits >= this.missAvailable) {
            console.log('GAME OVER!');
        }
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
        this.changeDuckSpeed();
        this.changeMissHits();
        this.changePointsPerDuck();
        this.changePerfectBonusScore()

        this.setBestScore();
    }
}