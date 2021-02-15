
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Sending message</title>
  </head>
  <body>
    <?php
      $findname ="/^[a-zA-ZéèîïÉÈÏÎ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÏÎ][a-zéèêàçîï]+)?$/";
      $findemail ="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
      function securisation($val)
      {
        $val=trim($val);
        $val=stripslashes($val);
        $val=strip_tags($val);
        return $val;
      }


      if(preg_match($findname, $_POST['prenom']) && preg_match($findemail, $_POST['email']) && strlen($_POST['message'])>=30 && strlen($_POST['message'])<=200){

        $to = "ayoub.el.manyani@gmail.com";
        $subject = "Message sended to GameGuessWorld";
        $name = securisation($_POST['prenom']);
        $email = securisation($_POST['email']);
        $message = securisation($_POST['message']);
        $messagetosend='Name of sender : '.$name."\n".'Email of sender : '.$email."\n".'Message : '.$message;


        $header='Content-Type: text/plain; charset="utf-8"'." ";
        mail($to,$subject,$messagetosend, $header);
        header('Location: traitementvalidation.html');
        exit();
    }
    else{
        header('Location: traitementnovalidation.html');
        close();
    }
    ?>

  </body>
</html>
