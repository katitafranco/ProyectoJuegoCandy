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

$(function(){

  cambiarColorTitulo($(".main-titulo"));
})
