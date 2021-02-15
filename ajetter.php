<?php

  session_start();
  require 'classAuth.php';
  if(Auth::isLogged()){}
  else{
    header('Location: login.html');
  }
  ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1>l3foooooooooooooo</h1>
    <pre><?php
    $serveur = "localhost";
    $login = "root";
    //$pass = "root";
    try {
      $connexion = new PDO("mysql:host=$serveur;dbname=guessworld;charset=utf8", $login /*,$pass*/ );
      $connexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $email=$_SESSION['Auth']['login'];


      $result = $connexion->prepare("select PRENOM, USERNAME from register where  EMAIL='$email'");
      $result->execute();
      $tab=$result->fetchall();

      echo "Hello   ";
      print_r($tab[0]['PRENOM']);
      echo "  !";
      echo "<br>";
      echo "username : ";
      print_r($tab[0]['USERNAME']);
    }catch (PDOException $e) {

        echo 'Connexion failed : '.$e->getMessage();
    }?></pre>

    <a href="logout.php">Deconnexion</a><br><br>
    <a href="deleteaccount.php">Delete account</a>
  </body>
</html>
