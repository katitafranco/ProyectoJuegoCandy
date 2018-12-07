var puntuacion, movimientos, continuar;

$(function(){
  cambiarColorTitulo($(".main-titulo"));

  $('.col-1').droppable({
      accept: ".col-2"
  });
  $('.col-2').droppable({
      accept: ".col-1, .col-3"
  });
  $('.col-3').droppable({
      accept: ".col-2, .col-4"
  });
  $('.col-4').droppable({
      accept: ".col-3, .col-5"
  });
  $('.col-5').droppable({
      accept: ".col-4, .col-6"
  });
  $('.col-6').droppable({
      accept: ".col-5, .col-7",

  });
  $('.col-7').droppable({
      accept: ".col-6"
  });

  $('.btn-reinicio').click(function () {
      if ($('.btn-reinicio').text() === 'Iniciar') {
          if ($(".panel-tablero").css('display') == 'none') {
              $(".panel-tablero").css('display', 'flex');
              $(".panel-tablero").css('width', '70%');
              $(".panel-tablero").css('height', '700px');
              $(".panel-score").css('display', 'flex');
              $(".panel-score").css('width', '25%');
              $(".panel-score").css('height', '700px');
              $(".time").css('display', 'block');
              $(".time").css('width', '100%');
              $(".time").css('height', '25%');
              // $(".time").css('opacity', '1.0');
      }
      $('.main-titulo-juego-terminado').css("display", "none");

      eliminarElementos();
      llenarTablero()
      puntuacion = 0;
      movimientos = 0;
      iniciar();
      $(this).text("Reiniciar");
    }
    else
    {
      $(this).text('Iniciar');
      $('#score-text').text('0');
      pararTiempo();
      limpiarContador();
    }


})



function cambiarColorTitulo(elemento)
{
  $(elemento).animate(
    {
      color: "white"
    }, 1000, function(){
      cambiarColorOriginalTitulo(elemento)
    }
  )
}
function cambiarColorOriginalTitulo(elemento)
{
  $(elemento).animate(
    {
      color:"#DCFF0E"
    }, 1000, function(){
      cambiarColorTitulo(elemento)
    }
  )
}

function iniciar(){
      continuar = true;
      hacerDropAndDrag();
      // clearInterval(realizarMovimientos());

      var widthPanel = $('.panel-tablero').css('width');

      //ocultando el tablero con animacion
      $('.panel-tablero').animate({
          height:0,
          width:0
      }, 3000, function(){
        $('.panel-tablero').css('display', 'none');
      });

      $('.panel-score').animate({
          width: widthPanel
      },3000);

      $('.btn-reinicio').text('Iniciar');

      $('.main-titulo-juego-terminado').css('display','block');


}

function eliminarElementos(){
  for (var i = 0; i < 7; i++) {
    $('.col-'+ i).empty();
  }
}

function llenarTablero()
{
  var col, fila;
  col = 1;
  while (col<8) {
    fila = 1;
    while (fila<8) {
      var nuevoElemento =
      $('<img>',{'src':'image/'+(1 + Math.floor(Math.random()*4))+'.png', 'class':'elemento'});
      $(nuevoElemento).draggable();
      $('.col-'+col).append(nuevoElemento);
    }
  }
}

function cuentaMovimientos(){
      movimientos++;
      $('movimientos-text').text(movimientos);
}

function cambiarElementos(elemento1, elemento2){
  $(elemento1).replaceWith($(elemento2));
}

// function intercambiarElementos(elm1, elm2) {
//     var parent1, next1,
//         parent2, next2;
//
//     parent1 = elm1.parentNode;
//     next1 = elm1.nextSibling;
//     parent2 = elm2.parentNode;
//     next2 = elm2.nextSibling;
//
//     parent1.insertBefore(elm2, next1);
//     parent2.insertBefore(elm1, next2);
// }
//

function validarMovimientos() {

    var contador;
    var nombreImagen;
    var nombreImagenSgte;
    var figurasMarcadas = inicializarFigurasMarcadas();
    var huboCambios = false;

    for (var row = 0; row < 7; ++row) {
        for (var col = 0; col < 7; ++col) {
            if ((7 - col) > 2) {
                nombreImagen = $('.col-' + (col + 1)).children()[row];
                nombreImagen = $(nombreImagen).prop('src').substring($(nombreImagen).prop('src').length - 5);

                contador = 1;

                while ((7 - col) >= 3 && contador < (7 - col)) {
                    nombreImagenSgte = $('.col-' + (col + contador + 1)).children()[row];
                    nombreImagenSgte = $(nombreImagenSgte).prop('src').substring($(nombreImagenSgte).prop('src').length - 5);

                    if (nombreImagen !== nombreImagenSgte) {
                        break;
                    }

                    ++contador;
                }

                if (contador >= 3) {
                    huboCambios = true;
                    for (var i = 0; i < contador; ++i) {
                        figurasMarcadas[row][col + i] = true;
                    }
                }
            }

            if ((7 - row) > 2) {
                nombreImagen = $('.col-' + (col + 1)).children()[row];
                nombreImagen = $(nombreImagen).prop('src').substring($(nombreImagen).prop('src').length - 5);

                contador = 1;

                while ((7 - row) >= 3 && contador < (7 - row)) {
                    nombreImagenSgte = $('.col-' + (col + 1)).children()[row + contador];
                    nombreImagenSgte = $(nombreImagenSgte).prop('src').substring($(nombreImagenSgte).prop('src').length - 5);

                    if (nombreImagen !== nombreImagenSgte) {
                        break;
                    }

                    ++contador;
                }

                if (contador >= 3) {
                    huboCambios = true;
                    for (var i = 0; i < contador; ++i) {
                        figurasMarcadas[row + i][col] = true;
                    }
                }
            }
        }
    }

    if (huboCambios) {
        resetearTableroMarcado(figurasMarcadas);
    } else {
        clearInterval(idRealizarMovimientosInterval);
    }
}

function resetearTableroMarcado(){
  var tableroMarcado = [];
  for (var fila = 0; fila < 7; ++fila) {
      tableroMarcado[fila] = [];
      for (var columna = 0; columna < 7; ++columna) {
          tableroMarcado[fila][columna] = false;
      }
  }

  return tableroMarcado;
}

function actualizarTablero(){

}

function sumarPuntuacion(puntosGanados)
{
  puntuacion += puntosGanados;
  $('#score-text').text(puntuacion);

}
function hacerDropAndDrag()
{
  $('.elemento').draggable({
    disabled: false,
    cursor: 'move',
    containment: '.panel-tablero',
    revert: true,
    revertDuration: 500,
    snap: '.elemento'
  })
}
