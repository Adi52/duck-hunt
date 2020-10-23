export default class Duck {
    constructor(game) {
        // game properties
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.ctx = game.ctx;

        this.game = game;

        // duck properties
        this.beHit = false;
        this.duckAlive = false;
        this.startRespawn = false;
        this.directionX = (Math.random() * 1.3) + 0.9;
        this.directionY = (Math.random() * 1.3) + 0.9;
        this.duckSpeed = 1;
        this.points = 500;
        this.position = {
            x: this.gameWidth,
            y: this.gameHeight,
        };
        this.flyAwayNow = false;

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
        this.counterBeHit = 0;

        // fly path
        this.distanceTraveled = 0;
        this.wholeDistanceTraveled = 0;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.position.x + this.widthDuck / 2, this.position.y + this.heightDuck / 2);

        // If you will want change deegress when += pos.x is small or smth
        // if (this.angle) {
        //     this.ctx.rotate(this.angle * Math.PI / 180);
        // }

        if (this.duckDirection === -1) {
            this.ctx.scale(-1, 1);
        }


        this.ctx.translate(-(this.position.x + this.widthDuck / 2), -(this.position.y + this.heightDuck / 2));

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
        this.position.y = this.gameHeight * 0.6 - 20;
        this.position.x = (Math.random() * 600) + 50;
        this.directionY = (Math.random() * 1.3) + 0.9;
    }

    flyUpAnimation(deltaTime) {
        this.ducksImage = this.ducksFlyUpImage;
        if (this.animationForward) {
            this.currentFrame += deltaTime / 100;
        } else {
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
        this.counterBeHit += deltaTime / 200;

        if (this.counterBeHit < 6) {
            this.duckAlive = false;

            this.ducksImage = this.ducksFallImage;
            this.currentFrame = 0;
        } else {
            this.fallAnimation(deltaTime);
        }
    }

    fallAnimation(deltaTime) {
        this.counter += deltaTime / 200;

        if (this.position.y > this.gameWidth) {
            this.beHit = false;

            this.counterBeHit = 0;
            this.runDogPickUp = true;
        }

        if (Math.round(this.counter) % 2 === 0) this.currentFrame = 1;
        else this.currentFrame = 2;

        this.position.y += deltaTime / 3;
    }

    flyAway(deltaTime) {
        this.position.y -= deltaTime / 2;

        // red sky
        this.ctx.fillStyle = 'rgba(207, 38, 8, 0.6)';
        this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

        if (this.position.y < -100) {
            this.flyAwayNow = false;
            this.game.canFlyAway = false;

            // this.game.dog.canStartNextSubRound = true;

            this.game.dog.laugh();
        }
    }

    changePositionOfDuck(deltaTime) {
        let changeXpos = deltaTime / 6 * this.duckSpeed * this.directionX;
        let changeYpos = deltaTime / 6 * this.duckSpeed * this.directionY;

        let distance = (Math.abs(changeXpos) + Math.abs(changeYpos)) / 2;

        this.position.x += changeXpos;
        this.position.y -= changeYpos;
        this.distanceTraveled += distance;

        if (!this.game.dog.runIntro) {
            this.wholeDistanceTraveled += distance;
        }

    }

    detectCollisionWithWalls() {
        // collision with left or right wall
        if (this.position.x > this.gameWidth - this.widthDuck - 20 || this.position.x < 0) {
            this.directionX = -this.directionX;
            this.distanceTraveled -= 100;
            this.duckDirection = -this.duckDirection;

            if (!(this.position.x > this.gameWidth - this.widthDuck - 20)) {
                // Thanks it we can repair bug with bounded duck (in window edges).
                this.position.x = 1;
            } else {
                this.position.x = this.gameWidth - this.widthDuck - 19;
            }
        }

        // collision with top or bottom wall
        if ((this.position.y < 5 || this.position.y > this.gameHeight * 0.6) && !this.flyAwayNow) {
            this.directionY = -this.directionY;
            this.distanceTraveled -= 100;
        }
    }

    randomDuckPath() {
        let changeDegOfDuck = (Math.random()) - 0.5;

        if (this.distanceTraveled > 400 && Math.random() > 0.5) {
            this.distanceTraveled = 0;
            if (Math.random() > 0.3) {
                this.duckDirection = -this.duckDirection;

                this.directionX = -this.directionX + changeDegOfDuck;
                if (Math.random() > 0.7 && this.position.y < this.gameHeight * 0.4) {
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

    flyPath(deltaTime) {
        this.changePositionOfDuck(deltaTime)
        this.detectCollisionWithWalls();
        this.randomDuckPath();
        if (this.wholeDistanceTraveled > 2500) {
            this.game.loseSubRound();
        }
    }

    update(deltaTime) {
        if (!deltaTime) return;

        if (this.beHit) {
            this.beHitAnimation(deltaTime);
        } else if (this.flyAwayNow) {
            this.flyAway(deltaTime);
            this.flyUpAnimation(deltaTime);
        } else if (this.startRespawn) {
            this.respawn();

            this.duckAlive = true;
            this.startRespawn = false;
        } else if (this.duckAlive) {
            this.flyUpAnimation(deltaTime);
            this.flyPath(deltaTime);
        }
    }
}
