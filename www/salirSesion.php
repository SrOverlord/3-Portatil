<?php

//Abrimos sesion
session_start();

//Cerramos sesion y eliminamos cookies
session_destroy();

header("Location: portada.php");


