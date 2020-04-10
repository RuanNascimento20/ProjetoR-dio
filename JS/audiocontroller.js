var context = AudioContext || webkitAudioContext;
var audioContext= new context();
var audio = document.querySelector("#audio");

audio.oniplay=(e) => {audioContext.resume()}
var volume = document.querySelector("#volume");

audio.onplay = (e) =>{audioContext.resume();}
var balanco = document.querySelector("#balanco");

var media = audioContext.createMediaElementSource(audio);
var audioControle = audioContext.createGain();
media.connect(audioControle);
//audioControle.connect(audioContext.destination);

volume.oninput = function(e){
    audioControle.gain.value = e.target.value;
}

var balancoControle = audioContext.createStereoPanner();
audioControle.connect(balancoControle);
//balancoControle.connect(audioContext.destination);


balanco.oninput = function(e){
    balancoControle.pan.value = e.target.value;
}

function tocar(musicSrc){
    audio.src = musicSrc
}
window.alert(audio);