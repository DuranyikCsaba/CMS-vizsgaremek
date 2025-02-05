SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT;
SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS;
SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION;
SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS `cms_vizsga`;
USE `cms_vizsga`;

CREATE TABLE `felhasznalok` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(255) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `tipus` int(11) DEFAULT 1,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO `felhasznalok` (`id`, `nev`, `jelszo`, `email`, `tel`, `tipus`, `createdAt`, `updatedAt`) VALUES
(1, 'Gamma', '$2b$10$ntcI/jdmEKrWQHhL3O/wBOsNwXIUJUuH8lLsU5crIitiiUaL4B1ie', 'aladnyulok@gmail.com', '06204300883', 1, '2024-11-25 07:39:40', '2024-11-25 07:39:40');

CREATE TABLE `hirdetesek` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `felhasznalo_id` int(5) NOT NULL,
  `megtekintesek` int(11) NOT NULL,
  `torles` tinyint(1) NOT NULL,
  `adatok` text CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `modell` text NOT NULL,
  `marka` text NOT NULL,
  `ajtok_szama` int(11) NOT NULL,
  `hengerurtartalom` float NOT NULL,
  `uzemanyag` text NOT NULL,
  `evjarat` int(11) NOT NULL,
  `kep1` text NOT NULL,
  `kep2` text NOT NULL,
  `kep3` text NOT NULL,
  `kep4` text NOT NULL,
  `kep5` text NOT NULL,
  `kep6` text NOT NULL,
  `kep7` text NOT NULL,
  `kep8` text NOT NULL,
  `kep9` text NOT NULL,
  `kep10` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE `forum_bejegyzes` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `topic` tinyint(1) NOT NULL,
  `felhasznalo_id` int(5) NOT NULL,
  `tartalom` text NOT NULL,
  `megtekintese` int(11) NOT NULL,
  `torles` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE `forum_komment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bejegyzes_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `tartalom` text NOT NULL,
  `torles` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok`(`id`),
  FOREIGN KEY (`bejegyzes_id`) REFERENCES `forum_bejegyzes`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE `markak` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `nev` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE `modellek` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `nev` varchar(50) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `marka_id` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`marka_id`) REFERENCES `markak`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nev` (`nev`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `felhasznalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `forum_bejegyzes`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `forum_komment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `hirdetesek`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `markak`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `modellek`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

COMMIT;

SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT;
SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS;
SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION;