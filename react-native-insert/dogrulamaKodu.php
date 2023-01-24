<?php
 
include 'DBConfig.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require_once "PHPMailer/src/PHPMailer.php";
require_once "PHPMailer/src/Exception.php";
require_once "PHPMailer/src/SMTP.php";
//require_once 'vendor/autoload.php';
 
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
 $json = file_get_contents('php://input');
 
 $obj = json_decode($json,true);
 
$email = $obj['email'];
$str = '1234567890';
$kod = substr(str_shuffle($str), 0, 6); 
$sql = "INSERT INTO concode (email,kod) VALUES ('$email','$kod')";


$sql1 = "select id from users where email = '$email'";
$checkid= mysqli_fetch_array(mysqli_query($con,$sql1));

  $mail = new PHPMailer(true);
  $mail->SMTPDebug = 0;                      // Enable verbose debug output
  $mail->isSMTP();                                            // Send using SMTP
  $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
  $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
  $mail->Username   = 'simayckroglu@gmail.com';                     // SMTP username
  $mail->Password   = 'yagmurcan26';                               // SMTP password
  //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
  $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
  $mail->SMTPSecure = 'ssl';
  //Recipients
  $mail->setFrom('simayckroglu@gmail.com', 'Mailer');
  $mail->addAddress($email);               // // Add a recipient Name is optional
  $mail->addReplyTo('hilalkabakdelen@gmail.com', 'Information');
  
  // Content
  $mail->isHTML(true);                                  // Set email format to HTML
  $mail->Subject = 'Doğrulama Kodu';
  $mail->Body    = 'Doğrulama Kodun '.$kod.'Lütfen kimseyle paylaşmayınız.';
  $mail->AltBody = 'gudbay'; 
  $mail->send();
if(isset($checkid[0]))
{
    mysqli_query($con,$sql);    
    $SuccessLoginMsg ='E-postanıza kod gönderildi.';
    $SuccessLoginJson = json_encode($SuccessLoginMsg);
    echo $SuccessLoginJson ;
}
else{  
    $InvalidMSG = 'Hata Oluştu.Tekrar deneyiniz.' ;
    $InvalidMSGJSon = json_encode($InvalidMSG);
    echo $InvalidMSGJSon ;
}

 mysqli_close($con);
?>