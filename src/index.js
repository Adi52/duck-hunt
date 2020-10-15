import './sass/index.scss';

import Game from "./components/Game"
import Input from "./components/Input";


let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let background_game_image = document.querySelector('#background');


const GAME_WIDTH = 768;
const GAME_HEIGHT = 720;


let game = new Game(GAME_WIDTH, GAME_HEIGHT, ctx)
game.start();

let lastTime = 0;

// canvas.addEventListener('click', () => {duck.respawn()});



function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.drawImage(background_game_image, 0, 0, GAME_WIDTH, GAME_HEIGHT);


    game.update(deltaTime);
    game.draw();

    requestAnimationFrame(gameLoop);
}
gameLoop(0);