let controllerIndex = null;
window.addEventListener('gamepadconnected', function (e) {
    controllerIndex = e.gamepad.index;
});

window.addEventListener('gamepaddisconnected', function (e) {
    controllerIndex = null;
});

class Player {
    constructor(game) {
        this.game = game;
        this.width = 140;
        this.height = 120;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 5;
        this.lives = 3;
        this.maxLives = 10;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.maxFrame = 0;
        this.frameJetsX = 0;
        this.imageJets = document.getElementById('player_jets');
    }

    draw(context) {
        // context.fillRect(this.x, this.y, this.width, this.height);
        if (this.game.keys.indexOf(' ') > -1) {
            this.frameX = 1;
        } else {
            this.frameX = 0;
        }
        if (this.game.keys.indexOf('ArrowLeft') > -1) {
            this.frameJetsX = 0;
        } else if (this.game.keys.indexOf('ArrowRight') > -1) {
            this.frameJetsX = 2;
        } else {
            this.frameJetsX = 1;
        }
        context.drawImage(this.imageJets, this.frameJetsX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update() {
        // Horizontal Movement
        if (this.game.keys.indexOf('ArrowLeft') > -1) {
            this.x -= this.speed;
        }
        if (this.game.keys.indexOf('ArrowRight') > -1) {
            this.x += this.speed;
        }
        if (this.game.keys.indexOf('LeftPressed') > -1) {
            this.x -= this.speed;
            if (this.game.keys.indexOf('LeftPressed') > -1) {
                this.game.keys.splice(this.game.keys.indexOf('LeftPressed'), 1);
            }
        }
        if (this.game.keys.indexOf('RightPressed') > -1) {
            this.x += this.speed;
            if (this.game.keys.indexOf('RightPressed') > -1) {
                this.game.keys.splice(this.game.keys.indexOf('RightPressed'), 1);
            }
        }
        // Horizontal Boundaries
        if (this.x < -this.width * 0.5) {
            this.x = -this.width * 0.5;
        } else if (this.x > this.game.width - this.width * 0.5) {
            this.x = this.game.width - this.width * 0.5;
        }
    }

    shoot() {
        const projectile = this.game.getProjectile();
        if (projectile) {
            projectile.playSound();
            projectile.start(this.x + this.width * 0.5, this.y);
        }
        this.game.fired = false;
    }

    restart() {
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.lives = 3;
    }
}

class InputHandler {
    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && this.game.keys.indexOf(e.key) === -1 && !this.game.gameOver) {
                this.game.keys.push(e.key);
            }
            if (e.key === ' ' && !this.game.gameOver && !this.game.fired) {
                this.game.player.shoot();
            }
            this.game.fired = true;
            if (this.game.keys.indexOf(e.key) === -1) {
                this.game.keys.push(e.key);
            }
            if (e.key === 'd') {
                this.game.debug = !this.game.debug;
            }
            if ((e.key === 'r' || e.key === 'R') && this.game.gameOver) {
                this.game.restart();
            }
        });
        window.addEventListener('keyup', e => {
            this.game.fired = false;
            if (this.game.keys.indexOf(e.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
            }
        });
    }
}

class GamepadHandler {
    constructor(game) {
        this.game = game;
        // this.leftPressed = false;
        // this.rightPressed = false;
        // this.xPressed = false;
        // this.upPressed = false;
        // this.downPressed = false;

    }

