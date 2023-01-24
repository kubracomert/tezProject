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
$ogrenciemail = $obj['ogrenciemail'];

//Applying User Login query with email and password match.
$Sql_Query = "SELECT id from users where email = '$ogrenciemail' ";

$ogrId = mysqli_fetch_array(mysqli_query($con, $Sql_Query));

$Sql_Query1 = "SELECT basvuruDurumu from student_app where ogrId = '$ogrId[0]'";

$result = mysqli_fetch_array(mysqli_query($con, $Sql_Query1));
if (isset($result)) {
    if ($result[0] == 1) {
        $InvalidMSG = 'Kabul';
    } else {
        $InvalidMSG = 'Red';
    }
} else {
    $InvalidMSG = 'Hiç başvuru bulunmamakta!';
}
$json = json_encode($InvalidMSG);
echo $json;

mysqli_close($con);
