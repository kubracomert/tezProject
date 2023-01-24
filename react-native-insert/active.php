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
$email = $obj['email'];
 
// Populate Password from JSON $obj array and store into $password.
$pass = $obj['pass'];
 
//Applying User Login query with email and password match.
$Sql_Query = "select id from users where email = '$email' and pass = '$pass' ";
 
// Executing SQL Query.
$check =mysqli_fetch_array(mysqli_query($con,$Sql_Query));

$id=mysqli_query($con,$Sql_Query);//giriş yapanın idsini aldık
$Sql_Query1="update users set active='1' where id=$id";//idsi alınan kullanıcının active ni 1 yaptık
$check1=mysqli_fetch_array(mysqli_query($con,$Sql_Query1));//sorguyu çalıştırdık


$SuccessLoginMsg = 'Aktif durumda';  
$SuccessLoginJson = json_encode($SuccessLoginMsg ); 
echo $SuccessLoginJson ;
 	 


 
 mysqli_close($con);
?>