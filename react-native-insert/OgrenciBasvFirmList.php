<?php
 
include 'DBConfig.php';
 
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
 $json = file_get_contents('php://input');
 
 $obj = json_decode($json,true);
 
if ($con->connect_error) {

 	die("Bağlantı sağlanamadı: " . $con->connect_error);
} 
$ogrenciemail = $obj['ogrenciemail'];
$sql1 = "SELECT id FROM users where email='$ogrenciemail'";
$oid = mysqli_fetch_array(mysqli_query($con,$sql1));

	$sql3 ="SELECT  u.id,u.name,u.email,u.phone_number,c.faaliyetAlani,c.adres from users u join company c on u.id=c.userId
		where c.basvuruDurumu=1 and u.id 
		in(SELECT comId FROM stud_com where ogrenciId='$oid[0]' and basvuruDurumu=1)";
		
	$result1 = $con->query($sql3);

	if ($result1->num_rows >0) {
		while($row[] = $result1->fetch_assoc()) {

		$tem = $row;
		$json = json_encode($tem,);
		}
	}
	elseif(isset($result1)){
		$msg="Veri Yok";
		$json = json_encode($msg);

	}

echo $json;
$con->close();
?>