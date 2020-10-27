import './sass/index.scss';

import Game from "./components/Game"
import VolumeControl from "./components/VolumeControl";

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let background_game_image = document.querySelector('#background');

let grassImage = document.querySelector('#grass');

const GAME_WIDTH = 768;
const GAME_HEIGHT = 720;


let game = new Game(GAME_WIDTH, GAME_HEIGHT, ctx);
// let volume = new VolumeControl();

game.start();

let lastTime = 0;


document.addEventListener('DOMContentLoaded', function() {
    function gameLoop(timestamp) {
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.drawImage(background_game_image, 0, 0, GAME_WIDTH, GAME_HEIGHT);


        game.update(deltaTime);
        game.draw();

        // if (game.dog.drawGrass) {
        //     ctx.drawImage(grassImage, 0, 0, GAME_WIDTH, GAME_HEIGHT);
        // }

        requestAnimationFrame(gameLoop);
    }
    gameLoop(0);
})


