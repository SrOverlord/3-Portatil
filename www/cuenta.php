<?php
require_once '/usr/local/lib/php/vendor/autoload.php';
include("bd.php");

$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

//Iniciamos sesion y creamos array de variabls para twig
$variablesParaTwig = [];
session_start();

//Definimos variable booleana en caso de inicio de sesión.


//Sesion Usuario
if (isset($_SESSION['idUsuario'])) {
    $variablesParaTwig['idUsuario'] = getUsuario($_SESSION['idUsuario']);
}else{
    // En caso de no tener id Usuario la enviamos al registroIncio de sesion 
    header("Location: /registroInicio.php");
}

//Edicion 
if(isset($_GET['editar'])){
    $editar = "Si" ;
}else{
    $editar = "No";
}

//Mensaje Error para mostrar por pantalla en caso necesario
if(isset($_GET['error'])){
    $error = $_GET['error'] ;
}else{
    $error = "No";
}

//
if($_SERVER['REQUEST_METHOD'] == "POST" && isset($_SESSION['idUsuario'])){

    //Guardamos Email y Nombre 
    if($_POST['nombre'] && $_POST['email'] ){
        $registroForm = array(
            'nombre' => $_POST['nombre'],
            'email' =>  $_POST['email'],
        );

        //Llamamos BD con funciones de Actualizar datos 
        updateNombre($_SESSION['idUsuario'],$registroForm['nombre']);
        updateEmail($_SESSION['idUsuario'],$registroForm['email']);

        $editar = "No";
        $error = "No";
        header("Location: cuenta.php"); // No edicion 
        exit();
    }

    //Guardamos Contrasena
    if($_POST['pass1'] && $_POST['pass2'] ){
        $registroForm = array(
            'pass1' => $_POST['pass1'],
            'pass2' =>  $_POST['pass2'],
        );

        if($registroForm['pass1'] == $registroForm['pass2'] && $registroForm['pass1'] !="" ){
            updateContrasena($_SESSION['idUsuario'],$registroForm['pass1']);
            header("Location: cuenta.php"); // No edicion 
            exit();
        }else{
            $error = "Error: Las contrasenas no coinciden";
            $editar = "Si";
            //En caso de error volvemos con edicion y mensaje de error
            header("Location: /cuenta.php?editar&error=\"$error\"");
            exit();
        }

    }  

    if($_POST['editDatos'] ){
        header("Location: /cuenta.php?editar");
        exit();
    }
    
}


//Enviamos las varibables
$variablesParaTwig['editar'] = $editar;
$variablesParaTwig['error'] = $error;

//VaraiblesTwig 
echo $twig->render('cuenta.html', $variablesParaTwig);
