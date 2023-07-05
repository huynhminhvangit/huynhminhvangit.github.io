var audio = document.getElementById("audio");
audio.src = '/mp3/Cho-Trong-Ai.mp3';
audio.loop = true;

window.addEventListener("load", function() {
    audio.play();
})