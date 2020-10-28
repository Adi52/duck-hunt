
export default class LoadAssets {
    constructor(startGameFun) {
        this.startGameFun = startGameFun;
        this.soundsReady = false;
        this.imagesReady = false;

        this.imagesSrc = [
            'big_button.png',
            'dog.png',
            'duck_fall.png',
            'duck_fly_up.png',
            'game_board.png',
            'game_board_grass.png',
            'logo.png',
            'shot.png',
            'small_button.png',
            'subround_duck_red.png',
            'subround_duck_white.png',
        ];

        this.imagesId = [
            'big_button',
            'dogImg',
            'ducksFall',
            'ducksFlyUpImg',
            'background',
            'grass',
            'logo',
            'shot',
            'small_button',
            'subround_duck_red',
            'subround_duck_white'
        ];

        this.counter = 0;
    }

    loadImages() {
        let n,name,
            result = {},
            count  = this.imagesSrc.length,
            onload = () => {
                if (--count === 0)
                {
                    this.canStartGame();
                }
            };

        for(n = 0 ; n < this.imagesSrc.length ; n++) {
            name = this.imagesSrc[n];
            result[name] = document.createElement('img');
            result[name].id = this.imagesId[n];
            result[name].addEventListener('load', onload);
            result[name].src = "images/" + name;
            document.body.appendChild(result[name]);
        }
    }

    loadSounds() {
        const sounds = document.getElementsByTagName('audio');
        let count = sounds.length;
        const canplay = () => {
            if (--count === 0) {
                this.canStartGame();
            }
        };

        for (let item of sounds) {
            item.addEventListener('canplaythrough', canplay, false);
        }
    }

    canStartGame() {
        this.counter++;
        if (this.counter === 2) {
            setTimeout(() => this.startGameFun(), 5000);
        }
    }
}