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
$gun = $obj['gun'];

//Applying User Login query with email and password match.
$Sql_Query = "select id from users where email = '$ogrenciemail' ";

$ogrId = mysqli_fetch_array(mysqli_query($con, $Sql_Query));

$kontrol = "SELECT gun from defterogrenci where ogrId='$ogrId[0]' and gun='$gun'";
$check = mysqli_fetch_array(mysqli_query($con, $kontrol));

if (isset($check)) {

    // if ($gun != '') {
        $Sql_Query1 = "SELECT do.id,do.gun,do.konu,do.metin from defterogrenci do join student_app sa on do.ogrId=sa.ogrId where
 		sa.basvuruDurumu=1 and do.gun='$gun' and sa.ogrId='$ogrId[0]'";
    // } else {
    //     $Sql_Query1 = "SELECT do.id,sa.baslangicT,do.gun,do.konu,do.metin from defterogrenci do join student_app sa on do.ogrId=sa.ogrId where
    // sa.basvuruDurumu=1 and do.gun=sa.baslangicT and sa.ogrId='$ogrId[0]'";
    // }

    //$Sql_Query1 = "select id,baslangicT,bitisT from defterogrenci where basvuruDurumu=1 and ogrId = '$ogrId[0]'";


    $result = $con->query($Sql_Query1);

    if ($result->num_rows > 0) {
        while ($row[] = $result->fetch_assoc()) {
            $tem = $row;
            $json = json_encode($tem,);
        }
    }
} else {
    $InvalidMSG = 'YOK';
    $json = json_encode($InvalidMSG);
}
echo $json;

mysqli_close($con);
