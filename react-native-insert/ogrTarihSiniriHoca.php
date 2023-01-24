<?php

// Importing DBConfig.php file.
include 'DBConfig.php';

// Creating connection.
$con = mysqli_connect($HostName, $HostUser, $HostPass, $DatabaseName);

// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');

// decoding the received JSON and store into $obj variable.
$obj = json_decode($json, true);

// Populate User email from JSON $obj array and store into $email.
$ogrId = $obj['ogrId'];

//Applying User Login query with email and password match.


$Sql_Query1 = "SELECT id,baslangicT,bitisT from student_app where basvuruDurumu=1 and ogrId = '$ogrId'";

$result = $con->query($Sql_Query1);

if (isset($result)) {
	if ($result->num_rows > 0) {
		while ($row[] = $result->fetch_assoc()) {
			$tem = $row;
			$json = json_encode($tem,);
		}
	}
} else {
	$InvalidMSG = 'Invalid Username or Password Please Try Again';
	$json = json_encode($InvalidMSG);
}
echo $json;

mysqli_close($con);
