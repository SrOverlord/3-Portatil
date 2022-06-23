<?php


//__________Conexion_________________________

function conectarBD()
{

    $mysqli = new mysqli("mysql", "fran", "fran", "SIBW");
    if ($mysqli->connect_erno) {
        echo ("Fallo al conectar...");
    }

    return $mysqli;
}

// _______________Creamos Global______________
$mysqli = conectarBD();

//________________Criptos__________________

function getProducto($nombrePorducto)
{
    global $mysqli;
    //Conexion

    //Consulta
    $preparada = $mysqli->prepare("Select * from Criptos where nombre= $nombrePorducto");
    
    $preparada->execute();
    $res= $preparada->get_result();

    $producto = array(
        'id' => 'YY',
        'nombre' => 'XXX',
        'ruta' => 'AAA',
        'descripcion' => 'DDDD'
    );

    //Extraemos en array 
    if ($res->num_rows > 0) {
        $row = $res->fetch_assoc();
        $producto = array('id' => $row['id'], 'nombre' => $row['nombre'], 'ruta' => $row['ruta'], 'descripcion' => $row['descripcion']);
    }
    $preparada->close();

    return $producto;
}

function getFotosProducto($nombrePorducto)
{
    global $mysqli;
    //Consulta de id Porducto
    $preparada = $mysqli->prepare("Select id from Criptos where nombre=" . $nombrePorducto);

    
    $preparada->execute();
    $res= $preparada->get_result();

    $idproducto = array('id' => 'YY');

    //Extraemos array con su id
    if ($res->num_rows > 0) {
        $row = $res->fetch_assoc();
        $idproducto = array('id' => $row['id']);
    }

    //Consultamos la ruta de las imagenes en base a su id 
    $res2 = $mysqli->query("Select ruta from FotosProducto where idproducto=" . $idproducto['id']);
    $fotosproductos[] = array('ruta' => 'YYY');

    //Introducimos las imagenes en un array 
    while ($fila = mysqli_fetch_assoc($res2)) {
        $fotosproductos[] = array('ruta' => $fila['ruta']);
    }

    $preparada->close();
    return $fotosproductos;
}


function getProductos()
{

    global $mysqli;
    //Realizamos la consulta
    $preparada = $mysqli->prepare("SELECT * from Criptos ;");

    
    $preparada->execute();
    $res= $preparada->get_result();

    $productos = array(
        'id' => 'YY',
        'nombre' => 'XXX',
        'ruta' => 'AAA',
        'descripcion' => 'DDDD'
    );

    //Extraemos en array 
    if ($res->num_rows > 0) {
        while ($fila = mysqli_fetch_assoc($res)) {
            $productos[] = array('id' => $fila['id'], 'nombre' => $fila['nombre'], 'ruta' => $fila['ruta'],'descripcion' => $fila['descripcion']);
        }
    }
    $preparada->close();

    return $productos;
}

//__________________Comentarios__________________

function getIdProducto($nombrePorducto)
{
    global $mysqli;
    //Consulta de id Porducto
    $preparada = $mysqli->prepare("Select id from Criptos where nombre=" . $nombrePorducto);

    $preparada->execute();
    $res= $preparada->get_result();

    $idproducto = array('id' => 'YY');

    //Extraemos array con su id
    if ($res->num_rows > 0) {
        $row = $res->fetch_assoc();
        $idproducto = array('id' => $row['id']);
    }

    $preparada->close();
    return $idproducto;
}

function getNombreProducto($idProducto)
{
    global $mysqli;
    //Consulta de id Porducto
   

    $preparada = $mysqli->prepare("Select nombre from Criptos where id=" . $idProducto);

    $preparada->execute();
    $res= $preparada->get_result();

    $nombrePorducto = array('nombre' => 'YY');

    //Extraemos array con su nombre
    if ($res->num_rows > 0) {
        $row = $res->fetch_assoc();
        $nombrePorducto = array('nombre' => $row['nombre']);
    }

    $preparada->close();
    return $nombrePorducto;
}

