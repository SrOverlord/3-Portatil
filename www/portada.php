<?php
require_once '/usr/local/lib/php/vendor/autoload.php';
include("bd.php");

$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

//Iniciamos sesion y creamos array de variabls para twig
$variablesParaTwig = [];
session_start();

//Definimos variable booleana en caso de inicio de sesión.

if (isset($_SESSION['idUsuario'])) {
    $variablesParaTwig['idUsuario'] = getUsuario($_SESSION['idUsuario']);
}else{
    $variablesParaTwig['idUsuario'] = getUsuario(4);  //Usuario Anonimo -por defecto
}
$variablesParaTwig['productos'] = getProductos();


//VaraiblesTwig 
echo $twig->render('portada.html', $variablesParaTwig);
