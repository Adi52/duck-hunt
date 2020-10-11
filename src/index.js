import './sass/index.scss';

import Dog from "./components/Dog";




let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let background_game_image = document.querySelector('#background');

const GAME_WIDTH = 768;
const GAME_HEIGHT = 720;


let dog = new Dog(GAME_WIDTH, GAME_HEIGHT, ctx);

dog.draw(ctx);

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;


    ctx.drawImage(background_game_image, 0, 0, GAME_WIDTH, GAME_HEIGHT);
    dog.update(deltaTime);
    dog.draw();



    requestAnimationFrame(gameLoop);
}
gameLoop(0);