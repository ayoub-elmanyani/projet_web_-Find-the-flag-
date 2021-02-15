<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Recovery password</title>
  </head>
  <body>
    <?php
    $findemail ="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";

      function securisation($val)
      {
        $val=trim($val);
        $val=stripslashes($val);
        $val=strip_tags($val);
        return $val;
      }
      if(preg_match($findemail, $_POST['email']) && strlen($_POST['email'])<=50)
      {

        $serveur = "localhost";
        $login = "root";
        //$pass = "root";
        try {
          $connexion = new PDO("mysql:host=$serveur;dbname=guessworld;port=3308;charset=utf8", $login /*,$pass*/ );
          $connexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

          $email=securisation($_POST['email']);

          $result = $connexion->prepare("select PRENOM from register where  EMAIL='$email'");
          $result->execute();
          $pren=$result->fetchColumn();

          if($pren != null)

          {
                    $random = uniqid();
                    $rand = $connexion->prepare("update register  set UNIQID='$random' where  EMAIL='$email'");
                    $rand->execute();

                    $subject='Recovery password GuessWorld';
                    $message="           \rHello    $pren  ! \n\n\nYour recovery code is :    $random  \n\n              From GameGuessWorld,";
                    $header='Content-Type: text/plain; charset="utf-8"'." ";

                    if (mail($email, $subject, $message, $header)) {
                        header('Location: codereceive.html');
                    }
                    else {
                      echo "Error : problem occurred with sending code";
                    }
          }
          else{
            header('Location: recuppasswordrepeat.html');
            exit();
          }

        }
        catch (PDOException $e) {

            echo 'Connexion failed : '.$e->getMessage();
        }
      }

      else{
        header('Location: recuppasswordrepeat.html');
        exit();
      }

      ?>
  </body>
</html>
