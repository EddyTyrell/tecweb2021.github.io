<?php
    $servidor   ="localhost";
    $usuario    ="root";
    $clave      ="";
    $basedatos  ="alta_alumnos"; 

    $conexion = mysqli_connect($servidor,$usuario,$clave,$basedatos);

    mysqli_set_charset($conexion,"utf8");
?>
