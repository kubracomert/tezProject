<?php

// DBConfig.php dosyamızı ekleyelim.
include 'DBConfig.php';

// Bağlantıyı sağlayalım.
$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
//$mysqli->set_charset("utf8");

// Alınan JSON'ı $json değişkenine atayalım.
$json = file_get_contents('php://input');
 
// Alınan JSON'ı decode edip $obj değişkenine atayalım.
$obj = json_decode($json,true);

// JSON $obj array oluşturup isim, email ve telefon numarasını ekleyelim.

$mail = $obj['mail']; 
$name = $obj['name'];
$email = $obj['email'];
$phone_number = $obj['phone_number']; 
$faaliyetAlani=$obj['faaliyetAlani'];
$adres=$obj['adres'];
$aciklama=$obj['aciklama'];

// mysqli_query($con,$Sql_Query);
$sql="SELECT id from users where email='$mail'";
$userId=mysqli_fetch_array(mysqli_query($con,$sql));  
sleep(1);

$Sql_Query="UPDATE users SET name='$name',email='$email',phone_number='$phone_number' where email='$mail'";

$Sql_Query1="UPDATE company SET faaliyetAlani='$faaliyetAlani',adres='$adres',aciklama='$aciklama' where userId='$userId[0]'";


if(mysqli_query($con,$Sql_Query) && mysqli_query($con,$Sql_Query1))
{
    $msg="Bilgileriniz Güncellendi!";
    $json=json_encode($msg);

}
else{
    $msg="Bir Sorun Oluştu!";
    $json=json_encode($msg); 
}
echo $json;
 mysqli_close($con); 
?>