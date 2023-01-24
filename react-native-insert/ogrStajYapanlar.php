<?php
 
//Host ismimiz.
$HostName = "localhost";
 
//Veritabanımızın ismi.
$DatabaseName = "react-native-insert";
 
//Veritabanı kulanıcı adımız.
$HostUser = "root";
 
//Veritabanı şifremiz. Eğer yok ise boş bırakın.
$HostPass = "";

//Bağlantıyı sağlayalım.
$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
 
//Eğer bağlantı sağlanmazsa hata gönderelim.
if ($conn->connect_error) {

 	die("Bağlantı sağlanamadı: " . $conn->connect_error);
} 

//Tablomuzda yer alan verileri seçelim.
$sql = "SELECT u.name,u.id,sa.firmaId,u.email FROM users u join student_app sa on u.id=sa.ogrId where u.tur='1' and sa.basvuruDurumu='1'";
 
$result = $conn->query($sql);
 
//Eğer tablo boş ise hata mesajı gönderelim. Boş değilse verileri gösterelim.
if ($result->num_rows >0) {

 	while($row[] = $result->fetch_assoc()) {

 		$tem = $row;
 		$json = json_encode($tem,);
	}

} else {

 	echo "Bulunamadi";
}

echo $json;
$conn->close();
?>