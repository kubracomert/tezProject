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
$ogrenciemail = $obj['ogrenciemail']; 
 
//Applying User Login query with email and password match.
$Sql_Query = "select id from users where email = '$ogrenciemail' ";
 
$ogrId = mysqli_fetch_array(mysqli_query($con,$Sql_Query));

$Sql_Query1 = "select id,baslangicT,bitisT from student_app where basvuruDurumu=1 and ogrId = '$ogrId[0]'";
 
// $Sql_Query1="SELECT sa.id,do.id,sa.baslangicT,sa.bitisT,do.gun,do.konu,do.metin from defterogrenci do join student_app sa on do.ogrId=sa.ogrId where
// 		sa.basvuruDurumu=1 and do.gun=sa.baslangicT and sa.ogrId='$ogrId[0]'";
 
$result = $con->query($Sql_Query1);
  
if ($result->num_rows >0) {
 	while($row[] = $result->fetch_assoc()) {
 		$tem = $row;
 		$json = json_encode($tem,);
	}
} 
 else{  
    $InvalidMSG = 'Invalid Username or Password Please Try Again' ; 
    $json = json_encode($InvalidMSG);
 }
 echo $json;
 
 mysqli_close($con);
?>