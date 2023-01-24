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
$userId = $obj['userId'];
$firmaId = $obj['firmaId'];
$durum = '1';
 
$sql = "UPDATE student_app SET basvuruDurumu='$durum' WHERE ogrId='$userId' and firmaId='$firmaId'";


if(mysqli_query($con,$sql)){
    $MSG ="Onaylandı!";
    $SuccessLoginJson = json_encode($MSG);
   echo $SuccessLoginJson ;
} 
else {
  $InvalidMSG = 'başarısız';
  $InvalidMSGJSon = json_encode($InvalidMSG);
echo $InvalidMSGJSon ;
}

mysqli_close($con);
?>