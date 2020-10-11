
export default class Dog {
    constructor(gameWidth, gameHeight, ctx) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.position = {
            x: -150,
            y: gameHeight * 0.6,
        }
        this.ctx = ctx;

        this.dogImage = document.querySelector('#dogImg');
        this.grassImage = document.querySelector('#grass');

        this.drawGrass = false;

        this.dogWidth = 57.2;
        this.dogHeight = 52;
        this.maxFrame = 4;
        this.currentFrame = 1;

        this.animationForward = true;

        this.sniffTimer = 0;
        this.sniffFlag = true;

        this.currentRow = 0;
        this.correction = 0;

        this.speed = 1;

    }

    draw() {
        this.ctx.drawImage(
            this.dogImage,
            this.dogWidth * Math.round(this.currentFrame),
            this.currentRow * this.dogHeight,
            this.dogWidth + this.correction,
            this.dogHeight,
            this.position.x,
            this.position.y,
            this.dogWidth + 100,
            this.dogHeight + 100,
        )
        if (this.drawGrass) {
            // add grass image when dog is ending jump. Its like index-z: 1;
            this.ctx.drawImage(this.grassImage, 0, 0, this.gameWidth, this.gameHeight);
        }
    }

    walking(deltaTime) {
        this.sniffTimer = 0;

        if (this.animationForward) this.currentFrame += deltaTime / 200;
        else this.currentFrame -= deltaTime / 200;

        // Change flag, now we can start animation dog from behind (3 frames 1->2->3->2->1->...)
        if (this.currentFrame > this.maxFrame || this.currentFrame < 1) {
            this.animationForward = !this.animationForward;
        }
    }

    jump(deltaTime) {
        this.currentRow = 1.13;
        this.currentFrame = 0;
        this.animationForward = true;
        this.sniffTimer += deltaTime;
        if (this.sniffTimer > 1500) {
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

    update(deltaTime) {
        // fix deltaTime = 0 (we cant divide bt zero)
        if (!deltaTime) return;

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
}