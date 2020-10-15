import Input from "./Input";
import Collision from "./Collision";

import Dog from "./Dog";
import Duck from "./Duck";
import RedDuck from "./RedDuck";
import BlueDuck from "./BlueDuck";


export default class Game {
    constructor(gameWidth, gameHeight, ctx) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.ctx = ctx;
    }

    start() {
        this.input = new Input(document.querySelector('#canvas'));
        this.dog = new Dog(this);
        this.duck = new Duck(this);
        this.colission = new Collision(this);

        this.runIntro();
        this.respawn = true;

        // this.redDuck = new RedDuck(this);
        // this.blueDuck = new BlueDuck(this);

    }

    runIntro() {
        this.dog.runIntro = true;
    }

    respawnDuck() {
        this.duck.startRespawn = true;
    }


    draw() {
        this.dog.draw();
        this.duck.draw();
        // this.redDuck.draw();
        // this.blueDuck.draw();
    }

    update(deltaTime) {
        this.colission.update(this.duck);
        this.dog.update(deltaTime);
        this.duck.update(deltaTime);

        if (!this.dog.runIntro && this.respawn) {
            this.respawnDuck();
            this.respawn = false;
        }

        // this.redDuck.update(deltaTime);
        // this.blueDuck.update(deltaTime);
    }
}