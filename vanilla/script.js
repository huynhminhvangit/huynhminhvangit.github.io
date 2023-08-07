/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const audio = new Audio();
audio.src = 'assets/audios/nature.wav';
audio.loop = true;
let isDrawing = false;
ctx.lineWidth = 1;
// ctx.globalCompositeOperation = 'destination-over';

class Root {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.maxSize = Math.random() * 7 + 5;
        this.size = Math.random() * 1 + 2;
        this.vs = Math.random() * 0.2 + 0.05;
        this.angleX = Math.random() * 6.2;
        this.vaX = Math.random() * 0.6 - 0.3;
        this.angleY = Math.random() * 6.2;
        this.vaY = Math.random() * 0.6 - 0.3;
        this.lightness = 10;
    }

    update() {
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.size += this.vs;
        this.angleX += this.vaX;
        this.angleY += this.vaY;
        if (this.lightness < 70) {
            this.lightness += 0.5;
        }
        if (this.size < this.maxSize) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'hsl(140, 100%, ' + this.lightness + '%)';
            ctx.fill();
            ctx.stroke();
            requestAnimationFrame(this.update.bind(this))
        } else {
            const flower = new Flower(this.x, this.y, this.size);
            flower.grow();
        }
    }
}

class Flower {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vs = Math.random() * 0.3 + 0.2;
        this.maxFlowerSize = this.size + Math.random() * 100;
        this.image = new Image();
        this.image.src = 'assets/images/flowers.png';
        this.frameSize = 100;
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.size > 11.5 ? this.willFlower = true : this.willFlower = false;
        this.angle = 0;
        this.va = Math.random() * 0.05 - 0.025;
    }
    grow() {
        if (this.size < this.maxFlowerSize && this.willFlower) {
            this.size += this.vs;
            this.angle += this.va;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.drawImage(this.image, this.frameX * this.frameSize, this.frameY * this.frameSize, this.frameSize, this.frameSize, 0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
            ctx.restore();
            requestAnimationFrame(this.grow.bind(this));
        }
    }
}

window.addEventListener('mousemove', function (e) {
    if (isDrawing) {
        for (let index = 0; index < 3; index++) {
            const root = new Root(e.x, e.y);
            root.update();
        }
    }
});

window.addEventListener('mousedown', function (e) {
    isDrawing = true;
    audio.play();
    for (let index = 0; index < 33; index++) {
        const root = new Root(e.x, e.y);
        root.update();
    }
});

window.addEventListener('mouseup', function (e) {
    isDrawing = false;
});

window.addEventListener('keydown', e => {
    if (e.key === 'r') {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
});