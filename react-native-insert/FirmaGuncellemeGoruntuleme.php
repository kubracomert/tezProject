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
$comEmail = $obj['comEmail'];
//Eğer bağlantı sağlanmazsa hata gönderelim.
if ($conn->connect_error) {

 	die("Bağlantı sağlanamadı: " . $conn->connect_error);
} 

//Tablomuzda yer alan verileri seçelim.
//$sql = "SELECT name,id,email,phone_number FROM users where tur=3"; 
$sqlId="SELECT id from users where email='$comEmail'";
$comId=mysqli_fetch_array(mysqli_query($conn,$sqlId));
$sql = "SELECT u.id,u.name,u.email,u.phone_number,c.aciklama,c.faaliyetAlani,c.adres from 
    users as u join company as c on c.userId=u.id where  u.tur=3 and c.userId='$comId[0]'";
 

$result = $conn->query($sql);
 
//Eğer tablo boş ise hata mesajı gönderelim. Boş değilse verileri gösterelim.

if ($result->num_rows >0) {

 	while($row[] = $result->fetch_assoc()) {

 		$tem = $row;
 		$json = json_encode($tem,);
	}

}  
else{
    $msg='hata oluştu çünkü bilgisayarda hilal var.';
    $json = json_encode($msg);
}


echo $json;
$conn->close();
?>
