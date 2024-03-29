let controllerIndex = null;
window.addEventListener('gamepadconnected', function (e) {
  controllerIndex = e.gamepad.index;
});

window.addEventListener('gamepaddisconnected', function (e) {
  controllerIndex = null;
});

window.addEventListener('load', function () {
  // canvas setup
  const canvas = this.document.getElementById('mainPlay');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener('keydown', e => {
        if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && this.game.keys.indexOf(e.key) === -1) {
          this.game.keys.push(e.key);
        } else if (e.key === ' ' && !this.game.gameOver && !this.game.fired) {
          this.game.fired = true;
          this.game.player.shootTop();
        } else if (e.key === 'd') {
          this.game.debug = !this.game.debug;
        } else if ((e.key === 'r' || e.key === 'R') && this.game.gameOver) {
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
      this.upPressed = false;
      this.downPressed = false;
      this.greenPressed = false;
      this.bluePressed = false;
      this.redPressed = false;
      this.yellowPressed = false;
      this.startPressed = false;
    }

    update() {
      if (controllerIndex !== null) {
        const gamepad = navigator.getGamepads()[controllerIndex];
        const buttons = gamepad.buttons;
        for (let index = 0; index < buttons.length; index++) {
          const button = buttons[index];
          // if (button.pressed) {
          //     console.log(index);
          // }
          switch (index) {
            case 0:
              this.greenPressed = button.pressed;
              break;
            case 1:
              this.redPressed = button.pressed;
              break;
            case 2:
              this.bluePressed = button.pressed;
              break;
            case 3:
              this.yellowPressed = button.pressed;
              break;
            case 4:
              break;
            case 5:
              break;
            case 6:
              break;
            case 7:
              break;
            case 8:
              break;
            case 9:
              this.startPressed = button.pressed;
              break;
            case 10:
              break;
            case 11:
              break;
            case 12:
              this.upPressed = button.pressed;
              break;
            case 13:
              this.downPressed = button.pressed;
              break;
            case 14:
              // this.leftPressed = button.pressed;
              break;
            case 15:
              // this.rightPressed = button.pressed;
              break;
            case 16:
              break;
            case 17:
              break;
            default:
              break;
          }
        }
        const stickDeadZone = 0.4;
        const upDownAxesOneValue = gamepad.axes[1];
        const upDownAxesTwoValue = gamepad.axes[3];
        if (upDownAxesOneValue >= stickDeadZone) {
          this.downPressed = true;
        } else if (upDownAxesOneValue <= -stickDeadZone) {
          this.upPressed = true;
        }
        if (upDownAxesTwoValue >= stickDeadZone) {
          this.downPressed = true;
        } else if (upDownAxesTwoValue <= -stickDeadZone) {
          this.upPressed = true;
        }

        if (this.upPressed && this.game.keys.indexOf('UpPressed') === -1 && !this.game.gameOver) {
          this.game.keys.push('UpPressed');
        } else if (!this.upPressed && this.game.keys.indexOf('UpPressed') > -1 && !this.game.gameOver) {
          this.game.keys.splice(this.game.keys.indexOf('UpPressed'), 1);
        }
        if (this.downPressed && this.game.keys.indexOf('DownPressed') === -1 && !this.game.gameOver) {
          this.game.keys.push('DownPressed');
        } else if (!this.downPressed && this.game.keys.indexOf('DownPressed') > -1 && !this.game.gameOver) {
          this.game.keys.splice(this.game.keys.indexOf('DownPressed'), 1);
        }
        if (this.greenPressed && !this.game.gameOver && !this.game.fired) {
          this.game.fired = true;
          this.game.player.shootTop();
        } else if (!this.greenPressed && !this.game.gameOver && this.game.fired) {
          this.game.fired = false;
        }
        if (this.startPressed && this.game.gameOver) {
          this.game.restart();
        }
      }
    }
  }

  class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 26;
      this.height = 8;
      this.speed = 3;
      this.markedForDeletion = false;
      this.image = document.getElementById('projectile');
      this.sound = new Audio();
      this.sound.src = 'assets/audios/laseShoot.wav';
    }

    update() {
      this.x += this.speed;
      if (this.x > this.game.width * 1.2) this.markedForDeletion = true;
    }

    draw(context) {
      // context.fillStyle = 'yellow';
      if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.x, this.y);
    }

    playSound() {
      this.sound.play();
    }
  }

  class Particle {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.image = document.getElementById('gears');
      this.frameX = Math.floor(Math.random() * 3);
      this.frameY = Math.floor(Math.random() * 3);
      this.spriteSize = 50;
      this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);
      this.size = this.spriteSize * this.sizeModifier;
      this.speedX = Math.random() * 6 - 3;
      this.speedY = Math.random() * -15;
      this.gravity = 0.5;
      this.markedForDeletion = false;
      this.angle = 0;
      this.va = Math.random() * 0.2 - 0.1;
      this.bounced = 0;
      this.bottomBounceBoundary = Math.random() * 80 + 60;
    }

    update() {
      this.angle += this.va;
      this.speedY += this.gravity;
      this.x -= this.speedX - this.game.speed;
      this.y += this.speedY;
      if (this.y > this.game.height + this.size || this.x < 0 - this.size) {
        this.markedForDeletion = true;
      }
      if (this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 5) {
        this.bounced++;
        this.speedY *= -0.7;
      }
    }

    draw(context) {
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.angle);
      context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
      context.restore();
    }
  }

  class Player {
    constructor(game) {
      this.game = game;
      this.width = 120;
      this.height = 190;
      this.x = 20;
      this.y = 100;
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 37;
      this.speedY = 0;
      this.maxSpeed = 3;
      this.projectiles = [];
      this.image = document.getElementById('player');
      this.powerUp = false;
      this.powerUpTimer = 0;
      this.powerUpLimit = 10000;
    }

    update(deltaTime) {
      if (this.game.keys.includes('ArrowUp') || this.game.keys.includes('UpPressed')) this.speedY = -this.maxSpeed;
      else if (this.game.keys.includes('ArrowDown') || this.game.keys.includes('DownPressed')) this.speedY = this.maxSpeed;
      else this.speedY = 0;
      this.y += this.speedY;
      // vertical boundaries
      if (this.y > this.game.height - this.height * 0.5) {
        this.y = this.game.height - this.height * 0.5;
      } else if (this.y < -this.height * 0.5) {
        this.y = -this.height * 0.5;
      }
      // handle projectiles
      this.projectiles.forEach(projectile => {
        projectile.update();
      });

      this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
      // sprite animation
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
      // Power up
      if (this.powerUp) {
        if (this.powerUpTimer > this.powerUpLimit) {
          this.powerUpTimer = 0;
          this.powerUp = false;
          this.frameY = 0;
        } else {
          this.powerUpTimer += deltaTime;
          this.frameY = 1;
          this.game.ammo += 0.1;
        }
      }

    }

    draw(context) {
      if (!this.game.gameOver) {
        // context.fillStyle = 'black';
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        // handle projectiles
        this.projectiles.forEach(projectile => {
          projectile.draw(context);
        });
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
      }
    }

    shootTop() {
      if (this.game.ammo > 0) {
        const p = new Projectile(this.game, this.x + 80, this.y + 30);
        p.playSound();
        this.projectiles.push(p);
        this.game.ammo--;
      }
      if (this.powerUp) {
        this.shootBottom();
      }
    }

    shootBottom() {
      if (this.game.ammo > 0) {
        this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 175));
      }
    }

    enterPowerUp() {
      this.powerUpTimer = 0;
      this.powerUp = true;
      if (this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.x = this.game.width;
      this.speedX = Math.random() * -1.5 - 0.5;
      this.markedForDeletion = false;
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 37;

    }

    update() {
      if (this.game.gameOver) {
        this.markedForDeletion = true;
      } else {
        this.x += this.speedX - this.game.speed;
      }
      if (this.x + this.width < 0) this.markedForDeletion = true;
      // sprite animation
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    }

    draw(context) {
      // context.fillStyle = 'red';
      if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
      // context.fillStyle = 'white';
      context.font = '20px Helvetica';
      if (this.game.debug) context.fillText(this.lives, this.x, this.y);
    }
  }

  class Angler1 extends Enemy {
    constructor(game) {
      super(game);
      this.width = 228;
      this.height = 169;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);
      this.image = document.getElementById('angler1');
      this.frameY = Math.floor(Math.random() * 3);
      this.lives = 5;
      this.score = this.lives;
    }
  }

  class Angler2 extends Enemy {
    constructor(game) {
      super(game);
      this.width = 213;
      this.height = 165;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);
      this.image = document.getElementById('angler2');
      this.frameY = Math.floor(Math.random() * 2);
      this.lives = 6;
      this.score = this.lives;
    }
  }

  class LuckyFish extends Enemy {
    constructor(game) {
      super(game);
      this.width = 99;
      this.height = 95;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);
      this.image = document.getElementById('lucky');
      this.frameY = Math.floor(Math.random() * 2);
      this.lives = 5;
      this.score = 15;
      this.type = 'lucky';
    }
  }

  class HiveWhale extends Enemy {
    constructor(game) {
      super(game);
      this.width = 400;
      this.height = 227;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);
      this.image = document.getElementById('hivewhale');
      this.frameY = 0;
      this.lives = 20;
      this.score = this.lives;
      this.type = 'hive';
      this.speedX = Math.random() * -1.2 - 0.2;
    }
  }

  class Drone extends Enemy {
    constructor(game, x, y) {
      super(game);
      this.width = 115;
      this.height = 95;
      this.x = x;
      this.y = y;
      this.image = document.getElementById('drone');
      this.frameY = Math.floor(Math.random() * 2);
      this.lives = 3;
      this.score = this.lives;
      this.type = 'drone';
      this.speedX = Math.random() * -4.2 - 0.5;
    }
  }

  class Layer {
    constructor(game, image, speedModifier) {
      this.game = game;
      this.image = image;
      this.speedModifier = speedModifier;
      this.width = this.game.width;
      this.height = this.game.height;
      this.x = 0;
      this.y = 0;
    }

    update() {
      if (this.x <= -this.width) this.x = 0;
      this.x -= this.game.speed * this.speedModifier;
    }

    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
  }

  class Background {
    constructor(game) {
      this.game = game;
      this.image1 = document.getElementById('layer1');
      this.image2 = document.getElementById('layer2');
      this.image3 = document.getElementById('layer3');
      this.image4 = document.getElementById('layer4');
      this.layer1 = new Layer(this.game, this.image1, 0.2);
      this.layer2 = new Layer(this.game, this.image2, 0.4);
      this.layer3 = new Layer(this.game, this.image3, 1);
      this.layer4 = new Layer(this.game, this.image4, 1.5);
      this.layers = [];
      this.layers.push(this.layer1);
      this.layers.push(this.layer2);
      this.layers.push(this.layer3);
    }

    update() {
      this.layers.forEach(layer => {
        layer.update();
      });
    }

    draw(context) {
      this.layers.forEach(layer => {
        layer.draw(context);
      });
    }
  }

  class Explosion {
    constructor(game, x, y) {
      this.game = game;
      this.frameX = 0;
      this.spriteWidth = 200;
      this.spriteHeight = 200;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.x = x - this.width * 0.5;
      this.y = y - this.height * 0.5;
      this.fps = 30;
      this.timer = 0;
      this.spriteHeight = 200;
      this.interval = 1000 / this.fps;
      this.markedForDeletion = false;
      this.maxFrame = 8;
      this.sound = new Audio();
    }

    update(deltaTime) {
      if (this.frameX === 0) this.sound.play();
      this.x -= this.game.speed;
      if (this.timer > this.interval) {
        this.frameX++;
        this.timer = 0;
      } else {
        this.timer += deltaTime;
      }
      if (this.frameX > this.maxFrame) {
        this.markedForDeletion = true;
      }
    }

    draw(context) {
      context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

    playSound() {
      this.sound.play();
    }
  }

  class SmokeExplosion extends Explosion {
    constructor(game, x, y) {
      super(game, x, y);
      this.image = document.getElementById('smokeExplosion');
      this.sound.src = 'assets/audios/smokeExplosion.wav';
    }
  }

  class FireExplosion extends Explosion {
    constructor(game, x, y) {
      super(game, x, y);
      this.image = document.getElementById('fireExplosion');
      this.sound.src = 'assets/audios/fireExplosion.wav';
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
      // score
      context.fillText('Score: ' + this.game.score, 20, 40);

      context.font = this.fontSize + 'px ' + this.fontFamily;
      // title
      // context.fillText('Designed by Vang Huynh', this.game.width - this.game.width * 0.5, 20);

      // timer
      const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
      context.fillText('Timer: ' + formattedTime, 20, 100);
      // game over messages
      if (this.game.gameOver) {
        context.textAlign = 'center';
        let message1;
        let message2;
        if (this.game.score > this.game.winningScore) {
          message1 = 'Most Wondrous!';
          message2 = 'Well done explorer!';
        } else {
          message1 = 'Game Over!!!';
          message2 = 'Press R to restart!';
        }
        context.font = '70px ' + this.fontFamily;
        context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
        context.font = '25px ' + this.fontFamily;
        context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 20);
      }
      // ammo
      if (this.game.player.powerUp) context.fillStyle = '#ffffbd';
      for (let i = 0; i < this.game.ammo; i++) {
        context.fillRect(20 + 5 * i, 50, 3, 20);
      }
      context.restore();
    }
  }

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.background = new Background(this);
      this.player = new Player(this);
      this.inputHandler = new InputHandler(this);
      this.ui = new UI(this);
      this.keys = [];
      this.enemies = [];
      this.particles = [];
      this.explosions = [];
      this.enemyTimer = 0;
      this.enemyInterval = 2000;
      this.ammo = 20;
      this.maxAmmo = 50;
      this.ammoTimer = 0;
      this.ammoInterval = 350;
      this.gameOver = false;
      this.score = 0;
      this.winningScore = 999999;
      this.gameTime = 0;
      this.timeLimit = 60000000000;
      // speed layer and background
      this.speed = 1;
      // debug mode
      this.debug = false;
      // sound
      this.isMusic = true;
      this.sound = new Audio();
      this.sound.src = 'assets/audios/background.mp3';
      this.sound.loop = true;
      this.gamepad = new GamepadHandler(this);
      this.fired = false;
    }

    update(deltaTime) {
      if (this.isMusic) {
        this.sound.play();
      } else {
        this.sound.pause();
      }
      if (!this.gameOver) this.gameTime += deltaTime;
      if (this.gameTime > this.timeLimit) this.gameOver = true;
      this.gamepad.update();
      this.background.update();
      this.background.layer4.update();
      this.player.update(deltaTime);
      if (this.ammoTimer > this.ammoInterval) {
        if (this.ammo < this.maxAmmo) this.ammo++;
        this.ammoTimer = 0;
      } else {
        this.ammoTimer += deltaTime;
      }

      this.particles.forEach(particle => {
        particle.update();
      });
      this.particles = this.particles.filter(particle => !particle.markedForDeletion);

      this.explosions.forEach(explosion => {
        explosion.update(deltaTime);
      });
      this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion);

      this.enemies.forEach(enemy => {
        enemy.update();
        if (this.checkCollision(this.player, enemy)) {
          enemy.markedForDeletion = true;
          this.addExplosion(enemy);
          for (let i = 0; i < enemy.score; i++) {
            this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
          }

          // Game Over
          this.addExplosion(this.player);
          this.gameOver = true;
        }
        this.player.projectiles.forEach(projectile => {
          if (this.checkCollision(projectile, enemy)) {
            enemy.lives--;
            projectile.markedForDeletion = true;
            this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
            if (enemy.lives <= 0) {
              for (let i = 0; i < enemy.score; i++) {
                this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
              }
              enemy.markedForDeletion = true;
              this.addExplosion(enemy);
              if (enemy.type === 'lucky') this.player.enterPowerUp();
              if (enemy.type === 'hive') {
                for (let i = 0; i < 5; i++) {
                  this.enemies.push(new Drone(game, enemy.x + Math.random() * this.width, enemy.y + Math.random() * this.height * 0.5));
                }
              }
              if (!this.gameOver) this.score += enemy.score;
              if (this.score > this.winningScore) this.gameOver = true;
            }
          }
        })
      });
      this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
      if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
    }

    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.particles.forEach(particle => {
        particle.draw(context);
      });
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      });
      this.explosions.forEach(explosion => {
        explosion.draw(context);
      });
      this.background.layer4.draw(context);
      this.ui.draw(context);
    }

    addEnemy() {
      const randomize = Math.random();
      if (randomize < 0.3) this.enemies.push(new Angler1(this));
      else if (randomize < 0.4) this.enemies.push(new HiveWhale(this));
      else if (randomize < 0.6) this.enemies.push(new Angler2(this));
      else if (randomize < 0.7) this.enemies.push(new HiveWhale(this));
      else this.enemies.push(new LuckyFish(this));
    }

    addExplosion(enemy) {
      const randomize = Math.random();
      if (randomize < 0.5) {
        this.explosions.push(new SmokeExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
      } else {
        this.explosions.push(new FireExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
      }
    }

    checkCollision(rect1, rect2) {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y
      );
    }

    restart() {
      this.keys = [];
      this.enemies = [];
      this.particles = [];
      this.explosions = [];
      this.enemyTimer = 0;
      this.enemyInterval = 2000;
      this.ammo = 20;
      this.maxAmmo = 50;
      this.ammoTimer = 0;
      this.ammoInterval = 350;
      this.gameOver = false;
      this.score = 0;
      this.winningScore = 999999;
      this.gameTime = 0;
      this.timeLimit = 60000000000;
      // speed layer and background
      this.speed = 1;
      this.fired = false;
      this.player = new Player(this);
    }

  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;
  // animation loop
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(ctx);
    game.update(deltaTime);
    requestAnimationFrame(animate);
  }

  animate(0);


});