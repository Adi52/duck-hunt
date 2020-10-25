
export default class Sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = 'audio/' + src;
        // this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.volume = 0.1;
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    play = function () {
        this.sound.play();
    }

    stop = function () {
        this.sound.pause();
    }
}