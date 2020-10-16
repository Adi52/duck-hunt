
export default class Input {
    constructor(game, canvas) {
        canvas.addEventListener("mousedown", (event) => {
            let rect = canvas.getBoundingClientRect();
            this.mouseX = event.clientX - rect.left;
            this.mouseY = event.clientY - rect.top;
            game.gameStats.shoot++;
            console.log(game.gameStats.shoot);
        })
    }
}