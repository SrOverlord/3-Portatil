<?php
require_once '/usr/local/lib/php/vendor/autoload.php';
include("bd.php");

$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);


$variablesTwig = [];


session_start();
//Hacemos comprobaciones dpara nuestro get 
//Comprobamos que no sea numerico y que solo tiene caracteres alfabeticos 
if(!is_numeric(ctype_alpha((isset($_GET['pro'] ))))){
    $nombrePro = $_GET['pro'];
}else{
    $nombrePro = -1;
}

if(isset($_SESSION['idUsuario'])){
    $variablesTwig['idUsuario'] = getUsuario($_SESSION['idUsuario']);
}else{
    $variablesTwig['idUsuario'] = getUsuario(4);  //Usuario Anonimo
}

$variablesTwig['nombrePro']= $nombrePro;
$variablesTwig['producto']= getProducto($nombrePro);
$variablesTwig['fotos'] = getFotosProducto($nombrePro);
$variablesTwig['tacos'] = getTacos();
$variablesTwig['comentarios'] = getComentarios($nombrePro);

echo $twig->render('producto.html',$variablesTwig);
