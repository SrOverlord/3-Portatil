<?php
require_once '/usr/local/lib/php/vendor/autoload.php';

// Conexion base de datos 


$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);



$mysqli = new mysqli("mysql", "root", "tiger", "SIBW");
    if($mysqli->connect_erno){
        echo("Fallo al conectar...");
    }
    
$nom = $_REQUEST["textNombre"];
$foto = $_FILES["foto"]["name"];
echo $foto;
$ruta = $_FILES["foto"]["tmp_name"];
echo $ruta;
$destino="./static/image/".$foto;
copy($ruta,$destino);


//Extraemosd el numero de producto
// $res = $mysqli->query("SELECT id from Criptos WHERE nombre= $nombre" );

// if($res->num_rows > 0){
//     $row = $res->fetch_assoc();
//     $producto = $row['id'];
// }


//He buscado manualmente añadir las fotso en su producto a mano, se podria automatizar 
// $mysqli->query("insert into FotosProducto (idproducto,ruta) values ( 1 , '$destino')");

echo $twig->render('validarFoto.html',[]);

?>