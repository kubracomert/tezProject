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
$durum = '1';
 
$sql = "UPDATE company SET basvuruDurumu='$durum' WHERE userId='$userId'";


if(mysqli_query($con,$sql)){
    $MSG ="Onaylananlar Listesine Eklendi";
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