<?php

require_once '/usr/local/lib/php/vendor/autoload.php';
include("bd.php");



//Abrimos sesion
session_start();

if(!is_numeric(ctype_alpha((isset($_GET['pro'] ))))){
    $nombrePro = $_GET['pro'];
}else{
    $nombrePro = -1;
}

if (isset($_SESSION['idUsuario'])) {
    $usuario = getUsuario($_SESSION['idUsuario']);
    if($usuario['tipo'] == 'Moderador'){
        if(isset($_GET['idComentario'])){
            eliminarComentario($_GET['idComentario']);
        }
    }
}

if(isset($_GET['todos'])){

    header("Location: comentarios.php");
}else{

    header("Location: ./producto.php?pro=$nombrePro");
}



