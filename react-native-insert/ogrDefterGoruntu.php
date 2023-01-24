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
$gun = $obj['gun'];

//Applying User Login query with email and password match.


$Sql_Query1 = "SELECT id,konu,metin from defterogrenci where ogrId='$ogrId' and gun='$gun'";

$result = $con->query($Sql_Query1);
if (isset($result)) {
	if ($result->num_rows > 0) {
		while ($row[] = $result->fetch_assoc()) {
			$tem = $row;
			$json = json_encode($tem,);
		}
	}
} else {
	$InvalidMSG = 'YOK Kİİİ';
	$json = json_encode($InvalidMSG);
}

echo $json;

mysqli_close($con);
