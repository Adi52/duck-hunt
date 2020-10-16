
export default class Duck {
    constructor(game) {
        // game properties
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.ctx = game.ctx;

        this.beHit = false;

        // duck properties
        this.duckAlive = false;
        this.startRespawn = false;
        this.directionX = (Math.random()*1.3) + 0.9;
        this.directionY = (Math.random()*1.3) + 0.9;
        this.duckSpeed = 1;
        this.points = 500;
        this.position = {
            x: this.gameWidth,
            y: this.gameHeight,
        };

        // images
        this.ducksFlyUpImage = document.querySelector('#ducksFlyUpImg');
        this.ducksFallImage = document.querySelector('#ducksFall');
        this.ducksImage = this.ducksFlyUpImage;

        // animations, sprites
        this.widthDuck = 37;
        this.heightDuck = 33;
        this.maxFrame = 2;
        this.animationForward = true;
        this.currentFrame = 0;
        this.currentRow = 0;
        this.duckDirection = 1;
        this.counter = 0;

        // fly path
        this.distanceTraveled = 0;
        this.wholeDistanceTraveled = 0;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.position.x + this.widthDuck/2, this.position.y + this.heightDuck/2);

        // If you will want change deegress when += pos.x is small or smth
        // if (this.angle) {
        //     this.ctx.rotate(this.angle * Math.PI / 180);
        // }

        if (this.duckDirection === -1) {
            this.ctx.scale(-1, 1);
        }


        this.ctx.translate(-(this.position.x + this.widthDuck/2), -(this.position.y + this.heightDuck/2));

        this.ctx.drawImage(
            this.ducksImage,
            this.widthDuck * Math.round(this.currentFrame),
            this.currentRow * this.heightDuck,
            this.widthDuck,
            this.heightDuck,
            this.position.x,
            this.position.y,
            this.widthDuck + 35,
            this.heightDuck + 35,
        );

        this.ctx.restore();
    }


    respawn() {
        this.position.y = this.gameHeight * 0.6;
        this.position.x = (Math.random() * 600) + 50;
    }

    flyUpAnimation(deltaTime) {
        this.ducksImage = this.ducksFlyUpImage;
        if (this.animationForward) {
            this.currentFrame += deltaTime / 100;
        }
        else {
            this.currentFrame -= deltaTime / 100;
        }

        // Change flag, now we can start animation dog from behind (3 frames 1->2->3->2->1->...)
        if (this.currentFrame > this.maxFrame) {
            this.animationForward = !this.animationForward;
            this.currentFrame = 2;
        } else if (this.currentFrame < 0) {
            this.animationForward = !this.animationForward;
            this.currentFrame = 0;
        }
    }

    beHitAnimation(deltaTime) {
        this.counter += deltaTime/200;

        if (this.counter < 6) {
            this.duckAlive = false;

            this.ducksImage = this.ducksFallImage;
            this.currentFrame = 0;
        } else {
            this.fallAnimation(deltaTime);
        }
    }

    fallAnimation(deltaTime) {
        this.counter += deltaTime/200;

        if (this.position.y > this.gameWidth * 0.7) {
            this.beHit = false;
            this.runDogPickUp = true;
        }

        if (Math.round(this.counter) % 2 === 0) this.currentFrame = 1;
        else this.currentFrame = 2;

        this.position.y += deltaTime/4;
    }

    toggleDuckDirection() {
        this.duckDirection = -this.duckDirection;
    }



    flyPath(deltaTime) {
        let changeXpos = deltaTime/6 * this.duckSpeed * this.directionX;
        let changeYpos = deltaTime/6 * this.duckSpeed * this.directionY;

        let changeDegOfDuck = (Math.random()) - 0.5;
        let distance = (Math.abs(changeXpos) + Math.abs(changeYpos)) / 2;

        this.position.x += changeXpos;
        this.position.y -= changeYpos;

        this.distanceTraveled += distance;
        this.wholeDistanceTraveled += distance;


        // colission with left or right wall
        if (this.position.x > this.gameWidth - this.widthDuck - 20 || this.position.x < 0) {
            this.directionX = -this.directionX;
            this.distanceTraveled -= 100;
            this.toggleDuckDirection();
        }


        // collision with top or bottom wall
        if (this.position.y < 5 || this.position.y > this.gameHeight * 0.6) {
            this.directionY = -this.directionY;
            this.distanceTraveled -= 100;
            // this.toggleDuckDirection();
        }

        if (this.distanceTraveled > 400 && Math.random() > 0.5) {

            this.distanceTraveled = 0;
            if (Math.random() > 0.3) {
                this.toggleDuckDirection();
                this.directionX = -this.directionX + changeDegOfDuck;
                if (Math.random() > 0.7) {
                    this.directionY = 0;

                } else {
                    this.directionY += changeDegOfDuck;
                }
            } else {
                this.directionY = -this.directionY + changeDegOfDuck;
                this.directionX += changeDegOfDuck;
            }
        }
    }

    update(deltaTime) {
        if (!deltaTime) return;

        if (this.beHit) {
            this.beHitAnimation(deltaTime);
        } else if (this.startRespawn) {
            this.respawn();

            this.duckAlive = true;

            this.startRespawn = false;
        }
        else if (this.duckAlive) {
            this.flyUpAnimation(deltaTime);
            this.flyPath(deltaTime);
        }


    }
}
