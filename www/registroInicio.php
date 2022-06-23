<?php
require_once '/usr/local/lib/php/vendor/autoload.php';
include("bd.php");

$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);




if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    //_______Registro de Usuario______

    if ($_POST['nombreReg'] && $_POST['correoReg'] && $_POST['passReg']) {
        $registroForm = array(
            'nombre' => $_POST['nombreReg'],
            'email' =>  $_POST['correoReg'],
            'contrasena' =>  $_POST['passReg']
        );


        $idUsuario = registrar(
            $registroForm['nombre'],
            $registroForm['email'],
            $registroForm['contrasena']
        );

        session_start();
        
        if($idUsuario === "NoLogeado"){  //No Logueado Correctamente
            header("Location: registroInicio.php");
        }else{
            $_SESSION['idUsuario'] = $idUsuario;
            header("Location: portada.php");
        }

        exit();
    }

    //_______Login de Usuario________

    if ($_POST['correoIni'] && $_POST['passIni']) {
        $registroForm = array(
            'email' =>  $_POST['correoIni'],
            'contrasena' =>  $_POST['passIni']
        );
      
        $idUsuario = login(
            $registroForm['email'],
            $registroForm['contrasena']
        );

        session_start();
        if($idUsuario === "NoLogeado"){
            header("Location: registroInicio.php");
        }else{
            $_SESSION['idUsuario'] = $idUsuario;
            header("Location: portada.php");
        }
        exit();
    }

 
}

echo $twig->render('registroInicio.html',);
