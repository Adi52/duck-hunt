export default class Collision {
    constructor(game) {
        this.game = game;

        this.gameStats = game.gameStats;
        this.input = game.input;

        this.duck = game.duck;
    }

    hitTestPoint(x1, y1, w1, h1, x2, y2) {
        return (x1 <= x2 && x1 + w1 + 35 >= x2) &&
            (y1 <= y2 && y1 + h1 + 35 >= y2);
    }

    update(duck) {
        if (this.game.canShoot && this.game.input.limitShoot && this.hitTestPoint(duck.position.x, duck.position.y, duck.widthDuck, duck.heightDuck, this.input.mouseX, this.input.mouseY)) {
            duck.beHit = true;
            this.game.sounds.duckFlapping.stop();
            // this.game.sounds.duckFalling.play();

            // this.game.display.displayPointsForDuck(this.duck.position.x, this.duck.position.y);
            this.gameStats.score += this.game.duck.points;
            this.gameStats.correctHits[this.gameStats.currentSubRound - 1] = 1;

            // need for display Score per Duck in background
            this.game.display.posXMouseWhenHitDuck = this.game.duck.position.x;
            this.game.display.posYMouseWhenHitDuck = this.game.duck.position.y;
        }
        this.input.mouseX = null;
        this.input.mouseY = null;
    }
}