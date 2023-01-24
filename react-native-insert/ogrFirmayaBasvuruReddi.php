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
$comid = $obj['comid'];
$ogrenciemail = $obj['ogrenciemail'];
$sql1="SELECT id from users where email='$ogrenciemail'";
$oId =  mysqli_fetch_array(mysqli_query($con,$sql1));
 
$sql = "UPDATE stud_com SET basvuruDurumu=0 WHERE ogrenciId='$oId[0]' and comId='$comid'";

//$sql2 = "SELECT u.id,u.name,c.faaliyetAlani,c.adres,u.phone_number,u.email FROM users u join com c on c.userId=u.id where c.userId='$comid'" ;


if(mysqli_query($con,$sql)){
    $MSG ="Başvuru geri çekildi.";
    $SuccessLoginJson = json_encode($MSG);
    echo $SuccessLoginJson ;
} 
else {
  $InvalidMSG = 'Başarısız.Tekrar Deneyiniz.';
  $InvalidMSGJSon = json_encode($InvalidMSG);
  echo $InvalidMSGJSon ;
}

mysqli_close($con);
?>