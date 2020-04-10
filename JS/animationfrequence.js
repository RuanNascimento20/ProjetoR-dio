var canvas2;
var width2;
var height2;//altura do canvas
var canvasContext2;
var audioContext2;
var analyser2;
var bufferLength2;
var dataArray2;

window.onload = function(){
    //var audioCtx = AudioContext || webkitAudioContext; 
 // audioContext = new audioCtx();

 // var audio = document.querySelector("#audio");///referenciado
 // audio.onplay = () => {audioContext.resume();}
  
  canvas2 = document.querySelector("#canvas2");///referenciado
  canvasContext2 = canvas2.getContext("2d");
  
  //var media2 = audioContext.createMediaElementSource(audio);
  analyser2 = audioContext.createAnalyser();
  analyser2.fftSize = 2048;//fast furrie transform frequencia , quantidade de pontos(256/2px=32 barras)
  bufferLength2 = analyser2.frequencyBinCount;

  dataArray2 = new this.Uint8Array(bufferLength2);
  //media2.connect(analyser2);
  this.analyser.connect(this.analyser2);
  analyser2.connect(audioContext.destination);
  this.requestAnimationFrame(visualize2)

  function visualize2(){
      canvasContext2.fillStyle ="#000";
      var width = canvas2.width;
      var height = canvas2.height;
      canvasContext2.fillRect(0, 0, width, height);//retangulo
      analyser2.getByteFrequencyData(dataArray2);
      var x=0;//inicio do desenho
      var barWidth = width/bufferLength;// largura das barras da frequncia (tamanho do canvas"area"/pela qtd pontos)
      for(var i = 0; i<bufferLength2;i++){
          var v = dataArray2[i]/255;//255 é arrey de 8 bits 0 a 255maior numero conseguimos um valo ente 0 e 1
          var y = v*height;//porcentagemdo valor 255 vezes a altura = porcentagm dentro da altura [DELIMITA O DESENHO]y=altura da barra
          canvasContext2.fillStyle = "#daa520";
          canvasContext2.fillRect(x, height-y, barWidth, y);
          x += barWidth + 2; //x proximo ponto+ espaçamento
      }
      requestAnimationFrame(visualize2)
  }
}