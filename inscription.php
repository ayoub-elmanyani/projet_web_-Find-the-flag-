<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Sending informations</title>
  </head>
  <body>
    <?php
    $findname ="/^[a-zA-ZéèîïÉÈÏÎ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÏÎ][a-zéèêàçîï]+)?$/";
    $findnom ="/^[a-zA-ZéèîïÉÈÏÎ][a-zA-Zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÏÎ][a-zéèêàçîï]+)?$/";
    $findusername ="/^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*$/";
    $findage ="/^(0?[3-9]|[1-9][0-9]|100)$/";
    $findemail ="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
    $findpassword ="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/";

      function securisation($val)
      {
        $val=trim($val);
        $val=stripslashes($val);
        $val=strip_tags($val);
        return $val
;      }


      if(preg_match($findname, $_POST['prenom']) && strlen($_POST['prenom'])<=25 &&
      preg_match($findnom, $_POST['nom']) && strlen($_POST['nom'])<=25 &&
      preg_match($findusername, $_POST['username']) && strlen($_POST['username'])<=15 && strlen($_POST['username'])>=5 &&
      isset($_POST['sexe']) &&
      preg_match($findage, $_POST['age']) &&
      preg_match($findemail, $_POST['email']) && strlen($_POST['email'])<=50 &&
      preg_match($findpassword, $_POST['password']) &&
      $_POST['password']==$_POST['retapepassword'])
      {

        $serveur = "localhost";
        $login = "root";
        //$pass = "root";
        try {
          $connexion = new PDO("mysql:host=$serveur;dbname=guessworld;port=3308;charset=utf8", $login /*,$pass*/ );
          $connexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    //PDO::ATTR_ERRMODE :rapport d'erreurs   PDO::ERRMODE_EXCEPTION  émet une exception

          $prenom= securisation($_POST['prenom']);
          $nom= securisation($_POST['nom']);
          $username=securisation($_POST['username']);
          $sexe=securisation($_POST['sexe']);
          $age=securisation($_POST['age']);
          $email=securisation($_POST['email']);
          $password=securisation($_POST['password']);





          $result = $connexion->prepare("select * from register where USERNAME='$username' or EMAIL='$email'");
          $result->execute();
          if ($result->fetchall() != null)
          {
            header('Location: inscriptionrepeat.html');
          }

          else{
          $codesql = "insert into register (PRENOM, NOM, USERNAME, SEXE, AGE, EMAIL, PASSWORD)
                      values ('$prenom', '$nom', '$username', '$sexe', '$age', '$email', '$password')";
          $connexion->exec($codesql);

          header('Location: traitementvalidation.html');
          exit();
          }
        }
        catch (PDOException $e) {

            echo 'Connexion failed : '.$e->getMessage();
        }
    }
    else{
        header('Location: traitementnovalidation.html');
        exit();
    }
    ?>
  </body>
</html>
