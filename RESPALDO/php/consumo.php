<?

	

// recibira por post las variables, si no vienen devolvera un status false
$response = new stdClass();
$response->status = true;
//$response->msg = "-1";

	$nombre = $_POST['nombre'];
	$direccion = $_POST['codigo'];
	$telefono = $_POST['telefono'];
	$email = $_POST['email'];

	//echo $codigoValido;
	//echo strlen($codigo);
	//echo $emailValido;
	//echo $nombreValido;
		include_once 'conexion.php';
		// Prepare
		$stmt = $db->prepare("INSERT INTO sp_partitipantes (participante_nombre, participante_direccion, participante_telefono, participante_email, participante_fecha) VALUES (:nombre, :direccion, :telefono, :email, CURRENT_TIMESTAMP())");
		// Bind
		$stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
		$stmt->bindParam(':direccion', $direccion, PDO::PARAM_STR);
		$stmt->bindParam(':telefono', $telefono, PDO::PARAM_STR);
		$stmt->bindParam(':email', $email, PDO::PARAM_STR);
		// Excecute
		try {
			$stmt->execute();
			$response->status = true;
			$response->msg = "1";
			//$response->msg = "Registro Insertado con éxito";
		} catch(PDOExecption $e) {
	        $stmt->rollback();
	        $response->msg = "0";
	    }
	
	
	


echo json_encode($response);

?>