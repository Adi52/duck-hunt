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
        this.dog = new Dog(this);
        this.duck = new Duck(this);
        this.redDuck = new RedDuck(this);
        this.blueDuck = new BlueDuck(this);
    }

    draw() {
        this.dog.draw();
        this.duck.draw();
        this.redDuck.draw();
        this.blueDuck.draw();
    }

    update(deltaTime) {
        this.dog.update(deltaTime);
        this.duck.update(deltaTime);
        this.redDuck.update(deltaTime);
        this.blueDuck.update(deltaTime);
    }

}