function getComentarios($nombrePorducto)
{
    global $mysqli;
    $idproducto = getIdProducto($nombrePorducto);

    $comentarios[] = array(
        'id' => "AA",
        'nombre' => "WWW",
        'email' => "EEEE",
        'date' => "RRRR",
        'texto' => "TTTT",
        'modificado' => "UUUU"
    );

    $preparada = $mysqli->prepare("Select * from ComentarioProducto where idproducto= " . $idproducto['id']);
    $preparada->execute();
    $res= $preparada->get_result();
    if ($res->num_rows > 0) {
        while ($fila = mysqli_fetch_assoc($res)) {
            //Antes de lanzar el comentario corregiremos cualquier inyeccion de codigo 
            $fila['texto'] = inyeccionCodigoCorregir($fila['texto']);
            $comentarios[] = array(
                'id' => $fila['id'],
                'nombre' => $fila['nombre'],
                'email' => $fila['email'],
                'date' => $fila['date'],
                'texto' => $fila['texto'],
                'modificado' => $fila['modificado']
            );
        }
    }
    $preparada->close();
    return $comentarios;
}


function getComentariosPorID($idproducto)
{

    global $mysqli;
    $comentarios[] = array(
        'id' => "AA",
        'nombre' => "WWW",
        'email' => "EEEE",
        'date' => "RRRR",
        'texto' => "TTTT",
        'modificado' => "UUUU"
    );
    $preparada = $mysqli->prepare("Select * from ComentarioProducto where idproducto= " . $idproducto);
   
    $preparada->execute();
    $res= $preparada->get_result();

    if ($res->num_rows > 0) {
        while ($fila = mysqli_fetch_assoc($res)) {
            //Antes de lanzar el comentario corregiremos cualquier inyeccion de codigo 
            $fila['texto'] = inyeccionCodigoCorregir($fila['texto']);
            $comentarios[] = array(
                'id' => $fila['id'],
                'nombre' => $fila['nombre'],
                'email' => $fila['email'],
                'date' => $fila['date'],
                'texto' => $fila['texto'],
                'modificado' => $fila['modificado']
            );
        }
    }

    $preparada->close();

    return $comentarios;
}


function getTodosComentarios(){


    global $mysqli;
    //Cogemos los distintos id de Cripto
    $preparada = $mysqli->prepare("select distinct idproducto from ComentarioProducto;");

    
    $preparada->execute();
    $res= $preparada->get_result();

    $comentarios["'".getNombreProducto(1)['nombre']."'"]['nombre'] = "Hola";
    if ($res->num_rows > 0) {
        while ($fila = mysqli_fetch_assoc($res)) {
            //Antes de lanzar el comentario corregiremos cualquier inyeccion de codigo 
           $comentarios["'".getNombreProducto($fila['idproducto'])['nombre']."'"] = getComentariosPorID($fila['idproducto']);
        }
    }
    $preparada->close();

    return $comentarios;
}

function getComentario($idComentario)
{

    global $mysqli;
    $comentario = array(
        'id' => "AA",
        'nombre' => "WWW",
        'email' => "EEEE",
        'date' => "RRRR",
        'texto' => "TTTT",
        'modificado' => "UUUU",
        'idProducto' => 'IIII'
    );

    $preparada = $mysqli->prepare("Select * from ComentarioProducto where id=$idComentario");
    $preparada->execute();
    $res= $preparada->get_result();

    if ($res->num_rows > 0) {
        $fila = $res->fetch_assoc();
        $comentario = array(
            'id' => $fila['id'],
            'nombre' => $fila['nombre'],
            'email' => $fila['email'],
            'date' => $fila['date'],
            'texto' => $fila['texto'],
            'modificado' => $fila['modificado'],
            'idProducto' => $fila['idproducto']
        );
    }
    $preparada->close();
    return $comentario;
}

function eliminarComentario($id)
{
    global $mysqli;
    $mysqli->query("DELETE from ComentarioProducto where id=$id;");
}

function editarComentario($id, $comentario)
{
    global $mysqli;
    $nuevaDate = date('D, d M Y H:i:s');
    $mysqli->query(" UPDATE ComentarioProducto Set date='$nuevaDate',texto='$comentario',modificado='true' Where id=$id;");
}

