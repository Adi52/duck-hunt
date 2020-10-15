import Duck from "./Duck";


export default class BlueDuck extends Duck {
    constructor(gameWidth, gameHeight, ctx) {
        super(gameWidth, gameHeight, ctx);
        this.currentRow = 2;
        this.points = 1500;
        this.duckSpeed = 2;
    }
}