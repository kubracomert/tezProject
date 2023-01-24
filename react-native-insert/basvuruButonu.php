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
$id = $obj['id'];
$ogrenciemail = $obj['ogrenciemail']; 

$sql1="SELECT id from users where email='$ogrenciemail'";
$Ogrid =  mysqli_fetch_array(mysqli_query($con,$sql1));

// Kayıtlarımızı MySQL veritabanımıza ekleyecek SQL kodunu yazalım.



$sqlx="SELECT basvuruDurumu from stud_com where ogrenciId='$Ogrid[0]' and comId='$id'";

$dizi=mysqli_fetch_array(mysqli_query($con,$sqlx));
if(isset($dizi)){
	if($dizi[0]==1){

		$MSG = '1';

		// Mesajı JSON formatına çevirelim.
		$json = json_encode($MSG);

		// Mesajı görüntüleyelim.
		echo $json ;

}
else{
	$MSG = '0'; 
	$json = json_encode($MSG); 
 	echo $json ;  
 }
}
else
{
	$MSG = '0'; 
	$json = json_encode($MSG); 
 	echo $json ;  

}
 mysqli_close($con);
?>