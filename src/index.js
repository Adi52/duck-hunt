import './sass/index.scss';

import Dog from "./components/Dog";
import Duck from "./components/Duck";



let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let background_game_image = document.querySelector('#background');




const GAME_WIDTH = 768;
const GAME_HEIGHT = 720;



let dog = new Dog(GAME_WIDTH, GAME_HEIGHT, ctx);
let duck = new Duck(GAME_WIDTH, GAME_HEIGHT, ctx);

let lastTime = 0;

// canvas.addEventListener('click', () => {duck.respawn()});

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;



    ctx.drawImage(background_game_image, 0, 0, GAME_WIDTH, GAME_HEIGHT);
    dog.update(deltaTime);
    dog.draw();

    duck.update(deltaTime);
    duck.draw();



    requestAnimationFrame(gameLoop);
}
gameLoop(0);