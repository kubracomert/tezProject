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
$bir=1;

$sqlx="SELECT basvuruDurumu from stud_com where ogrenciId='$Ogrid[0]' and comId='$id'";

$basvuruDurumu =  mysqli_fetch_array(mysqli_query($con,$sqlx));
sleep(1);
// if(!isset($basvuruDurumu[0]))
// {
// 	$Sql_Query = "INSERT INTO stud_com (ogrenciId,comId,basvuruDurumu) VALUES ('$Ogrid[0]','$id','$bir')";
// 	mysqli_query($con,$Sql_Query);
// 	$MSG = '2'; 
// 	$json = json_encode($MSG); 
//  	echo $json ; 
	
// } 
if(isset($basvuruDurumu)){
	if($basvuruDurumu[0]==1)
	{
		$MSG = '1';
		
	}
	elseif($basvuruDurumu[0]==0)
	{
		$sqls = "UPDATE stud_com SET basvuruDurumu=1 where ogrenciId='$Ogrid[0]' and comId='$id'";
		mysqli_query($con,$sqls); 
		$MSG = 'Güncellendi'; 
		
	}
 }

else
{
	$Sql_Query = "INSERT INTO stud_com (ogrenciId,comId,basvuruDurumu) VALUES ('$Ogrid[0]','$id','$bir')";
	mysqli_query($con,$Sql_Query);
	$MSG = 'Başvurunuz İletildi'; 
	
}
$json = json_encode($MSG); 
echo $json ;
 mysqli_close($con);
?>