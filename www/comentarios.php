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



$variablesParaTwig['Comentarios'] = getTodosComentarios();

echo $twig->render('comentarios.html', $variablesParaTwig);
