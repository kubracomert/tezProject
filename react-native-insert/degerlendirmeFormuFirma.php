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

$ogrId = $obj['ogrId'];
$comID = $obj['comID'];
$durum = $obj['durum'];
$durum1 = $obj['durum1'];
$durum2 = $obj['durum2'];
$durum3 = $obj['durum3'];
$durum4 = $obj['durum4'];
$durum5 = $obj['durum5'];
$durum6 = $obj['durum6'];
$durum7 = $obj['durum7'];
$durum8 = $obj['durum8'];
$durum9 = $obj['durum9'];


$sql="SELECT id from users where email='$comID'";
$comId=mysqli_fetch_array(mysqli_query($con,$sql));



//degerlendirmeFormu
// $sql1="SELECT calısanSayisi,webAdresi,IbanNo,YetkiliAdSoyad,IsletmeVergiNo from devletkatki 
// where comId='$comId[0]' and ogrId='$ogrId'";
// $ozellikler=mysqli_fetch_array(mysqli_query($con,$sql1));
$sql1="SELECT id from degerlendirmeformu where comId='$comId[0]' and ogrenciId='$ogrId'";
$kontrol=mysqli_fetch_array(mysqli_query($con,$sql1));

$sqlEkleme = "INSERT INTO degerlendirmeformu (ogrenciId,comId,soru1,soru2,soru3,soru4,soru5,soru6,soru7,soru8,soru9,soru10)
     VALUES ('$ogrId','$comId[0]','$durum','$durum1','$durum2','$durum3','$durum4','$durum5','$durum6','$durum7','$durum8','$durum9')";

$sqlGuncelleme = "UPDATE degerlendirmeformu
 SET soru1='$durum',soru2='$durum1',
soru3='$durum2',soru4='$durum3',soru5='$durum4',soru6='$durum5',soru7='$durum6',soru8='$durum7',
soru9='$durum8',soru10='$durum9'
 where ogrenciId='$ogrId' and comId='$comId[0]'";

 

//Eğer tablo boş ise hata mesajı gönderelim. Boş değilse verileri gösterelim.

if(!isset($kontrol)&& mysqli_query($con,$sqlEkleme))
{
    $MSG = 'Değerlendirme Formu Kaydedildi.'; 
	$json = json_encode($MSG); 
     

}
else if(isset($kontrol) && mysqli_query($con,$sqlGuncelleme))
{ 
   
   
    $MSG = 'Form Güncellendi!!'; 
	$json = json_encode($MSG); 
     
}
else{
   
    $MSG = 'Bir sorun oluştu!'; 
	$json = json_encode($MSG);
    
}

echo $json ; 
 mysqli_close($con);
?>