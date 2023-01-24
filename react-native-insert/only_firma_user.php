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
$name = $obj['name'];
$email = $obj['email'];
$phone_number = $obj['phone_number'];
$tur = $obj['tur'];
$faaliyetAlani=$obj['faaliyetAlani'];
$adres=$obj['adres'];
$basvuruDurumu=$obj['basvuruDurumu'];
 

// Kayıtlarımızı MySQL veritabanımıza ekleyecek SQL kodunu yazalım.
$Sql_Query = "INSERT INTO users (name,email,phone_number,tur) VALUES ('$name','$email','$phone_number','$tur')";
mysqli_query($con,$Sql_Query);
sleep(1);
$sql="select id from users where email='$email'";
$userId=mysqli_fetch_array(mysqli_query($con,$sql));
sleep(1);
$Sql_Query1 = "INSERT INTO company (faaliyetAlani,adres,basvuruDurumu,userId) VALUES ('$faaliyetAlani','$adres','$basvuruDurumu','$userId[0]')";
 

// Eğer verileri kaydetme başarılı olursa kullanıcıya bir mesaj gösterelim.
if(mysqli_query($con,$Sql_Query1)){
 
	$MSG = $userId[0];

	// Mesajı JSON formatına çevirelim.
	$json = json_encode($MSG); 
	// Mesajı görüntüleyelim.
	 echo $json ; 

}else{
	$MSG = 'Bir sorun oluştu!'; 
	$json = json_encode($MSG); 
 	echo $json ;  
 }
 mysqli_close($con);
?>