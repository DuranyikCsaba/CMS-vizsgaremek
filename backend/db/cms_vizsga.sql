-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 27. 22:30
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `cms_vizsga`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `tipus` int(11) DEFAULT 1,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `nev`, `jelszo`, `email`, `tel`, `tipus`, `createdAt`, `updatedAt`) VALUES
(1, 'Gamma', '$2b$10$ntcI/jdmEKrWQHhL3O/wBOsNwXIUJUuH8lLsU5crIitiiUaL4B1ie', 'aladnyulok@gmail.com', '06204300883', 1, '2024-11-25 07:39:40', '2024-11-25 07:39:40');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `forum_bejegyzes`
--

CREATE TABLE `forum_bejegyzes` (
  `id` int(5) NOT NULL,
  `topic` tinyint(1) NOT NULL,
  `felhasznalo_id` int(5) NOT NULL,
  `tartalom` text NOT NULL,
  `letrehozas` datetime NOT NULL,
  `modositas` datetime NOT NULL,
  `megtekintese` int(11) NOT NULL,
  `torles` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `forum_komment`
--

CREATE TABLE `forum_komment` (
  `id` int(11) NOT NULL,
  `bejegyzes_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `tartalom` text NOT NULL,
  `letrehozas` datetime NOT NULL,
  `modositas` datetime NOT NULL,
  `torles` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hirdetesek`
--

CREATE TABLE `hirdetesek` (
  `id` int(5) NOT NULL,
  `felhasznalo_id` int(5) NOT NULL,
  `letrehozas` datetime NOT NULL,
  `modositas` datetime NOT NULL,
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
  `kep10` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `hirdetesek`
--

INSERT INTO `hirdetesek` (`id`, `felhasznalo_id`, `letrehozas`, `modositas`, `megtekintesek`, `torles`, `adatok`, `modell`, `marka`, `ajtok_szama`, `hengerurtartalom`, `uzemanyag`, `evjarat`, `kep1`, `kep2`, `kep3`, `kep4`, `kep5`, `kep6`, `kep7`, `kep8`, `kep9`, `kep10`) VALUES
(0, 0, '2024-12-04 22:20:09', '2024-12-04 22:20:09', 0, 0, '', '', '', 0, 0, '', 0, '', '', '', '', '', '', '', '', '', ''),
(0, 0, '2024-12-04 22:22:15', '2024-12-04 22:22:15', 0, 0, 'rover 45 gondos férfi tulaj nem dohányzó', '', '', 0, 0, '', 0, '', '', '', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `markak`
--

CREATE TABLE `markak` (
  `id` int(5) NOT NULL,
  `nev` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `modellek`
--

CREATE TABLE `modellek` (
  `id` int(5) NOT NULL,
  `nev` varchar(50) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `marka_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nev` (`nev`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