function inyeccionCodigoCorregir($texto)
{
    global $mysqli;
    $texto = str_replace("<", "##", $texto);
    $texto = str_replace("/>", "_##", $texto);
    $texto = str_replace(">", "##", $texto);
    $texto = str_replace("\ ", "_##", $texto);
    return $texto;
}

function introducirComentarios($comentario)
{
    global $mysqli;
    $nuevaDate = date('D, d M Y H:i:s');
    $mysqli->query("INSERT INTO ComentarioProducto (idproducto, nombre,email,date, texto) values (" . $comentario['idProducto'] . ",'" . $comentario['nombre'] . "','" . $comentario['email'] . "', '" . $nuevaDate . "','" . $comentario['comentario'] . "');");
}



function getTacos()
{
    global $mysqli;
    $tacos[] = array('taco' => 'XXXX');

    $res = $mysqli->query("Select * from Tacos");
    if ($res->num_rows > 0) {
        while ($fila = mysqli_fetch_assoc($res)) {
            $tacos[] = array('taco' => $fila['taco']);
        }
    }
    return $tacos;
}


// ________________________Usuarios_________________________________

function login($email, $pass)
{
    global $mysqli;
    $idUsuario = "NoLogeado";

    $res = $mysqli->query("SELECT idUser,contrasena FROM Usuarios WHERE email='$email' ;");
    if ($res->num_rows > 0) {
        $fila = $res->fetch_assoc();
        if (password_verify($pass, $fila['contrasena']))
            $idUsuario = $fila['idUser'];
    }
    return $idUsuario;
}

function registrar($nombre, $email, $pass)
{
    global $mysqli;

    $passHash = password_hash($pass, PASSWORD_DEFAULT);
    $mysqli->query("INSERT INTO Usuarios ( email, nombre , contrasena) VALUES ('" . $email . "', '" . $nombre . "', '" . $passHash . "');");

    // Devolvemos el login de la base de datos ya hecho
    // Doble comprobación de proceso
    $idUsuario = login($email, $pass);
    return $idUsuario;
}

function getUsuario($idUsuario)
{

    global $mysqli;
    $usuario = array(
        'idUser' => '',
        'email' => '',
        'nombre' => '',
        'tipo' => ''
    );

    $res = $mysqli->query("SELECT idUser,email,nombre,tipo FROM Usuarios WHERE idUser='" . $idUsuario . "' ;");

    if ($res->num_rows > 0) {
        $fila = $res->fetch_assoc();
        $usuario['idUser'] = $fila['idUser'];
        $usuario['email'] = $fila['email'];
        $usuario['nombre'] = $fila['nombre'];
        $usuario['tipo'] = $fila['tipo'];
    }

    //Devolvemos ususuario
    return $usuario;
}


function updateNombre($idUsuario, $nuevoNombre)
{
    global $mysqli;
    $mysqli->query(" UPDATE Usuarios set nombre ='$nuevoNombre' where idUser=$idUsuario;");
}

function updateEmail($idUsuario, $nuevoEmail)
{
    global $mysqli;
    $mysqli->query(" UPDATE Usuarios set email ='$nuevoEmail' where idUser=$idUsuario;");
}

function updateContrasena($idUsuario, $nuevaContrasena)
{
    global $mysqli;
    $passHash = password_hash($nuevaContrasena, PASSWORD_DEFAULT);
    $mysqli->query(" UPDATE Usuarios set contrasena ='$passHash' where idUser=$idUsuario;");
}


//_________________________________Criptos /Productos____________________


function addCripto($nombre, $ruta , $descrip ){
    global $mysqli;
    $mysqli->query("INSERT into Criptos (nombre,ruta,descripcion) values ( '$nombre', '$ruta', '$descrip');");

}

function eliminarCripto($id)
{
    global $mysqli;
    $mysqli->query("DELETE from Criptos where id=$id;");
}

function editarCripto($nom, $ruta, $descrip, $id){
    global $mysqli;
    $mysqli->query("UPDATE Criptos set nombre='$nom',ruta='$ruta',descripcion='$descrip' where id=$id;");
}

function addFotoProdcuto($idPro, $ruta){
    global $mysqli;
    $mysqli->query("INSERT into FotosProducto (idproducto, ruta) values ( '$idPro','$ruta');");

}

