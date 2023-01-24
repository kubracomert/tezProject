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
//$sql = "SELECT name,id,email,phone_number FROM users where tur=3";
$sql = "SELECT u.id,u.name,c.faaliyetAlani,c.adres,u.phone_number,u.email,c.basvuruDurumu,c.aciklama 
        FROM users u join company c on c.userId=u.id where u.tur=3 and c.basvuruDurumu=0";

$result = $conn->query($sql);
 
//Eğer tablo boş ise hata mesajı gönderelim. Boş değilse verileri gösterelim.

if ($result->num_rows >0) {

 	while($row[] = $result->fetch_assoc()) {

 		$tem = $row;
 		$json = json_encode($tem,);
	}

}  

echo $json;
$conn->close();
?>
