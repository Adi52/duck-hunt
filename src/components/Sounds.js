import Sound from "./Sound";

export default class Sounds {
    constructor() {
        this.start = new Sound('start.mp3');

        this.intro = new Sound('intro.mp3');

        this.duckFlapping = new Sound('duck-flappingg.mp3', true);
        this.duckFalling = new Sound('duck-falling.mp3');
        this.duckDrop = new Sound('duck-drop.mp3');

        this.duckCaught = new Sound('duck-caught.mp3');
        this.gunShot= new Sound('gun-shot.mp3');

        this.dogLaugh = new Sound('dog-laughing.mp3');

        this.gameOver = new Sound('game-over.mp3');
    }
}
