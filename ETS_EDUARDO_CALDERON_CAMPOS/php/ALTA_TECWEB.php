<?php


if(isset($_POST['accion'])){

	include "conexion.php";

	switch ($_POST['accion']) {
		case 'read':
			Read_PHP($conexion);
			break;
		case 'update':
			Update_PHP($conexion);
			break;
		case 'create':
			Create_PHP($conexion);
			break;
		case 'delete':
			Delete_PHP($conexion);
			break;
		default:
			$Respuesta["estado"]=0;
			$Respuesta["mensaje"]="no valido";
			echo json_encode($Respuesta);
			break;
	}

}else{
	$Respuesta["estado"]=0;
	$Respuesta["mensaje"]="Faltan Parametros";
	echo json_encode($Respuesta);
}

function Create_PHP($conexion){

  $nombre 	     	    = $_POST['nombre'];
  $programa           	= $_POST['programa'];
  $apellido_paterno 	= $_POST['apellido_paterno'];
  $apellido_materno 	= $_POST['apellido_materno'];

	$Query = "INSERT INTO alta (ID, nombre, apellido_paterno, apellido_materno, programa) VALUES (NULL, '".$nombre."',  '".$apellido_paterno."', '".$apellido_materno."', '".$programa."')";

	
	$resultado = mysqli_query($conexion,$Query);

	if($resultado>=1)
	{
		$Respuesta['estado']	 = 1; 
		$Respuesta['mensaje']	 = "registro con exito";
		$Respuesta['id']	 	 = mysqli_insert_id($conexion); 
		echo json_encode($Respuesta);
	}
	else
	{
		$Respuesta['estado']	= 0;
		$Respuesta['mensaje']	= "error";
		$Respuesta['id']		= -1; 
		echo json_encode($Respuesta);
	}
}


function Update_PHP($conexion){

  $ID  = $_POST['ID'];
	$nombre    = $_POST['nombre'];
	$programa = $_POST['programa'];
  $apellido_paterno 	= $_POST['apellido_paterno'];
  $apellido_materno 	= $_POST['apellido_materno'];


    $Query ="UPDATE alta SET  nombre='".$nombre."', apellido_paterno='".$apellido_paterno."', apellido_materno='".$apellido_materno."', programa='".$programa."' WHERE ID=".$ID;

	mysqli_query($conexion,$Query);

	if(mysqli_affected_rows($conexion)>0){
		$Respuesta['estado']=1;
		$Respuesta['mensaje']="Actualizado correctamente";
	}else{
		$Respuesta['estado']=0;
		$Respuesta['mensaje']="Error";
	}
	echo json_encode($Respuesta);

}


function Read_PHP($conexion){

	$Query 		="SELECT * FROM alta";

	$Respuesta["nuevo"]	=	array();

	$Resultado 	= mysqli_query($conexion,$Query);


	while($Renglon = mysqli_fetch_array($Resultado)){

		$Nueva_alta = array();

		$Nueva_alta["ID"]			     = $Renglon["ID"];
		$Nueva_alta["programa"]		 = $Renglon["programa"];
		$Nueva_alta["nombre"]       = $Renglon["nombre"];

		array_push($Respuesta["nuevo"], $Nueva_alta);
	}
	$Respuesta["estado"]	=1;
	$Respuesta["mensaje"]	="Consulta exitosa";

	echo json_encode($Respuesta);
}



function Delete_PHP($conexion){

	$Respuesta=array();

	if(isset($_POST['ID'])){

		$ID = $_POST['ID'];

		$Query = "DELETE FROM alta WHERE ID=".$ID;

		mysqli_query($conexion,$Query);

		if(mysqli_affected_rows($conexion)>0){
			$Respuesta["estado"]	=1;
			$Respuesta["mensaje"]	="Eliminado";

		}else{
			$Respuesta["estado"]	=0;
			$Respuesta["mensaje"]	="Error";
		}
	}else{
		$Respuesta["estado"]	=0;
		$Respuesta["mensaje"]	="Falta un id";
	}

	echo json_encode($Respuesta);
}



?>