    update() {
        if (controllerIndex !== null) {
            const gamepad = navigator.getGamepads()[controllerIndex];
            const buttons = gamepad.buttons;
            // for (let index = 0; index < buttons.length; index++) {
            //     const element = buttons[index];
            //     if (element.pressed) {
            //         console.log(index);
            //     }
            // }
            if (buttons[14].pressed && this.game.keys.indexOf('LeftPressed') === -1 && !this.game.gameOver) {
                this.game.keys.push('LeftPressed');
            }
            if (buttons[15].pressed && this.game.keys.indexOf('RightPressed') === -1 && !this.game.gameOver) {
                this.game.keys.push('RightPressed');
            }
            if (buttons[0].pressed && !this.game.gameOver && !this.game.fired) {
                this.game.fired = true;
                this.game.player.shoot();
            }
            if (buttons[9].pressed && this.game.gameOver) {
                this.game.restart();
            }
        }
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
        this.sound = new Audio();
        this.sound.src = 'assets/audios/laseShoot.wav';
    }
    draw(context) {
        if (!this.free) {
            context.save();
            context.fillStyle = 'gold';
            context.fillRect(this.x - this.width * 0.5, this.y, this.width, this.height);
            context.restore();
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
    playSound() {
        this.sound.play();
    }
}

class Enemy {
    constructor(game, positionX, positionY) {
        this.game = game;
        this.width = this.game.enemySize;
        this.height = this.game.enemySize;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        this.markedForDeletion = false;
    }

    draw(context) {
        // context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(x, y) {
        this.x = x + this.positionX;
        this.y = y + this.positionY;
        // check collision enemies - projectiles
        this.game.projectilesPool.forEach(projectile => {
            if (!projectile.free && this.game.checkCollision(this, projectile) && this.lives > 0) {
                this.hit(1);
                projectile.reset();
            }
        });
        if (this.lives < 1) {
            if (this.game.spriteUpdate) this.frameX++;
            if (this.frameX > this.maxFrame) {
                this.playSound();
                this.markedForDeletion = true;
                if (!this.game.gameOver) this.game.score += this.maxLives;
            }
        }
        // check collision enemies - player
        if (this.game.checkCollision(this, this.game.player) && this.lives > 0) {
            this.lives = 0;
            this.game.player.lives--;
        }
        // lose condition
        if (this.y + this.height > this.game.height || this.game.player.lives < 1) {
            this.game.gameOver = true;
        }
    }
    hit(damage) {
        this.lives -= damage;
    }
    playSound() {
        this.sound.play();
    }
}

class Beetlemorph extends Enemy {
    constructor(game, positionX, positionY) {
        super(game, positionX, positionY);
        this.image = document.getElementById('beetlemorph');
        this.frameX = 0;
        this.maxFrame = 2;
        this.frameY = Math.floor(Math.random() * 4);
        this.lives = 1;
        this.maxLives = this.lives;
        this.sound = new Audio();
        this.sound.src = 'assets/audios/smokeExplosion.wav';
    }
}

class Rhinomorph extends Enemy {
    constructor(game, positionX, positionY) {
        super(game, positionX, positionY);
        this.image = document.getElementById('rhinomorph');
        this.frameX = 0;
        this.maxFrame = 5;
        this.frameY = Math.floor(Math.random() * 4);
        this.lives = 4;
        this.maxLives = this.lives;
        this.sound = new Audio();
        this.sound.src = 'assets/audios/smokeExplosion.wav';
    }
    hit(damage) {
        this.lives -= damage;
        this.frameX = this.maxLives - Math.floor(this.lives);
    }
}

class Wave {
    constructor(game) {
        this.game = game;
        this.width = this.game.columns * this.game.enemySize;
        this.height = this.game.rows * this.game.enemySize;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = -this.height;
        this.speedX = Math.random() < 0.5 ? -1 : 1;
        this.speedY = 0;
        this.enemies = [];
        this.nextWaveTrigger = false;
        this.create();
    }
    draw(context) {
        this.enemies.forEach(enemy => {
            enemy.draw(context);
        });
    }
    update() {
        if (this.y < 0) this.y += 5;

        this.speedY = 0;
        if (this.x < 0 || this.x > this.game.width - this.width) {
            this.speedX *= -1;
            this.speedY = this.game.enemySize;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.enemies.forEach(enemy => {
            enemy.update(this.x, this.y);
        });
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
    }
    create() {
        for (let y = 0; y < this.game.rows; y++) {
            for (let x = 0; x < this.game.columns; x++) {
                let enemyX = x * this.game.enemySize;
                let enemyY = y * this.game.enemySize;
                if (Math.random() < 0.5) {
                    this.enemies.push(new Beetlemorph(this.game, enemyX, enemyY));
                } else {
                    this.enemies.push(new Rhinomorph(this.game, enemyX, enemyY));
                }
            }
        }
    }
}

class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 25;
        this.fontFamily = 'Bangers';
        this.color = 'white';
    }

    draw(context) {
        context.save();

        context.fillStyle = this.color;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillText('Score: ' + this.game.score, 20, 40);
        context.fillText('Wave: ' + this.game.waveCount, 20, 80);

        for (let index = 0; index < this.game.player.maxLives; index++) {
            context.strokeRect(20 + 20 * index, 100, 10, 15);
        }
        for (let index = 0; index < this.game.player.lives; index++) {
            context.fillRect(20 + 20 * index, 100, 10, 15);
        }

        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = '70px ' + this.fontFamily;
            context.fillText('GAME OVER!!!', this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = '20px ' + this.fontFamily;
            context.fillText('Press R to restart!', this.game.width * 0.5, this.game.height * 0.5 + 20);
        }

        context.restore();
    }
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
        this.columns = 2;
        this.rows = 2;
        this.enemySize = 80;
        this.waves = [];
        this.waves.push(new Wave(this));
        this.ui = new UI(this);
        this.score = 0;
        this.gameOver = false;
        this.waveCount = 1;
        this.fired = false;
        this.spriteUpdate = false;
        this.spriteTimer = 0;
        this.spriteInterval = 200;
        this.sound = new Audio();
        this.sound.src = 'assets/audios/background.mp3';
        this.sound.loop = true;
        this.isMusic = true;
        this.gamepad = new GamepadHandler(this);
    }

    draw(context) {
        this.projectilesPool.forEach(projectile => {
            projectile.draw(context);
        });
        this.player.draw(context);
        this.waves.forEach(wave => {
            wave.draw(context);
        });
        this.ui.draw(context);
    }

    update(deltaTime) {
        if (this.isMusic) {
            this.sound.play();
        } else {
            this.sound.pause();
        }
        // sprite timing
        if (this.spriteTimer > this.spriteInterval) {
            this.spriteUpdate = true;
            this.spriteTimer = 0;
        } else {
            this.spriteUpdate = false;
            this.spriteTimer += deltaTime;
        }
        this.gamepad.update();
        this.player.update();
        this.projectilesPool.forEach(projectile => {
            projectile.update();
        });
        this.waves.forEach(wave => {
            wave.update();
            if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver) {
                this.newWave();
                this.waveCount++;
                wave.nextWaveTrigger = true;
                if (this.player.lives < this.player.maxLives) this.player.lives++;
            }
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
    // collision detection between 2 rectangles
    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y
        );
    }
    // new Wave
    newWave() {
        if (Math.random() < 0.5 && this.columns * this.enemySize < this.width * 0.8) {
            this.columns++;
        } else if (this.rows * this.enemySize < this.height * 0.6) {
            this.rows++;
        }
        this.waves.push(new Wave(this));
    }
    // restart
    restart() {
        this.player.restart();
        this.columns = 2;
        this.rows = 2;
        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = 1;
        this.score = 0;
        this.gameOver = false;
    }
}

window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = window.innerHeight - window.innerHeight * 0.05;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';

    const game = new Game(canvas);
    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        game.draw(ctx);
        game.update(deltaTime);
        requestAnimationFrame(animate);
    }

    animate(0);
});