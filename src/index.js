import './sass/index.scss';

import Game from "./components/Game"
import LoadAssets from "./components/LoadAssets";


let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 768;
const GAME_HEIGHT = 720;

let loading = document.querySelector('.loading');


function startGame() {
    loading.classList.remove('visible');
    let background_game_image = document.querySelector('#background');
    game.start();

    let lastTime = 0;

    function gameLoop(timestamp) {
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.drawImage(background_game_image, 0, 0, GAME_WIDTH, GAME_HEIGHT);

        game.update(deltaTime);
        game.draw();

        requestAnimationFrame(gameLoop);
    }

    gameLoop(0);
}


let loadAssets = new LoadAssets(startGame);

loadAssets.loadImages();
let game = new Game(GAME_WIDTH, GAME_HEIGHT, ctx);

loadAssets.loadSounds();