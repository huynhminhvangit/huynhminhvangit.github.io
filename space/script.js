/** @type {HTMLCanvasElement} */

class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 5;
    }

    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        // Horizontal Movement
        if (this.game.keys.indexOf('ArrowLeft') > -1) {
            this.x -= this.speed;
        }
        if (this.game.keys.indexOf('ArrowRight') > -1) {
            this.x += this.speed;
        }
        // Horizontal Boundaries
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }
    }

    shoot() {
        const projectile = this.game.getProjectile();
        if (projectile) {
            projectile.start(this.x + this.width * 0.5, this.y);
        }
    }
}


class InputHandler {
    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && this.game.keys.indexOf(e.key) === -1) {
                this.game.keys.push(e.key);
            } else if (e.key === ' ') {
                this.game.player.shoot();
            } else if (e.key === 'd') {
                this.game.debug = !this.game.debug;
            }
        });
        window.addEventListener('keyup', e => {
            if (this.game.keys.indexOf(e.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
            }
        });
    }
}

class Projectile {
    constructor() {
        this.width = 4;
        this.height = 20;
        this.x = 0;
        this.y = 0;
        this.speed = 20;
        this.free = true;
    }

    draw(context) {
        if (!this.free) {
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    update() {
        if (!this.free) {
            this.y -= this.speed;
            if (this.y < -this.height) {
                this.reset();
            }
        }
    }

    start(x, y) {
        this.x = x;
        this.y = y;
        this.free = false;
    }

    reset() {
        this.free = true;
    }
}

class Enemy {

}

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.debug = false;
        this.player = new Player(this);
        this.inputHandler = new InputHandler(this);
        this.keys = [];
        this.projectilesPool = [];
        this.numberOfProjectiles = 10;
        this.createProjectiles();
    }

    draw(context) {
        this.player.draw(context);
        this.projectilesPool.forEach(projectile => {
            projectile.draw(context);
        });
    }

    update() {
        this.player.update();
        this.projectilesPool.forEach(projectile => {
            projectile.update();
        });
    }

    // create projectiles object pool
    createProjectiles() {
        for (let index = 0; index < this.numberOfProjectiles; index++) {
            this.projectilesPool.push(new Projectile());
        }
    }
    // get free projectile object from the pool
    getProjectile() {
        for (let index = 0; index < this.projectilesPool.length; index++) {
            if (this.projectilesPool[index].free) {
                return this.projectilesPool[index];
            }
        }
    }
}

window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 480;
    canvas.height = 600;

    const game = new Game(canvas);

    function animate() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        game.draw(ctx);
        game.update();
        requestAnimationFrame(animate);
    }

    animate();
});