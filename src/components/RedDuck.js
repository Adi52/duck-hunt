import Duck from "./Duck";


export default class RedDuck extends Duck {
    constructor(gameWidth, gameHeight, ctx) {
        super(gameWidth, gameHeight, ctx);
        this.currentRow = 1;
        this.points = 1000;
        this.duckSpeed = 1.3;
    }
}