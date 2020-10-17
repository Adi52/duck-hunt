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


        // this.redDuck = new RedDuck(this);
        // this.blueDuck = new BlueDuck(this);

    }

    runIntro() {
        this.dog.runIntro = true;
    }

    respawnDuck() {
        this.duck.startRespawn = true;
    }

    gameMode1(deltaTime) {
        if (this.duck.runDogPickUp) {
            this.dog.pickUp(1, this.duck.position.x);
            this.duck.runDogPickUp = false;
        }
    }

    gameMode2() {

    }

    newRound() {
        this.gameStats.round++;
        this.runIntro();
        this.newSubRound();
    }

    newSubRound() {
        console.log('New round')
        this.duck = this.ducks[Math.floor(Math.random() * 3)];

        this.dog.canStartNextSubRound = false;
        // console.log(this.gameStats.correctHits);

        this.gameStats.currentSubRound++;
        this.gameStats.shoot = 0;

        this.respawn = true;
    }

    round() {

    }

    subRound() {

    }


    draw() {
        this.dog.draw();
        this.duck.draw();
        //
        // this.redDuck.draw();
        // this.blueDuck.draw();
    }

    update(deltaTime) {
        if (this.gameMode === 1) {
            this.gameMode1(deltaTime);
        } else if (this.gameMode === 2) {
            this.gameMode2();
        } else {
            console.log('Error');
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
                // this need change
                console.log('Koniec strzałów');
            }

        }

        if (this.dog.canStartNextSubRound && this.gameStats.currentSubRound !== 10) {
            this.newSubRound();
        }



        // this.redDuck.update(deltaTime);
        // this.blueDuck.update(deltaTime);
    }
}

