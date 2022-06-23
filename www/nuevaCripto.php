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
} else {
    // En caso de no tener id Usuario la enviamos al registroIncio de sesion 
    header("Location: /registroInicio.php");
}

//Solo Gestor, en caso contrario se redirige a Registro e inicio de sesion 
if ($variablesParaTwig['idUsuario']['tipo'] != 'Gestor') {
    header("Location: /registroInicio.php");
}


if ($_SERVER['REQUEST_METHOD'] == "POST") {

    if (isset($_POST['crearCripto'])) {
        $registroForm = array(
            'nombre' =>  $_POST['nombreIN'],
            'descripcion' => $_POST['descripIN'],
            'fotoPortada' => $_POST['foto']
        );
     
        //Copiamos foto y la traemos a la base de datos
        $nom = $_REQUEST["nombreIN"];
        $foto = $_FILES["foto"]["name"];
        $ruta = $_FILES["foto"]["tmp_name"];
        $destino = "./static/image/" . $foto;
        copy($ruta, $destino);

       
        addCripto($registroForm['nombre'], $destino, $registroForm['descripcion']);
        header("Location: /portada.php");
        exit();
    }
}


//VaraiblesTwig 
echo $twig->render('nuevaCripto.html', $variablesParaTwig);
