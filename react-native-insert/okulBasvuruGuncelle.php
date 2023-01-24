<?php
 
// Importing DBConfig.php file.
include 'DBConfig.php';
 
// Creating connection.
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
// Populate User email from JSON $obj array and store into $email.
$firmaId=$obj['firmaId'];
$email = $obj['email'];
$baslangicT= $obj['baslangicT'];
$bitisT= $obj['bitisT'];
$sql0="select id from users where email='$email'";
$id= mysqli_fetch_array(mysqli_query($con,$sql0));
sleep(1);
$a="SELECT id from student_app where ogrId='$id[0]' and basvuruDurumu=1";
$sql4con= mysqli_fetch_array(mysqli_query($con,$a));
$sql3="SELECT id from student_app where ogrId='$id[0]' and basvuruDurumu=0 ";
$sql3con= mysqli_fetch_array(mysqli_query($con,$sql3));
$durum=0;

$sql1 = "Insert into student_app (basvuruDurumu,ogrId,baslangicT,bitisT,firmaId) values ('$durum','$id[0]','$baslangicT','$bitisT','$firmaId') ";
if(!isset($sql3con) && !isset($sql4con)){
    if(mysqli_query($con,$sql1)){
      $MSG ="Başvuru Eklendi.";
      $SuccessLoginJson = json_encode($MSG);
      echo $SuccessLoginJson ;
    } 
    else {
    $InvalidMSG = 'başarısız';
    $InvalidMSGJSon = json_encode($InvalidMSG);
    echo $InvalidMSGJSon ;
  }
}
else{ 
  $InvalidMSG = 'zati başvuru var daha ne';
  $InvalidMSGJSon = json_encode($InvalidMSG);
  echo $InvalidMSGJSon ;
}
mysqli_close($con);
?>