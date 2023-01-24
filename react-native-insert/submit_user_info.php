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
$aciklama=$obj['aciklama'];
 
$str = '1234567890';
$parola = substr(str_shuffle($str), 0, 6); 

// $dataToEncrypt = $parola ;
// $cypherMethod = 'AES-256-CBC';
// $key = random_bytes(32);
// $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($cypherMethod));
// $encryptedData = openssl_encrypt($dataToEncrypt, $cypherMethod, $key, $options=0, $iv);
// $decryptedData = openssl_decrypt($encryptedData, $cypherMethod, $key, $options=0, $iv);

// Kayıtlarımızı MySQL veritabanımıza ekleyecek SQL kodunu yazalım.
$Sql_Query = "INSERT INTO users (name,email,phone_number,tur,pass) VALUES ('$name','$email','$phone_number','$tur','$parola')";
mysqli_query($con,$Sql_Query);
sleep(1);
$sql="select id from users where email='$email'";
$userId=mysqli_fetch_array(mysqli_query($con,$sql));
sleep(1);
// $decryptedData = openssl_decrypt($encryptedData, $cypherMethod, $key, $options=0, $iv);
// $keySql="INSERT INTO pass_key (userId,keyss,ivector) VALUES ('$userId[0]','$key','$iv')";&& mysqli_query($con,$keySql)
// sleep(1);
$Sql_Query1 = "INSERT INTO company (faaliyetAlani,adres,userId,aciklama) VALUES ('$faaliyetAlani','$adres','$userId[0]','$aciklama')";
 
// Eğer verileri kaydetme başarılı olursa kullanıcıya bir mesaj gösterelim.
if(mysqli_query($con,$Sql_Query1) ){
 
	$MSG = 'Veri MySQL veritabanına başarıyla eklendi';

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