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

$sql="SELECT comId from devletkatki  where ogrId='$ogrId'";
$comId=mysqli_fetch_array(mysqli_query($con,$sql));


//degerlendirmeFormu
// $sql1="SELECT calısanSayisi,webAdresi,IbanNo,YetkiliAdSoyad,IsletmeVergiNo from devletkatki 
// where comId='$comId[0]' and ogrId='$ogrId'";
// $ozellikler=mysqli_fetch_array(mysqli_query($con,$sql1));

$sqlfirma="SELECT u.id,u.name,c.faaliyetAlani,c.adres,u.phone_number,u.email,
d.calısanSayisi,d.webAdresi,d.IbanNo,d.YetkiliAdSoyad,d.IsletmeVergiNo
FROM users u join company c on c.userId=u.id
join devletkatki d on c.userId=d.comId
where u.tur=3 and c.userId='$comId[0]' and  d.ogrId='$ogrId' ";

$result = $con->query($sqlfirma);
 

//Eğer tablo boş ise hata mesajı gönderelim. Boş değilse verileri gösterelim.

if ($result->num_rows >0) {

 	while($row[] = $result->fetch_assoc()) {

 		$tem = $row;
 		$json = json_encode($tem,);
	}

}  

else{ 
    $msg = 'Böyle Bir Belge Bulunmamaktadır.'; 
	$json = json_encode($msg); 
}

echo $json ; 
 mysqli_close($con);
?>