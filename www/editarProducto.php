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
if(isset($_GET['nomPro'])){
    $variablesParaTwig['idCripto'] = getProducto($_GET['nomPro']) ;
}


if($_SERVER['REQUEST_METHOD'] == "POST" && isset($_SESSION['idUsuario'])){

    if(isset($_POST['guardarEdicion'])){
        $registroForm = array(
            'nombre' =>  $_POST['Nombre'],
            'foto' =>  $_POST['foto'],
            'descripcion' =>  $_POST['descripcion']
        );

        
        //Copiamos foto y la traemos a la base de datos
        $nom = $_REQUEST["Nombre"];
        $foto = $_FILES["foto"]["name"];
        $ruta = $_FILES["foto"]["tmp_name"];
        $destino = "./static/image/" . $foto;
        copy($ruta, $destino); 
        
        editarCripto($_POST['Nombre'],$destino,$_POST['descripcion'],$variablesParaTwig['idCripto']['id']);
        header("Location: /portada.php");
        exit();
    }


    if(isset($_POST['guardarGaleria'])){
      
        
        //Copiamos foto y la traemos a la base de datos
                
            $nom = $_REQUEST["Nombre"];
            $foto = $_FILES["fotos"]["name"];
            $ruta = $_FILES["fotos"]["tmp_name"];
            $destino = "./static/image/" . $foto;
            copy($ruta, $destino); 
            
            addFotoProdcuto( $variablesParaTwig['idCripto']['id'],$destino);
        
        header("Location: /portada.php");
        exit();
    }
    
}


//VaraiblesTwig 
echo $twig->render('editarCripto.html', $variablesParaTwig);
