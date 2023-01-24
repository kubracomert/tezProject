<?php
 
// Importing DBConfig.php file.
include 'DBConfig.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require_once "PHPMailer/src/PHPMailer.php";
require_once "PHPMailer/src/Exception.php";
require_once "PHPMailer/src/SMTP.php";
require_once 'vendor/autoload.php';
 
// Creating connection.
$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');
 
$obj = json_decode($json,true);
 
$email = $obj['email'];
 
$kod = $obj['kod'];
 
//doğrulama kodu gönderilecek kişinin users tablosundan id sini alalım
$id = "SELECT id from users where email = '$email' ";
$userId = mysqli_fetch_array(mysqli_query($con,$id));//userId ye atayalım

$sql = "SELECT kod from concode where email = '$email' ";//concode tablosundan o kişiye ait kodu alalım
 
$vtkod = mysqli_fetch_array(mysqli_query($con,$sql));//kodu vtkod a atayalım
  

$parola=substr(md5(rand(0,90)),0,6);//rastgele bir parola atayalım
$dataToEncrypt = $parola ;
$cypherMethod = 'AES-256-CBC';
$key = random_bytes(32);
$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($cypherMethod));
$encryptedData = openssl_encrypt($dataToEncrypt, $cypherMethod, $key, $options=0, $iv);//parola metnini şifreyelim

$sqls = "UPDATE users SET pass='$encryptedData' WHERE email='$email'";//işlemlerin sonunda pass i değişim için sorgu,sonra çalıştıralacak
$sqlKey="INSERT into pass_key (userId,keyss,ivector) values ('$userId[0]','$key','$iv')";//bu da aynı şekilde sonra çalıştıralacak,pass-key tablosuna yeni eklenecek rastgeleler


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
$mail->Subject = 'Sifren Sifirlandi';
$mail->Body    = 'Yeni sifren '.$parola. 'Lutfen hesabiniza giris yaparak sifreyi degistiriniz';
$mail->AltBody = 'gudbay'; 

$sqlKeySil="DELETE from pass_key where userId='$userId[0]'";//pass_key de ki önce o kişiye ait olanlar silinsin
$sqlsilme="DELETE from concode where email='$email'";//concode da kullanılan kod silinsin yer kaplamasın
  if($vtkod[0]==$kod)
  {
      $mail->send();
      mysqli_query($con,$sqlKeySil);//önce pass_key dekileri temizleyelim
      mysqli_query($con,$sqlsilme); //kod girilmişse o da tablodan silinsin
      mysqli_query($con,$sqls);//şimdi yeni şifrelenen metin users tablosunun pass bölümüne kaydedilsin
      mysqli_query($con,$sqlKey); //şimdi de yeni anahtar ve başlatma vektörü eklensin pass_key tablosuna
      $SuccessLoginMsg ='Sifreniz Sıfırlandı.Yeni Şifre epostanıza gönderildi.';
      $SuccessLoginJson = json_encode($SuccessLoginMsg);
      echo $SuccessLoginJson ;
  }
  
  else if($vtkod[0]!=$kod){  
    $InvalidMSG = 'Yanlış Kod';
    $InvalidMSGJSon = json_encode($InvalidMSG);
    echo $InvalidMSGJSon ;
}
  else{  
      $InvalidMSG = 'Hata Oluştu.Tekrar deneyiniz.' ;
      $InvalidMSGJSon = json_encode($InvalidMSG);
      echo $InvalidMSGJSon ;
  }
 
 
 mysqli_close($con);
?>