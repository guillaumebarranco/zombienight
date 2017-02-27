-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 27 Février 2017 à 00:05
-- Version du serveur :  5.7.9
-- Version de PHP :  7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `zombie`
--

-- --------------------------------------------------------

--
-- Structure de la table `players_plays`
--

DROP TABLE IF EXISTS `players_plays`;
CREATE TABLE IF NOT EXISTS `players_plays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `play_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `kills` int(11) NOT NULL,
  `nbDeaths` int(11) NOT NULL,
  `nbRea` int(11) NOT NULL,
  `headshots` int(11) NOT NULL,
  `beginLevel` int(11) NOT NULL,
  `beginPrestige` int(11) NOT NULL,
  `endLevel` int(11) NOT NULL,
  `endPrestige` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `plays`
--

DROP TABLE IF EXISTS `plays`;
CREATE TABLE IF NOT EXISTS `plays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `map` varchar(255) NOT NULL,
  `manches` smallint(6) NOT NULL,
  `game` varchar(255) NOT NULL,
  `music` tinyint(4) NOT NULL DEFAULT '0',
  `secret` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
