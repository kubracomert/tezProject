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
// 
//$ogrenciemail = $obj['ogrenciemail'];
//$konu = $obj['konu'];
//$metin = $obj['metin'];
//$tarih = $obj['tarih'];
$ogrenciemail = $_POST["ogrenciemail"];
$tarih = $_POST["tarih"];	
$img_tag = $_POST["image_tag"];
$sqlsrg="SELECT id from users where email='$ogrenciemail' ";


$ogrId=mysqli_fetch_array(mysqli_query($conn,$sqlsrg));


	$target_dir = "uploads";
	
	// Generating random image name each time so image name will not be same .
	$target_dir = $target_dir . "/" .rand() . "_" . time() . ".jpeg";
	
	// Receiving image tag sent from application.

	$domain_name = "http://172.16.0.231/react-native-insert/" ;
	// Receiving image sent from Application	
	if(move_uploaded_file($_FILES['image']['tmp_name'], $target_dir)){
		
		// Adding domain name with image random name.
		$target_dir = $domain_name . $target_dir ;
		$sql1="insert into image ( ogrId,tarih,image_tag, image_path)
		 VALUES('$ogrId[0]','$tarih','$img_tag','$target_dir')";
		// Inserting data into MySQL database.
		mysqli_query($conn,$sql1);
		
		$MESSAGE = "Görüntü Başarıyla Yüklendi." ;
			
		// Printing response message on screen after successfully inserting the image .	
		echo json_encode($MESSAGE);
    }
    else{
        $mesaj='Hata oluştu yine yenideeeeen:(';
        echo json_encode($mesaj);
    }
 
 
?>