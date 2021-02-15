<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Recovery password</title>
  </head>
  <body>
    <?php

        $findpassword ="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/";

        function securisation($val)
        {
          $val=trim($val);
          $val=stripslashes($val);
          $val=strip_tags($val);
          return $val;
        }


        $serveur = "localhost";
        $login = "root";
        //$pass = "root";
        try {
          $connexion = new PDO("mysql:host=$serveur;dbname=guessworld;port=3308;charset=utf8", $login /*,$pass*/ );
          $connexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


          $code=securisation($_POST['code']);
          $password=securisation($_POST['newpassword']);


          $sql = $connexion->prepare("select UNIQID from register where  UNIQID='$code'");
          $sql->execute();
          $result=$sql->fetchColumn();

          if($result != null && preg_match($findpassword, $password))
          {
            $sql1 = $connexion->prepare("update register  set PASSWORD='$password' where  UNIQID='$code'");
            $sql1->execute();
            $sql2 = $connexion->prepare("update register  set UNIQID=null where  UNIQID='$code'");
            $sql2->execute();
            header('Location: traitementvalidation.html');
          }
          else{
            header('Location: traitementnovalidation.html');
          }

        }
        catch (PDOException $e) {

            echo 'Connexion failed : '.$e->getMessage();
        }
      ?>
  </body>
</html>
$uniq=securisation($_POST['code']);
$result = $connexion->prepare("select UNIQID from register where  UNIQID='$uniq'");
$result->execute();
$code=$result->fetchColumn();

        if($code != null && $code != '0'){


        }
