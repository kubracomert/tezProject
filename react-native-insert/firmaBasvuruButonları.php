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
$ogrenciId = $obj['ogrenciId']; 
$durum = $obj['durum'];

$sql1="SELECT id from users where email='$comEmail'";
$comId=  mysqli_fetch_array(mysqli_query($con,$sql1));

// $sqlkontrol="SELECT id from stud_com where ogrenciId='$ogrenciId' and comId='$comId[0]' and basvuruDurumu=1";


// $dizi=mysqli_fetch_array(mysqli_query($con,$sqlkontrol));
// if(isset($dizi)){
    if($durum=='onay')
        {

            $sqlo = "UPDATE stud_com SET basvuruDurumu=2 WHERE ogrenciId='$ogrenciId' and comId='$comId[0]'";
            mysqli_query($con,$sqlo);
            $MSG = 'Öğrenci Onaylandı';
            $json = json_encode($MSG);
            

        }
    else if($durum=='red')
        {
            $sqlr = "UPDATE stud_com SET basvuruDurumu=-1 WHERE ogrenciId='$ogrenciId' and comId='$comId[0]'";
            mysqli_query($con,$sqlr);
            $MSG = 'Öğrenci Reddedildi';
            $json = json_encode($MSG);
        }
    else
        {
            
            $MSG = 'Hata Oluştu';
            $json = json_encode($MSG);

        }
//     }
// else
// {   
//     $MSG = 'Başvuran Öğrenci Yok';
//     $json = json_encode($MSG);
// }    

    echo $json;
 mysqli_close($con);
?>