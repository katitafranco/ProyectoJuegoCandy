var id;

function pararTiempo(){

  clearInterval(id);

}

function limpiarContador(){
    $('#countdowntimer').countdowntimer({
        minutes:0,
        seconds:0
    });
}

function Contador(function(){}){
  $('#countdowntimer').countdowntimer({
    minutes:0,
    seconds:0,
    corriendo: function(){
      $('.time').animate({
        opacity:0
      }, 2000);
    }
  });
  id= setInterval(function(){},150);
}
