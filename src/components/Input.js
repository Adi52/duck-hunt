
export default class Input {
    constructor(canvas) {
        this.canvas = canvas;
    }

    getMousePosition() {
        this.canvas.addEventListener("mousedown", (event) => {
            let rect = this.canvas.getBoundingClientRect();
            this.mouseX = event.clientX - rect.left;
            this.mouseY = event.clientY - rect.top;
        })
    }
}