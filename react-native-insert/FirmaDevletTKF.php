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
$comEmail = $obj['comEmail'];
$ogrId = $obj['ogrId'];
$calısanSayisi = $obj['CalısanSayisi'];
$webAdresi = $obj['WebAdresi'];
$IbanNo = $obj['IbanNo'];
$YetkiliAdSoyad = $obj['YetkiliAdSoyad'];
$IsletmeVergiNo = $obj['IsletmeVergiNo'];

$sql="SELECT id from users where email='$comEmail'";
$comId=mysqli_fetch_array(mysqli_query($con,$sql));

$sql1="SELECT id from devletkatki where comId='$comId[0]' and ogrId='$ogrId'";
$kontrol=mysqli_fetch_array(mysqli_query($con,$sql1));

$sqlGuncelleme = "UPDATE devletkatki set calisanSayisi='$calısanSayisi'
 ,webAdresi='$webAdresi',IbanNo='$IbanNo',YetkiliAdSoyad='$YetkiliAdSoyad',IsletmeVergiNo='$IsletmeVergiNo'
  where comId='$comId[0]' and ogrId='$ogrId'";

 $sqlEkleme = "INSERT INTO devletkatki (comId,ogrId,calisanSayisi,webAdresi,IbanNo,YetkiliAdSoyad,IsletmeVergiNo)
     VALUES ('$comId[0]','$ogrId','$calısanSayisi','$webAdresi','$IbanNo','$YetkiliAdSoyad','$IsletmeVergiNo')";
if(!isset($kontrol)&& mysqli_query($con,$sqlEkleme))
{
    $MSG = 'Sigorta Belgesi Bilgileri Kaydedildi.'; 
	$json = json_encode($MSG); 
     

}
else if(isset($kontrol)&& mysqli_query($con,$sqlGuncelleme))
{
    $MSG = 'Sigorta Belgesi Bilgileri Güncellendi.'; 
	$json = json_encode($MSG); 
}
else{
   
    $MSG = 'Bir sorun oluştu!'; 
	$json = json_encode($MSG);
    
}

echo $json ; 
 mysqli_close($con);
?>