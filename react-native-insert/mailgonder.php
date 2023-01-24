<?php
include 'DBConfig.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require_once "PHPMailer/src/PHPMailer.php";
require_once "PHPMailer/src/Exception.php";
require_once "PHPMailer/src/SMTP.php";
require_once 'vendor/autoload.php';
$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
 
$id = $obj['id'];

$sql1="SELECT email from users where id='$id'";
$eposta =  mysqli_fetch_array(mysqli_query($con,$sql1));

$sql="SELECT pass from users where id='$id'";
$parola =  mysqli_fetch_array(mysqli_query($con,$sql));


 
 
// $key="SELECT keyss,ivector from pass_key where userId='$id'";
// $keyS=mysqli_fetch_array(mysqli_query($con,$key));
// sleep(1);
 

 
// $cypherMethod = 'AES-256-CBC';
  
// $decryptedData = openssl_decrypt($parola[0], $cypherMethod, $keyS[0], $options=0, $keyS[1]); 
 




$mail = new PHPMailer(true);
try {
  //Server settings
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
  $mail->addAddress($eposta[0]);               // // Add a recipient Name is optional
  $mail->addReplyTo('hilalkabakdelen1@gmail.com', 'Information');
  
  // Content
  $mail->isHTML(true);                                  // Set email format to HTML
  $mail->Subject = 'Sifre';
  $mail->Body    = 'Sifren '.$parola[0].' git değiiştir';
  $mail->AltBody = 'gudbay';

  $mail->send();
  $InvalidMSG = 'Parolanız e-posta adresinize gönderilmiştir!' ;
  $InvalidMSGJSon = json_encode($InvalidMSG);
  echo $InvalidMSGJSon ; 
} catch (Exception $e) {
  echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

mysqli_close($con);
?>