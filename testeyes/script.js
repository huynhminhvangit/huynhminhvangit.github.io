

window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let angles = [];
    let angles2 = [];
    let sizeCheck = 20;
    let sizeAngleCheck = 25;
    let point = 5;
    let roundIndex = 0;

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
            // title
            context.fillText('Designed by Vang Huynh', this.game.width / 2 - 140, 20);

            // game over messages
            if (this.game.isGameOver) {
                context.textAlign = 'center';
                let message1 = 'Mắt lé rồi, chơi lại đi';
                let message2 = "Chơi lại sau " + (5 - Math.floor(this.game.gameOverTimer / 1000)) + " giây";
                context.font = '70px ' + this.fontFamily;
                context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 + 280);
                context.font = '25px ' + this.fontFamily;
                context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 320);
            }
            context.restore();
        }
    }

    class Angle {
        constructor(x, y, size, angleStartPart, angleEndPart, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.angleStartPart = angleStartPart;
            this.angleEndPart = angleEndPart;
            this.color = color;
            this.isHidden = false;
        }

        draw(context) {
            context.beginPath();
            context.moveTo(this.x, this.y);

            context.arc(this.x, this.y, this.size, this.angleStartPart, this.angleEndPart, false);
            const x2 = this.x + this.size * Math.cos(this.angleEndPart);
            const y2 = this.y + this.size * Math.sin(this.angleEndPart);

            context.fillStyle = this.color;
            context.fill();

            context.beginPath();
            context.moveTo(this.x, this.y);
            context.lineTo(x2, y2);
            context.strokeStyle = 'black';
            context.stroke();
        }

        update(deltaTime) {
            if (this.isHidden) {
                this.color = 'black';
            } else {
                this.color = 'gray';
            }
        }

        isClicked(x, y) {
            const dx = x - this.x;
            const dy = y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) < 0 ? Math.atan2(dy, dx) + 2 * Math.PI : Math.atan2(dy, dx);
            return distance < this.size && this.angleStartPart <= angle && angle <= this.angleEndPart;
        }
    }

    class Circle {
        constructor(x, y, size, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
        }

        draw(context) {
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
            context.fillStyle = this.color;
            context.fill();
            context.closePath();
        }
    }

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.ball = new Circle(width / 2 - 222, height / 2, 100, 'black');
            this.ball2 = new Circle(width / 2 + 222, height / 2, sizeCheck - 20, 'black');
            this.ui = new UI(this);
            this.isShowPass = false;
            this.isShowFail = false;
            this.isGameOver = false;
            this.isNextRound = false;
            this.gameTimer = 0;
            this.gameOverTimer = 0;
            this.pass = document.getElementById('pass');
            this.fail = document.getElementById('fail');
            this.random = Math.floor(Math.random() * 7);
        }

        update(deltaTime) {
            angles.forEach(item => item.update(deltaTime));
            angles2.forEach(item => item.update(deltaTime));
            if (!this.isGameOver) this.gameTimer += deltaTime;
            else {
                this.gameOverTimer += deltaTime;
                if (this.gameOverTimer > 5000) {
                    this.newGame();
                }
            }

            if (this.gameTimer > 2000 && this.isNextRound) {
                this.nextRound();
            }
        }

        draw(context) {
            this.ui.draw(context);

            angles.forEach(item => item.draw(context));
            this.ball.draw(context);

            angles2.forEach(item => item.draw(context));
            this.ball2.draw(context);

            if (this.isShowPass) {
                context.drawImage(this.pass, this.width / 2 - 64 - 222, this.height / 2 - 128 / 2, 128, 128);
            }
            if (this.isShowFail) {
                context.drawImage(this.fail, this.width / 2 - 64 - 222, this.height / 2 - 128 / 2, 128, 128);
            }

        }

        nextRound() {
            this.isShowFail = false;
            this.isShowPass = false;
            this.isNextRound = false;
            angles2 = [];
            angles[this.random].isHidden = false;
            for (let i = 0; i < 8; i++) {
                const anglePerPart = (2 * Math.PI) / 8;
                var angleItem2 = new Angle(this.width / 2 + 222, this.height / 2, sizeAngleCheck - roundIndex - point, i * anglePerPart, (i + 1) * anglePerPart, 'gray')
                angles2.push(angleItem2)
            }
            let size = (sizeCheck - point) < 1 ? 1 : sizeCheck - point;
            this.ball2 = new Circle(this.width / 2 + 222, this.height / 2, size, 'black');
            this.gameTimer = 0;
            this.random = Math.floor(Math.random() * 7);
            angles2[this.random].isHidden = true;
        }

        newGame() {
            this.isShowFail = false;
            this.isShowPass = false;
            this.isGameOver = false;
            this.gameTimer = 0;
            this.gameOverTimer = 0;
            angles = [];
            angles2 = [];
            for (let i = 0; i < 8; i++) {
                const anglePerPart = (2 * Math.PI) / 8;
                var angleItem = new Angle(this.width / 2 - 222, this.height / 2, 160, i * anglePerPart, (i + 1) * anglePerPart, 'gray')
                var angleItem2 = new Angle(this.width / 2 + 222, this.height / 2, sizeAngleCheck - roundIndex - point, i * anglePerPart, (i + 1) * anglePerPart, 'gray')
                angles.push(angleItem);
                angles2.push(angleItem2)
            }
            this.random = Math.floor(Math.random() * 7);
            this.ball2 = new Circle(this.width / 2 + 222, this.height / 2, sizeCheck - point, 'black');;
            angles2[this.random].isHidden = true;
        }

    }

    canvas.addEventListener("click", handleClick);

    const game = new Game(canvas.width, canvas.height);
    game.newGame();
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

    window.addEventListener("resize", function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        game.newGame();
    })

    // Function to handle the click event
    function handleClick(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        for (let i = 0; i < angles.length; i++) {
            if (angles[i].isClicked(mouseX, mouseY)) {
                angles[game.random].isHidden = true;
                if (game.random === i) {
                    point++;
                    if (roundIndex % 3 === 0) {
                        roundIndex++;
                    }
                    game.gameTimer = 0;
                    game.isNextRound = true;
                    game.isShowPass = true;
                    game.isShowFail = false;
                } else {
                    game.isShowPass = false;
                    game.isShowFail = true;
                    game.isGameOver = true;
                }
                break;
            }
        }
    }
});

