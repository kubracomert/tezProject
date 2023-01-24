<?php
 
// Importing DBConfig.php file.
include 'DBConfig.php';
 
// Creating connection.
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
// Populate User email from JSON $obj array and store into $email.
$email = $obj['email'];
 
// Populate Password from JSON $obj array and store into $password.
$pass = $obj['pass'];
     
// $key="SELECT pk.keyss,pk.ivector from users u join pass_key pk on pk.userId=u.id where u.email='$email' ";
// $kesySql=mysqli_fetch_array(mysqli_query($con,$key));
// sleep(1);

// $dataToEncrypt = $pass;
// $cypherMethod = 'AES-256-CBC'; 
// $encryptedData = openssl_encrypt($dataToEncrypt, $cypherMethod, $kesySql[0], $options=0, $kesySql[1]);
// $sifreliParola= "SELECT pass from users where email = '$email'";
// $sifreliParolaSql=mysqli_fetch_array(mysqli_query($con,$sifreliParola));

// $Sql_Query = "SELECT * from users where email = '$email' and pass = '$encryptedData' ";
$Sql_Query = "SELECT * from users where email = '$email' and pass = '$pass' ";
$Sql_Query1 = "SELECT tur from users where email = '$email'";
// Executing SQL Query.
$check =mysqli_fetch_array(mysqli_query($con,$Sql_Query));
$check1=mysqli_fetch_array(mysqli_query($con,$Sql_Query1)); 
 
if(isset($check)){  
		if($check1[0]==1){
			$SuccessLoginMsg = 'Ogrenci';  
		}
		elseif($check1[0]==2){
			$SuccessLoginMsg = 'Görevli';
		}
		elseif($check1[0]==3){
			$SuccessLoginMsg = 'Firma'; 
		} 
		$SuccessLoginJson = json_encode($SuccessLoginMsg ); 
		echo $SuccessLoginJson ; 
}  
 else{
	// if($email==null || $pass==null)
	// {
	// 	$InvalidMSG = 'Lütfen Alanları Doldurunuz!' ;
	// 	// Converting the message into JSON format.
	// 	$InvalidMSGJSon = json_encode($InvalidMSG);
	// 	// Echo the message.
	// 	echo $InvalidMSGJSon ;
	// }
	// else
	 if(!isset($check1)){
		$InvalidMSG = 'Böyle bir kullanıcı bulunmamaktadır!' ;
		$InvalidMSGJSon = json_encode($InvalidMSG);
		echo $InvalidMSGJSon ;
	}
	else{
		$InvalidMSG = 'Yanlış Parola!' ;
		$InvalidMSGJSon = json_encode($InvalidMSG);
		echo $InvalidMSGJSon ;
	}
}
 
 mysqli_close($con);
//burası yeni
?>














 