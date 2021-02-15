<?php

  class Auth{

    static function  isLogged()
    {
      if (isset($_SESSION['Auth']) && isset($_SESSION['Auth']['login']) && isset($_SESSION['Auth']['pass'])) {
        return true;
      }
      else {
        return false;
      }
    }
  }

?>
