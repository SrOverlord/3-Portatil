<?php
require_once '/usr/local/lib/php/vendor/autoload.php';
include("bd.php");

$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

//Iniciamos sesion y creamos array de variabls para twig
$variablesParaTwig = [];
session_start();



//Sesion Usuario
if (isset($_SESSION['idUsuario'])) {
    $variablesParaTwig['idUsuario'] = getUsuario($_SESSION['idUsuario']);
}else{
    // En caso de no tener id Usuario la enviamos al registroIncio de sesion 
    header("Location: /registroInicio.php");
}

// Obtenemos comentario
if(isset($_GET['idComentario'])){
    $variablesParaTwig['idComentario'] = getComentario($_GET['idComentario']) ;
    $variablesParaTwig['nombrePro'] = getNombreProducto($variablesParaTwig['idComentario']['idProducto']);
}


if($_SERVER['REQUEST_METHOD'] == "POST" && isset($_SESSION['idUsuario'])){

    if($_POST['textoComentario']){
        $registroForm = array(
            'comentario' =>  $_POST['textoComentario']
        );
        
        editarComentario($_GET['idComentario'],$registroForm['comentario']);
        header("Location: ./producto.php?pro='".$variablesParaTwig['nombrePro']['nombre']."'");
        exit();
    }
    
}


//VaraiblesTwig 
echo $twig->render('editarComentario.html', $variablesParaTwig);
