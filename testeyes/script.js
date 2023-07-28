

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

    class Angle {
        constructor(x, y, size, angleStartPart, angleEndPart, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.angleStartPart = angleStartPart;
            this.angleEndPart = angleEndPart;
            this.color = color;
        }

        draw(context) {
            context.beginPath();
            context.moveTo(this.x, this.y);

            context.arc(this.x, this.y, this.size, this.angleStartPart, this.angleEndPart, false);
            const x1 = this.x + this.size * Math.cos(this.angleStartPart);
            const y1 = this.y + this.size * Math.sin(this.angleStartPart);
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
            this.isShowPass = false;
            this.isShowFail = false;
            this.pass = document.getElementById('pass');
            this.fail = document.getElementById('fail');
            this.random = Math.floor(Math.random() * 7);
            this.isStartGame = true;
        }

        update(deltaTime) {
            angles.forEach(item => item.update(deltaTime))
            if (this.isStartGame) {
                angles = [];
                angles2 = [];
                for (let i = 0; i < 8; i++) {
                    const anglePerPart = (2 * Math.PI) / 8;
                    var angleItem = new Angle(this.width / 2 - 222, this.height / 2, 160, i * anglePerPart, (i + 1) * anglePerPart, 'gray')
                    var angleItem2 = new Angle(this.width / 2 + 222, this.height / 2, sizeAngleCheck - roundIndex - point, i * anglePerPart, (i + 1) * anglePerPart, 'gray')
                    angles.push(angleItem);
                    angles2.push(angleItem2)
                }
                this.ball2 = new Circle(this.width / 2 + 222, this.height / 2, sizeCheck - point, 'black');;
                angles2[this.random].color = 'black';
                this.isStartGame = false;

            }
        }

        nextRound() {
            this.random = Math.floor(Math.random() * 7);
        }

        draw(context) {
            context.clearRect(0, 0, this.width, this.height);

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
    }

    canvas.addEventListener("click", handleClick);

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

    // Function to handle the click event
    function handleClick(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        for (let i = 0; i < angles.length; i++) {
            if (angles[i].isClicked(mouseX, mouseY)) {
                if (game.random === i) {
                    angles2[game.random].color = 'gray';
                    point++;
                    if (roundIndex % 3 === 0) {
                        roundIndex++;
                    }
                    game.nextRound();
                    game.isStartGame = true;
                    game.isShowPass = true;
                    game.isShowFail = false;
                } else {
                    game.isShowPass = false;
                    game.isShowFail = true;
                }
                break;
            }
        }
    }
});