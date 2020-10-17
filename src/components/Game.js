import Input from "./Input";
import Collision from "./Collision";
import GameStats from "./GameStats";

import Dog from "./Dog";
import Duck from "./Duck";
import RedDuck from "./RedDuck";
import BlueDuck from "./BlueDuck";


export default class Game {
    constructor(gameWidth, gameHeight, ctx) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.ctx = ctx;

        this.gameMode = 1; // 1 or 2 ducks
    }

    start() {
        this.ducks = [new Duck(this), new RedDuck(this), new BlueDuck(this)];

        this.input = new Input(this, document.querySelector('#canvas'));
        this.gameStats = new GameStats();

        this.dog = new Dog(this);
        this.duck = new Duck(this);
        this.colission = new Collision(this);

        this.canShoot = false;
        this.newRound();
    }

    runIntro() {
        this.dog.runIntro = true;
    }

    respawnDuck() {
        this.duck.startRespawn = true;
    }

    gameMode1() {
        if (this.duck.runDogPickUp) {
            this.dog.pickUp(1, this.duck.position.x);
            this.duck.runDogPickUp = false;
        }
    }

    gameMode2() {

    }

    newRound() {
        this.dog.resetPropertiesAfterRound();

        console.log(`Round: ${this.gameStats.round}`);

        this.gameStats.currentSubRound = 0;

        this.gameStats.round++;
        this.runIntro();
        this.newSubRound();
    }

    newSubRound() {
        // Generate random color duck
        this.duck = this.ducks[Math.floor(Math.random() * 3)];
        this.dog.canStartNextSubRound = false;

        this.gameStats.currentSubRound++;
        this.gameStats.shoot = 0;

        this.respawn = true;
    }

    draw() {
        this.dog.draw();
        this.duck.draw();
    }

    update(deltaTime) {
        if (this.gameMode === 1) {
            this.gameMode1();
        } else if (this.gameMode === 2) {
            this.gameMode2();
        } else {
            return;
        }

        this.colission.update(this.duck);
        this.dog.update(deltaTime);
        this.duck.update(deltaTime);


        if (!this.dog.runIntro && this.respawn) {
            this.respawnDuck();
            this.canShoot = true;
            this.respawn = false;
        }

        if (this.gameStats.shoot >= 3) {
            this.canShoot = false;
            // lose sub round
            if (!this.duck.beHit) {
                // to wykonuje się po zestrzeleniu kaczki 3 strzałem, trzeba to zmienić
                // this need change
                console.log('Koniec strzałów');
                this.duck.flyAwayNow = true;

            }
        }

        if (this.dog.canStartNextSubRound) {
            if (this.gameStats.currentSubRound !== 2) {
                // change it on 10!
                this.newSubRound();
            } else {
                // New round after 10 sub rounds;
                this.newRound();
            }
        }
    }
}

