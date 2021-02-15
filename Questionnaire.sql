

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


DROP TABLE IF EXISTS `Questionnaire`;
CREATE TABLE IF NOT EXISTS`Questionnaire`(
	`id` int (11) NOT NULL  AUTO_INCREMENT,
	`pseudo` varchar(30) NOT NULL,
	`idQuestion1` int (11) NOT NULL,
	`idQuestion2` int (11) NOT NULL,
	`idQuestion3` int (11) NOT NULL,
	`idQuestion4` int (11) NOT NULL,
	`idQuestion5` int (11) NOT NULL,
	`scoore` int (11) NOT NULL,
	 PRIMARY KEY (`id`,`pseudo`)
)ENGINE=MyISAM AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `Question`;
CREATE TABLE IF NOT EXISTS `Question`(
	`idQuestion` int (11) NOT NULL AUTO_INCREMENT,
	`code` varchar(2) NOT NULL,
	`continent` varchar(256) NOT NULL,
	`pays` varchar(256) NOT NULL,
	`note` int (11) NOT NULL,
	`description` varchar(256) NOT NULL,
	`lienWiki`  varchar(256) NOT NULL,
	`urldrapeau`varchar(256) NOT NULL,
	 PRIMARY KEY (`idQuestion`)
)ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `score`;
CREATE TABLE IF NOT EXISTS `score`(
  `pseudo` varchar(256) NOT NULL,
  `niveau` int(11) NOT NULL,
  `score` int(11) NOT NULL , 
   PRIMARY KEY (`pseudo`)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;



