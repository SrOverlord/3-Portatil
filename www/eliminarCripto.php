<?php

require_once '/usr/local/lib/php/vendor/autoload.php';
include("bd.php");



//Abrimos sesion
session_start();

if (!is_numeric(ctype_alpha((isset($_GET['id']))))) {
    $id = $_GET['id'];
} else {
    $id = -1;
}

if (isset($_SESSION['idUsuario'])) {
    $usuario = getUsuario($_SESSION['idUsuario']);
    if ($usuario['tipo'] == 'Gestor') {
        eliminarCripto($id);
        header("Location: ./portada.php");
        exit();
    } else {
        header("Location: registroInicio.php");
    }
}
header("Location: ./portada.php");
exit();
