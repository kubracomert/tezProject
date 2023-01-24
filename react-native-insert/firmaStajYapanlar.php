<?php

// DBConfig.php dosyamızı ekleyelim.
include 'DBConfig.php';

// Bağlantıyı sağlayalım.
$conn = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
//$mysqli->set_charset("utf8");

// Alınan JSON'ı $json değişkenine atayalım.
$json = file_get_contents('php://input');
 
// Alınan JSON'ı decode edip $obj değişkenine atayalım.
$obj = json_decode($json,true);

// JSON $obj array oluşturup isim, email ve telefon numarasını ekleyelim.
$comEmail = $obj['comEmail']; 



$sql = "SELECT id FROM users where email='$comEmail'";
$comId=mysqli_fetch_array(mysqli_query($conn,$sql));


	
	//$ogrId=mysqli_fetch_array(mysqli_query($conn,$sql2));
	$sql1 = "SELECT id,name,email,phone_number FROM users where id in 
    (SELECT ogrenciId from stud_com where comId='$comId[0]' and basvuruDurumu=3)";
	$result = $conn->query($sql1);
 
	//Eğer tablo boş ise hata mesajı gönderelim. Boş değilse verileri gösterelim.
	if ($result->num_rows >0) {
	
		 while($row[] = $result->fetch_assoc()) {
	
			 $tem = $row;
			 $json = json_encode($tem,);
		}
	
    }
	else{

		$MSG = 'Başvuran Oğrenci Yok.'; 
	
		$json = json_encode($MSG); 
	}


echo $json;
$conn->close();
?>