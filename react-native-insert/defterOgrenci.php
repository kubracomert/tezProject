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

$ogrEmail = $obj['ogrEmail'];
$konu = $obj['konu'];
$metin = $obj['metin'];
$tarih = $obj['tarih'];



$sql="SELECT id from users where email='$ogrEmail'";
$ogrId=mysqli_fetch_array(mysqli_query($con,$sql));



//degerlendirmeFormu
// $sql1="SELECT calısanSayisi,webAdresi,IbanNo,YetkiliAdSoyad,IsletmeVergiNo from devletkatki 
// where comId='$comId[0]' and ogrId='$ogrId'";
// $ozellikler=mysqli_fetch_array(mysqli_query($con,$sql1));
$sql1="SELECT id from defterogrenci where ogrId='$ogrId[0]' and gun='$tarih'";
$kontrol=mysqli_fetch_array(mysqli_query($con,$sql1));

$sqlEkleme = "INSERT INTO defterogrenci (ogrId,gun,konu,metin)
     VALUES ('$ogrId[0]','$tarih','$konu','$metin')";

$sqlGuncelleme = "UPDATE defterogrenci SET 
 konu='$konu' , metin='$metin' where ogrId='$ogrId[0]' and gun='$tarih'";
 

//Eğer tablo boş ise hata mesajı gönderelim. Boş değilse verileri gösterelim.

if(!isset($kontrol)&& mysqli_query($con,$sqlEkleme))
{
    $MSG = 'Rapor Kaydedildi.'; 
	$json = json_encode($MSG); 
     

}
else if(isset($kontrol)&& mysqli_query($con,$sqlGuncelleme))
{   
    

    $MSG = 'Rapor Güncellendi'; 
	$json = json_encode($MSG); 
     
}
else{
   
    $MSG = 'Bir sorun oluştu!'; 
	$json = json_encode($MSG);
    
}

echo $json ; 
 mysqli_close($con);
?>