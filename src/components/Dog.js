
export default class Dog {
    constructor(game) {
        // game properties
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.ctx = game.ctx;

        this.game = game;

        this.runIntro = false; // tu zmien jeżeli chesz intro!
        this.drawGrass = false;
        this.runPickUpAnimation = false;
        this.runLaughAnimation = false;

        // dog properties
        this.position = {
            x: -155,
            y: game.gameHeight * 0.6,
        }

        // images
        this.dogImage = document.querySelector('#dogImg');
        // this.grassImage = document.querySelector('#grass');

        // animations, sprites
        this.dogWidth = 57.2;
        this.dogHeight = 52;
        this.maxFrame = 4;
        this.currentFrame = 1;
        this.animationForward = true;
        this.sniffTimer = 0;
        this.sniffFlag = true;
        this.currentRow = 0;
        this.correction = 0;
        this.correctionRow = 0;
        this.dWidthCorrection = 0;
        this.pickUpDirection = 1;
        this.counter = 0;
        this.speed = 1;
    }

    resetPropertiesAfterRound() {
        // this.drawGrass = false;
        this.currentFrame = 1;
        this.correctionRow = 0;
        this.currentRow = 0;

        this.sniffFlag = true;

        this.position.x = -155;
        this.position.y = this.gameHeight * 0.6;

        this.correction = 0;
        this.dWidthCorrection = 0;
    }

    draw() {
        this.ctx.drawImage(
            this.dogImage,
            this.dogWidth * Math.round(this.currentFrame) + this.correctionRow,
            this.currentRow * this.dogHeight,
            this.dogWidth + this.correction,
            this.dogHeight,
            this.position.x,
            this.position.y,
            this.dogWidth + 100 + this.dWidthCorrection,
            this.dogHeight + 100,
        )
    }

    walking(deltaTime) {
        this.sniffTimer = 0;

        if (this.animationForward) this.currentFrame += deltaTime / 200;
        else this.currentFrame -= deltaTime / 200;

        // Change flag, now we can start animation dog from behind (3 frames 1->2->3->2->1->...)
        if (this.currentFrame > this.maxFrame) {
            this.currentFrame = 4;
            this.animationForward = !this.animationForward;
        } else if (this.currentFrame < 1) {
            this.currentFrame = 1;
            this.animationForward = !this.animationForward;

        }
    }

    jump(deltaTime) {
        this.currentRow = 1.13;
        this.currentFrame = 0;
        this.animationForward = true;
        this.sniffTimer += deltaTime;

        if (this.sniffTimer > 2000) {
            // Stop display intro after jump
            this.runIntro = false;
            this.correction = 0;
        } else if (this.sniffTimer > 1500) {
            // Wait 1500ms after sniff
            this.currentRow = 1;
            this.correction = -8.5;
            this.currentFrame = 1;
            this.position.x += 50 / deltaTime;
            this.position.y -= deltaTime * this.speed;
            if (this.position.y < 250) {
                this.speed = -this.speed;
                this.drawGrass = true;
            }
        }

    }

    sniff(deltaTime, jump = false) {
        // 850 cus we need 2 sniffs (1 sniff = 400ms);
        if (this.sniffTimer > 850) {
            if (jump) {
                this.jump(deltaTime);
                return;
            }
            this.sniffFlag = !this.sniffFlag;
            // reset animation
            this.currentFrame = 1;
            return;
        }
        this.sniffTimer += deltaTime;

        if (this.currentFrame > 1 || this.currentFrame < 0) {
            this.animationForward = !this.animationForward;
            this.currentFrame = 0;
        }

        if (this.animationForward) {
            this.currentFrame -= deltaTime/400;
        } else {
            this.currentFrame += deltaTime/400;
        }
    }

    laugh() {
        this.position.x = this.gameWidth/2 - this.dogWidth;
        this.position.y = this.gameHeight * 0.6;
        // this.position.y = this.gameHeight * 0.4;
        this.currentRow = 1;
        this.speed = 1;
        this.correction = -27;
        this.dWidthCorrection = -60;

        this.currentFrame = 5;
        this.correctionRow = -32;

        this.drawGrass = true;
        this.runLaughAnimation = true;
        this.runPickUpAnimation = true;
    }

    laughAnimation(deltaTime) {
        this.counter += deltaTime/200;

        if (Math.round(this.counter) % 2 === 0) {
            this.currentFrame = 5;
            this.correctionRow = -32;
        } else {
            this.currentFrame = 6;
            this.correctionRow = -59;
        }
    }

    pickUp(numberOfDucks, duckPosX) {
        // this.position.x = this.gameWidth/2 - this.dogWidth;
        this.position.x = duckPosX - (this.dogWidth + 100) / 2;
        this.position.y = this.gameHeight * 0.6;
        this.currentRow = 1;
        this.speed = 1;

        if (numberOfDucks === 1) {
            this.currentFrame = 3;
            this.correctionRow = -32;
        }

        if (numberOfDucks === 2) {
            this.currentFrame = 4;
            this.correctionRow = -32.8;
        }
        this.drawGrass = true;
        this.runPickUpAnimation = true;
    }

    pickUpAnimation(deltaTime) {

        if (this.position.y > this.gameHeight)
        {
            this.runPickUpAnimation = false;
            this.runLaughAnimation = false;

            // After pick up animation, new duck can fly up!
            this.canStartNextSubRound = true;
            this.pickUpDirection = -this.pickUpDirection;

        } else if (this.position.y < this.gameHeight*0.45) {

            this.pickUpDirection = -this.pickUpDirection ;
        }

        this.position.y -= deltaTime/5 * this.pickUpDirection;
    }

    intro(deltaTime) {
        if (this.position.x > 100 && this.sniffFlag) {
            // here dog pass tree and start sniff
            this.sniff(deltaTime);
        } else if (this.position.x > 250) {
            this.sniff(deltaTime, true)
        } else {
            // here we can set speed of the dog (x)
            this.walking(deltaTime);
            this.position.x += 15 / deltaTime;
        }
    }

    update(deltaTime) {
        if (!deltaTime) return;

        if (this.runIntro) {
            this.intro(deltaTime);
        } else if (this.runPickUpAnimation) {
            this.pickUpAnimation(deltaTime);
        }
        if (this.runLaughAnimation) {
            this.laughAnimation(deltaTime);
        }
    }
}