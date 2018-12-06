var i=1;

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



function validarCombinacion()
{
  var tableroMarcado = resetearTableroMarcado();

  tableroMarcado = validarCombinaciones(tableroMarcado);

  // tableroMarcado = validarCombinacionXFilas(tableroMarcado);
  console.table(tableroMarcado);
  return tableroMarcado;



}

function validarCombinaciones(tablero){

      var elementoActual;
      var imagen;
      var imagenSig;
      var numElementosRepetidos =0;
      var combinacionCorrecta = false;

      for (var fila = 0; i < tablero.length; fila++) { // recorre por columna
        for (var columna = 0; j < tablero[i].length  ; j++) { //tablero[i].length

          // Validacion x Filas
          if ((7 - col) > 2) {
                elementoActual = $('.col-' + (columna + 1)).children()[fila];
                imagen = $(elementoActual).prop('src').substring($(elementoActual).prop('src').length - 5);

                numElementosRepetidos = 1;

                while ((7 - columna) >= 3 && contador < (7 - columna)) {
                    var elementoSig = $('.col-' + (columna + contador + 1)).children()[fila];
                    imagenSig = $(elementoSig).prop('src').substring($(elementoSig).prop('src').length - 5);

                    if (imagenSig !== imagenSig) {
                        break;
                    }

                    ++numElementosRepetidos;
                }

                if (numElementosRepetidos >= 3) {
                    combinacionCorrecta = true;
                    for (var i = 0; i < contador; ++i) {
                        tablero[fila][columna + i] = true;
                    }
                }
            }

            // Validacion x Columnas
            if ((7 - fila) > 2) {
                elementoActual = $('.col-' + (columna + 1)).children()[fila];
                imagen = $(elementoActual).prop('src').substring($(elementoActual).prop('src').length - 5);

                numElementosRepetidos = 1;

                while ((7 - fila) >= 3 && numElementosRepetidos < (7 - fila)) {
                    var elementoSig  = $('.col-' + (columna + 1)).children()[fila + numElementosRepetidos];
                    imagenSig = $(elementoSig).prop('src').substring($(elementoSig).prop('src').length - 5);

                    if (nombreImagen !== nombreImagenSgte) {
                        break;
                    }

                    ++numElementosRepetidos;
                }

                if (numElementosRepetidos >= 3) {
                    combinacionCorrecta = true;
                    for (var i = 0; i < contador; ++i) {
                        tablero[fila + i][columna] = true;
                    }
                }
          }
        }
      }

      return tablero;
}

function resetearTableroMarcado(){
  var tableroMarcado = [];
  for (var fila = 0; fila < 7; ++fila) {
      tableroMarcado[fila] = [];
      for (var columna = 0; columna < 7; ++jcolumna) {
          tableroMarcado[fila][columna] = false;
      }
  }

  return tableroMarcado;
}

function llenarTablero()
{

  // console.log(i);
  var num = 0;
  var img = 0;
  // var lengthColumnas = 0;
  // lengthColumnas = $(".col-"+i).find("img").length;
  //
  // console.log(lengthColumnas);
  //lleno la columna si no hay elementos en la columnas y si ya no esta llena la columna
  // if(lengthColumnas!= null && lengthColumnas!=0 && (lengthColumnas<8)){
    if(true){
    var x = 0;
      // si hay ellementos en la columna asigno al contador "x" el numero de elementos
     // if (typeof lengthColumnas === 'number' && lengthColumnas >0 )
     //    { console.log(lengthColumnas);
     //       x = lengthColumnas;}
        while (x < 8) {
          //verifico si hay que reponer caramelos(ellementos) faltantes
            if($(".col-"+i).children("img:nth-child("+x+")").html()==null)
            {
              num = Math.floor(Math.random()*4)+1;
              img="image/"+num+".png";
              $(".col-"+i).prepend("<img src="+img+" class='elemento'/>").css("justify-content", "flex-start")
            }
              x++;
        }

  }
}

$(function(){

  cambiarColorTitulo($(".main-titulo"));
  // $(".elemento").draggable({disable:true});
  // // llenarTablero($("#panel-tablero"));
  // $(".elemento").draggable({disable:false});
  while (i<8) {
    llenarTablero();
    i= i+1;
  }
  validarCombinacion();
})
