
export default class VolumeControl {
    constructor() {
        this.sounds = document.getElementsByTagName('audio');
        this.volumeDown = document.querySelector('.fa-volume-down');
        this.volumeUp = document.querySelector('.fa-volume-up');
        this.volumeMute = document.querySelector('.fa-volume-mute');

        this.volumeDown.addEventListener('click', this.volumeDownFun);
        this.volumeUp.addEventListener('click', this.volumeUpFun);
        this.volumeMute.addEventListener('click', this.volumeMuteFun);

    }

    volumeMuteFun() {
        this.sounds = document.getElementsByTagName('audio');
        document.querySelector('.fa-volume-mute').classList.toggle('active');
        for (let item of this.sounds) {
            if (item.volume === 0) {
                item.volume = 0.05;
            } else {
                item.volume = 0;
            }
        }
    }

    volumeUpFun() {
        this.sounds = document.getElementsByTagName('audio');
        for (let item of this.sounds) {
            if (item.volume < 0.98) {
                item.volume += 0.05;
            }
        }
    }

    volumeDownFun() {
        this.sounds = document.getElementsByTagName('audio');
        for (let item of this.sounds) {
            if (item.volume >= 0.02) {
                item.volume -=0.02;
            }
        }
    }
}