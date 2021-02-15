<?php
    session_start();
    $findemail ="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
    $findpassword ="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/";

      function securisation($val)
      {
        $val=trim($val);
        $val=stripslashes($val);
        $val=strip_tags($val);
        return $val;
      }
      if(preg_match($findemail, $_POST['email']) && strlen($_POST['email'])<=50 &&
        preg_match($findpassword, $_POST['password']))
      {

        $serveur = "localhost";
        $login = "root";
        //$pass = "root";
        try {
          $connexion = new PDO("mysql:host=$serveur;dbname=guessworld;port=3308;charset=utf8", $login /*,$pass*/ );
          $connexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

          $email=securisation($_POST['email']);
          $password=securisation($_POST['password']);


          $result = $connexion->prepare("select PASSWORD from register where  EMAIL='$email'");
          $result->execute();
          $password1=$result->fetchColumn();
          if($password == $password1)
          {

            $_SESSION['Auth'] = array(
              'login'=>$email,
              'pass'=>$password
            );
            print_r($_SESSION['Auth']);
            header('Location: ajetter.php');
          }
          else{
            header('Location: loginrepeat.html');
          }

        }
        catch (PDOException $e) {

            echo 'Connexion failed : '.$e->getMessage();
        }
      }

      else{
        header('Location: loginrepeat.html');
        exit();
      }

?>
