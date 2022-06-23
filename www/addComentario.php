<?php
require_once '/usr/local/lib/php/vendor/autoload.php';
include("bd.php");



//_______________________________Comentarios__________________________

session_start();

if($_SERVER['REQUEST_METHOD'] == "POST"){


    //____Post Anadir  Comentario___

    if($_POST['nombre'] && $_POST['email'] ){
        $registroForm = array(
            'nombre' => $_POST['nombre'],
            'email' =>  $_POST['email'],
            'comentario' =>  $_POST['textoComentario'],
            'idProducto' =>  $_POST['idPro'],
            'nomreProducto' => $_POST['nombrePro']
        );
        
        //LLamamos a la funcion para añadir comentarios en la base de datos
        introducirComentarios($registroForm);
        // echo $registroForm['nomreProducto'];
        header("Location: /producto.php?pro=\"".$registroForm['nomreProducto']."\"");
        exit();
    }

    
}

