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

$json = file_get_contents('php://input');
 
// Alınan JSON'ı decode edip $obj değişkenine atayalım.
$obj = json_decode($json,true);

// JSON $obj array oluşturup isim, email ve telefon numarasını ekleyelim.
$ogrenciId = $obj['ogrenciId'];
//Eğer bağlantı sağlanmazsa hata gönderelim.
if ($conn->connect_error) {

 	die("Bağlantı sağlanamadı: " . $conn->connect_error);
} 

//Tablomuzda yer alan verileri seçelim.
//$sql = "SELECT name,id,email,phone_number FROM users where tur=3"; 

$sql = "SELECT u.id,u.name,u.email,u.phone_number,c.aciklama,c.faaliyetAlani,c.adres,sa.baslangicT,sa.bitisT from 
    users as u join company as c on c.userId=u.id join
    student_app as sa on sa.firmaId=u.id where sa.basvuruDurumu=0 and u.tur=3 and sa.ogrId='$ogrenciId'";
 

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
