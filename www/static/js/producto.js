// Definimos varibales que podamos usar en nuestor fichero

var botonResenas = document.getElementById("BotonResenas");
var ContenedorReseñas = document.getElementById("ContReseñas");
var botonEnviar = document.getElementById("anadirComentario");
var textoReseña = document.getElementById("textoComentario");

const tacos = [  "culo" , "payaso", "idiota" , "tonto", "cabron" , "puta", "gilipollas", "estupido", "subnormal", "cabezon"];

function mostrarContenedorReseña() {
  ContenedorReseñas.style.display = "block";
}

function ocultarContendorReseña() {
  ContenedorReseñas.style.display = "none";
}

function crearContenedorComentario(datosComentario, contenedor) {
  //Cremaos los contenedores
  var nuevaCaja = document.createElement("div");

  
  //Cremos las variables para el cont autor
  var nombre = document.createElement("h3");
  var fecha = document.createElement("h4");
  var email = document.createElement("h4");
  var cuerpoTexto = document.createElement("p");
  
  //Introducimos valores en variables
  cuerpoTexto.innerHTML = datosComentario["Comentario"];
  nombre.innerHTML = datosComentario["Nombre"];
  fecha.innerHTML = datosComentario["Fecha"];
  email.innerHTML = datosComentario["Email"];
  

  //Formamos contenedor final
  nuevaCaja.appendChild(nombre);
  nuevaCaja.appendChild(fecha);
  nuevaCaja.appendChild(email);
  nuevaCaja.appendChild(cuerpoTexto);

  //Añadimos al contenedor final
  document.getElementById("Cajas").insertAdjacentElement("afterbegin", nuevaCaja);

}

function comrprobarEmail(email){
  var arroba = "@";
  var encontrado = false;
  for (var i = 0; i < email.length  ; i ++){
    if(arroba === email[i] && email.length >= 3){
      if(i != email.length -1){
        encontrado = true;
      }
    }
  }
return encontrado;
}

function addComentario() {

  var cajas = document.getElementById("Cajas");
  var datosComentario = [];

  // Convertimos el array de java a objeto
  
  datosComentario["Nombre"] = document.getElementById("nombre").value;
  datosComentario["Email"] = document.getElementById("email").value;
  datosComentario["Comentario"] = document.getElementById("textoComentario").value;
  datosComentario["Fecha"] = new Date();

    if(comrprobarEmail(datosComentario["Email"]) && datosComentario["Nombre"].length !=0 ){
      
      crearContenedorComentario(datosComentario, cajas);
      alert("Comentario creado con exito");
    }else{
      alert("Ha ocurrido un error");
    }
  
}


function ocultarTacos(){
  
  var encontrado = false;
  var auxPalabra = textoReseña.value.split(" ").pop();
  var relleno = "";
  var i = 0, j = 0;

  for ( i = 0; i < tacos.length && !encontrado ; i++){
    encontrado = (auxPalabra === tacos[i]);
  }
  
  
  if(encontrado){
    for ( j = 0; j < auxPalabra.length ; j++){
      relleno += "*";
    }
    textoReseña.value = textoReseña.value.replace(auxPalabra, relleno)
  }

}

botonResenas.onclick = function () {
  if (ContenedorReseñas.style.display != "block") {
    mostrarContenedorReseña();
  } else {
    ocultarContendorReseña();
  }
};

botonEnviar.onclick = function () {
    addComentario();
};


if(textoReseña){
  textoReseña.onkeyup= function(){
    ocultarTacos();
  }
}