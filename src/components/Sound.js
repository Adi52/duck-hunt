
export default class Sound {
    constructor(src, loop = false) {
        this.sound = document.createElement("audio");
        this.sound.src = 'audio/' + src;
        // this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        if (loop) {
            this.sound.loop = true;
        }
        this.sound.volume = 0.05;
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    play = function () {
        this.sound.play();
    }

    stop = function () {
        this.sound.pause();
        this.sound.currentTime = 0;
    }
}