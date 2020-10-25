import Sound from "./Sound";

export default class Sounds {
    constructor() {
        this.start = new Sound('start.mp3');
        this.intro = new Sound('intro.mp3');
        this.duckFlapping = new Sound('duck-flapping.mp3');
        this.gunShot= new Sound('gun-shot.mp3');
    }
}
