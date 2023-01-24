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
$eskipass=$obj['eskipass'];
$yenipass=$obj['yenipass'];
$yenipass1=$obj['yenipass1'];
// Populate Password from JSON $obj array and store into $password. 

//parolası değişecek olan kişinin id sini öğrenelim
$id="SELECT id from users where email='$email'";
$id =  mysqli_fetch_array(mysqli_query($con,$id));

//aynı kişinin tabloda tutulan şifrelenmiş parolasını da alalım
$sql="SELECT pass from users where email='$email'";
$pass =  mysqli_fetch_array(mysqli_query($con,$sql));
 
// //öğrendiğimiz id nin diğer tabloda ki değerlerini de öğrenelim
// $key="SELECT keyss,ivector from pass_key where userId='$id[0]'";
// $keyS=mysqli_fetch_array(mysqli_query($con,$key));
// sleep(1);
 
// $cypherMethod = 'AES-256-CBC'; 
// //edindiğimiz bilgilerle şifreyi çözelim
// $cozulmus = openssl_decrypt($pass[0], $cypherMethod, $keyS[0], $options=0, $keyS[1]); 

// //yeni girilen parolanın şifrelmesini yapalım 
// //rastgele key ve iv atandı. Onları pass_key e ekleyip öncekileri silmeyi unutma
// $dataToEncrypt = $yenipass ;
// $cypherMethod = 'AES-256-CBC';
// $key = random_bytes(32);
// $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($cypherMethod));
// $encryptedData = openssl_encrypt($dataToEncrypt, $cypherMethod, $key, $options=0, $iv);
// // $decryptedData = openssl_decrypt($encryptedData, $cypherMethod, $key, $options=0, $iv);
 

// //Applying User Login query with email and password match.
 $sql1 = "UPDATE users SET pass='$yenipass' WHERE email='$email'";




      // $key2="INSERT into pass_key (userId,keyss,ivector) values ('$id[0]','$key','$iv') ";
      // $key1="DELETE from pass_key where userId='$id[0]'";
if($eskipass==null || $yenipass==null || $yenipass1==null)
{
 $InvalidMSG = 'Lütfen Boslukları Doldurunuz' ;
 $InvalidMSGJSon = json_encode($InvalidMSG);
  echo $InvalidMSGJSon ;
  
}
else{
    if($yenipass==$yenipass1 && $pass[0]==$eskipass && $pass[0]!=$yenipass1 )
    { 
      // mysqli_query($con,$key1);
      // mysqli_query($con,$key2);
      mysqli_query($con,$sql1);
      $SuccessLoginMsg = 'Parolanız Güncellendi';
      
      // Converting the message into JSON format.
      $SuccessLoginJson = json_encode($SuccessLoginMsg);
      
      // Echo the message.
      echo $SuccessLoginJson ; 
    
    }
    else{
    
      // If the record inserted successfully then show the message.
      $InvalidMSG = 'Hata Oluştu.Tekrar deneyiniz.' ;
      
      // Converting the message into JSON format.
      $InvalidMSGJSon = json_encode($InvalidMSG);
      
      // Echo the message.
      echo $InvalidMSGJSon ;
    
    }
}
 mysqli_close($con);
?>