-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mar 28 Février 2017 à 16:05
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
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `players_plays`
--

INSERT INTO `players_plays` (`id`, `play_id`, `name`, `kills`, `nbDeaths`, `nbRea`, `headshots`, `beginLevel`, `beginPrestige`, `endLevel`, `endPrestige`, `timestamp`) VALUES
(8, 5, 'ronan', 527, 4, 3, 233, 27, 0, 28, 0, '2017-02-27 18:06:30'),
(9, 5, 'alexis', 689, 3, 5, 155, 31, 0, 33, 0, '2017-02-27 18:06:30'),
(10, 5, 'guillaume', 600, 3, 2, 198, 34, 2, 35, 2, '2017-02-27 18:06:30'),
(11, 6, 'ronan', 545, 1, 0, 240, 31, 0, 34, 0, '2017-02-27 18:20:27'),
(12, 6, 'alexis', 740, 1, 0, 149, 34, 0, 2, 1, '2017-02-27 18:20:27'),
(13, 6, 'guillaume', 888, 1, 0, 369, 2, 3, 8, 3, '2017-02-27 18:20:27'),
(14, 7, 'ronan', 254, 3, 1, 88, 5, 1, 7, 1, '2017-02-28 12:43:56'),
(15, 7, 'alexis', 256, 2, 2, 68, 0, 0, 0, 0, '2017-02-28 12:43:56'),
(16, 7, 'guillaume', 199, 2, 1, 67, 0, 0, 0, 0, '2017-02-28 12:43:56'),
(17, 8, 'ronan', 254, 3, 1, 88, 5, 1, 7, 1, '2017-02-28 12:44:15'),
(18, 8, 'alexis', 256, 2, 2, 68, 0, 0, 0, 0, '2017-02-28 12:44:15'),
(19, 8, 'guillaume', 199, 2, 1, 67, 0, 0, 0, 0, '2017-02-28 12:44:15'),
(20, 9, 'ronan', 254, 3, 1, 88, 5, 1, 7, 1, '2017-02-28 12:44:43'),
(21, 9, 'alexis', 256, 2, 2, 68, 0, 0, 0, 0, '2017-02-28 12:44:43'),
(22, 9, 'guillaume', 199, 2, 1, 67, 0, 0, 0, 0, '2017-02-28 12:44:43'),
(23, 0, 'ronan', 0, 0, 0, 0, 0, 0, 0, 0, '2017-02-28 12:50:53'),
(24, 0, 'alexis', 0, 0, 0, 0, 0, 0, 0, 0, '2017-02-28 12:50:53'),
(25, 0, 'guillaume', 0, 0, 0, 0, 0, 0, 0, 0, '2017-02-28 12:50:53'),
(26, 10, 'ronan', 0, 0, 0, 0, 0, 0, 0, 0, '2017-02-28 12:51:05'),
(27, 10, 'alexis', 0, 0, 0, 0, 0, 0, 0, 0, '2017-02-28 12:51:05'),
(28, 10, 'guillaume', 0, 0, 0, 0, 0, 0, 0, 0, '2017-02-28 12:51:05');

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
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `plays`
--

INSERT INTO `plays` (`id`, `map`, `manches`, `game`, `music`, `secret`, `timestamp`) VALUES
(5, 'gorod_krovi', 27, 'bo3', 1, 0, '2017-02-27 18:06:16'),
(6, 'buried', 25, 'bo2', 1, 1, '2017-02-27 18:20:27'),
(7, 'shangri-la', 14, 'bo1', 1, 0, '2017-02-28 12:43:56'),
(8, 'five', 4, 'bo1', 1, 0, '2017-02-28 12:44:15'),
(9, 'origins', 9, 'bo2', 1, 0, '2017-02-28 12:44:43'),
(10, 'five', 1, 'bo1', 0, 0, '2017-02-28 12:51:05');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
