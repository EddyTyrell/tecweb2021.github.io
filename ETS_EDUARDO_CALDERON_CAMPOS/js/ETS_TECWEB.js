// CRUD

var delete1 = 0;
var update1 = 0;

//--------- CREATE
function actionCreate(){

	var create_name_js= document.getElementById("create_name").value;
	var create_paterno_js=document.getElementById("create_paterno").value;
    var create_materno_js= document.getElementById("create_materno").value;
	var create_programa_js=document.getElementById("create_programa").value;

	$.ajax({
	  method:"POST",
	  url: "php/ALTA_TECWEB.php",
	  data: {
	  	accion:"create",
	    nombre:create_name_js,
      	apellido_materno:create_materno_js,
     	apellido_paterno:create_paterno_js,
		programa:create_programa_js
	  },
	  success: function( result ) {

	    resultJSON = JSON.parse(result);

	    if(resultJSON.estado==1){
	    	var tabla=$('#example2').DataTable();

        Botones='<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Editar" onclick="IDactualizar('+resultJSON.id+');">Actualizar</button>';
        Botones=Botones+' <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#Eliminar" onclick="IDborrar('+resultJSON.id+');">Eliminar</button>';

	  		tabla.row.add([
  			  create_programa_js,
				create_name_js,
  				Botones
  				]).draw().node().id="row_"+resultJSON.id;

          $('#new').modal('hide');
	    }else
      alert("Respuesta del servidor" + result);
	  }
	});
}




//--------- UPDATE
function actionUpdate() {

  var id = update1;
  var update_nombre_js      = document.getElementById("update_name").value;
  var update_programa_js    = document.getElementById("update_programa").value;
  var update_paterno_js  	= document.getElementById("update_paterno").value;
  var update_materno_js 	= document.getElementById("update_materno").value;

  $.ajax({
      method: "POST",
      url: "php/ALTA_TECWEB.php",
      data: {
          accion     		 : "update",
          ID         		 : id,
          nombre     		 : update_nombre_js,
          apellido_paterno   : update_paterno_js,
          apellido_materno   : update_materno_js,
		  programa           : update_programa_js
      },
      success: function(result) {
       // Console.log('hola');
		resultJSON = JSON.parse(result);
          if (resultJSON.estado == 1) {

              var tabla = $("#example2").DataTable();

              //Temporal
              renglon = tabla.row("#row_" + id).data();
              renglon[0] = update_programa_js;
              renglon[1] = update_nombre_js;

              tabla.row("#row_" + id).data(renglon);

              $('#Editar').modal('hide');
          } else
              alert(resultJSON.mensaje);

      }
  });
}




//--------- READ
function actionRead(){

	$.ajax({
	  method:"post",
	  url: "./php/ALTA_TECWEB.php",
	  data: {
	    accion: "read"
	  },
	  success: function( result ) {
	  	var resultJSON = JSON.parse(result);

	  	if(resultJSON.estado==1){

	  		var tabla=$('#example2').DataTable();

	  		resultJSON.nuevo.forEach(function(alta){

	  			Botones='<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Editar" onclick="IDactualizar('+alta.ID+');">Actualizar</button>';
	  			Botones=Botones+' <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#Eliminar" onclick="IDborrar('+alta.ID+');">Eliminar</button>';

	  			tabla.row.add([
	  				alta.programa,
	  				alta.nombre,
	  				Botones
	  				]).draw().node().id="row_"+alta.ID;

	  		});


	  	}else{

	    	alert(resultJSON.mensaje);
      }
	  }
	});
}


//DELETE
function actionDelete(){

	Borrar=delete1;

			$.ajax({
				method:"post",
				url: "php/ALTA_TECWEB.php",
				data: {
					accion: "delete",
					ID: Borrar
				},
				success: function( result ) {
					console.log(result);
					resultJSON = JSON.parse(result);

					if(resultJSON.estado==1)
					{
						
						tabla = $("#example2").DataTable();

						tabla.row("#row_"+Borrar).remove().draw();

					$('#Eliminar').modal('hide');
					}else{
						alert(resultJSON.mensaje);
					}
				}
			});

}





function IDborrar(id){
  alert("Vamos a eliminar el id : "+id);
	delete1=id;

}


//}

function IDactualizar(id){
	update1 = id;

	//Referencia a la tabla
	tabla		 = $("#example2").DataTable();

	//Referencia al contenido del renglon
	renglon			   =  tabla.row("#row_"+update1).data();

	programa         = renglon[0];
  nombre      	   = renglon[1];
  

	$("#update_programa").val(programa);
	$("#update_name").val(nombre);
  



}
