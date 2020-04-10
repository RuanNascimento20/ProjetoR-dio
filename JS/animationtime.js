var canvas;
var width;
var height;
var canvasContext;
var audioContext;
var analyser;
var bufferLength;
var dataArray;

//window.onload = function() {
  //var audioCtx = AudioContext || webkitAudioContext; 
  //audioContext = new context();
  
  //var mediaElement = document.querySelector("#player");//pegando o audio do htmal que representa o audio
    //audio.onplay = () => {audioContext.resume();}//audio já delarado em audiocontroler.js
  
  canvas = document.querySelector("#canvas1");//pegando do htmal que representa o audio
  canvasContext = canvas.getContext("2d");///convas em 2d 
  
  width = canvas.width;
  height = canvas.height;
  
  //var sourceNode = audioContext.createMediaElementSource(audio);
  
  analyser = audioContext.createAnalyser();
  balancoControle.connect(analyser);
  //analyser.connect(audioContext.destination);

  analyser.fftSize = 1024;
  
  bufferLength = analyser.frequencyBinCount;
  
  dataArray = new Uint8Array(bufferLength);

  
  //sourceNode.connect(analyser);
  //analyser.connect(audioContext.destination);
  
  requestAnimationFrame(visualize);
//}

function visualize() {
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, width, height);
  
  analyser.getByteTimeDomainData(dataArray);
  
  canvasContext.lineWidth = 2;
  canvasContext.strokeStyle = "#daa520";
  
  canvasContext.beginPath();
  
  var sliceWidth = width/bufferLength;
  var x = 0;
  for (var i = 0; i < bufferLength; i++) {
    var v = dataArray[i]/255;
    var y = v * height;
    if (i === 0) {
      canvasContext.moveTo(x, y);
    }
    else {
    
      canvasContext.lineTo(x, y);
    }
    x += sliceWidth;
  }
  canvasContext.stroke();
  requestAnimationFrame(visualize)
}


