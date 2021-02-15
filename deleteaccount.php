<?php
session_start();
$serveur = "localhost";
$login = "root";
//$pass = "root";
try {
  $connexion = new PDO("mysql:host=$serveur;dbname=guessworld;port=3308;charset=utf8", $login /*,$pass*/ );
  $connexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $email=$_SESSION['Auth']['login'];
  $password=$_SESSION['Auth']['pass'];
  $result = $connexion->prepare("delete from register where  EMAIL='$email' and PASSWORD='$password'");
  $result->execute();
  $_SESSION = array();
  session_destroy();
  header('Location: index.html');

}
catch (PDOException $e) {

    echo 'Connexion failed : '.$e->getMessage();
}
?>
