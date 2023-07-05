var audio = new Audio();
audio.src = '/mp3/Cho-Trong-Ai.mp3';
audio.loop = true;

window.addEventListener("load", function () {
    function animate() {
        audio.play();
        requestAnimationFrame(animate);
    }
    animate(0);
})
