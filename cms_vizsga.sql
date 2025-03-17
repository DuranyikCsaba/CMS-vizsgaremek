-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 14. 19:12
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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `nev`, `jelszo`, `email`, `tel`, `tipus`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', '$2b$10$gXTULRb4XDJAimLH5WGfg.t.mp.xV34eggj5kGNm2BM44gy6/HvxC', 'admin@admin.com', '', 0, '2025-03-14 17:26:52', '2025-03-14 17:26:52'),
(2, 'Admin2', '$2b$10$yIkZiRwBuVxiIkql29xm0e4Ke6FAfAB/cDLBlqEI3G0m0T/M7oiBO', 'admin2@admin2.com', '', 0, '2025-03-14 17:28:23', '2025-03-14 17:28:23'),
(3, 'JánosMod', '$2b$10$El13hEFdyTCDtH85nqwwweR8gL7sXr/eJhFFx9fqCn4nfN4n/z55K', 'jani@jani.com', '+36205876241', 2, '2025-03-14 17:29:53', '2025-03-14 17:29:53'),
(4, 'FerencMod', '$2b$10$a4lacz/hJqFiPGEm05QcyOI4D0FnGEz9bPxFzUy5mTx9GHTSnBmz2', 'feri@feri.com', '+36208924857', 2, '2025-03-14 17:30:38', '2025-03-14 17:30:38'),
(5, 'SándorMod', '$2b$10$5z6FUrtMKWMhk8rTxJbFv.s/qi1mccPoWKeIptt4r.N6NJwu7dDKS', 'sanyi@sanyi.com', '+36202486317', 2, '2025-03-14 17:31:09', '2025-03-14 17:31:09'),
(6, 'Csabi', '$2b$10$UjSJB6ACvL5ZKrkoIHIrgeHB931sTMqVVQ4sY2j16qfTXVoaSJbaG', 'csabi@csabi.com', '+36209317842', 1, '2025-03-14 17:31:44', '2025-03-14 17:31:44'),
(7, 'Marci', '$2b$10$PGNBCHH3sNRvysyNX0U4u.RNICceLic2rymMCnmWISoW5eHdncmdy', 'marci@marci.com', '+36208524569', 1, '2025-03-14 17:34:58', '2025-03-14 17:34:58'),
(8, 'Szabi', '$2b$10$MGhNwym.0zttH2FtfuZ9X.ri8YT1VsKTFjsFO7lAh7/tIK.NZUCu.', 'szabi@szabi.com', '+36202654813', 1, '2025-03-14 17:35:32', '2025-03-14 17:35:32'),
(9, 'Bálint', '$2b$10$qwLS4M2aMKAi0ia5B/iLEeo2OmU0YJQwxwZ90m2Z.PopX0Giz3uXa', 'balint@balint.com', '+36205468790', 1, '2025-03-14 17:36:13', '2025-03-14 17:36:13'),
(10, 'Pisti', '$2b$10$dP11iujJhfdP5k6KHeKTk.uQhmVehcxdTH3QRJ/EIJWx5Q1x8tOoq', 'pisti@pisti.com', '+36205284657', 1, '2025-03-14 17:37:16', '2025-03-14 17:37:16');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hirdetesek`
--

CREATE TABLE `hirdetesek` (
  `id` int(11) NOT NULL,
  `modell` varchar(255) NOT NULL,
  `marka` varchar(255) NOT NULL,
  `ajtok_szama` int(11) NOT NULL,
  `hengerurtartalom` float NOT NULL,
  `uzemanyag` varchar(255) NOT NULL,
  `evjarat` int(11) NOT NULL,
  `futott_kilometer` int(11) NOT NULL,
  `szin` varchar(255) NOT NULL,
  `sebessegvalto_tipus` varchar(255) NOT NULL,
  `kiegeszitok` varchar(255) DEFAULT NULL,
  `muszaki_vizsga_ervenyes` datetime DEFAULT NULL,
  `baleseti_elozmenyek` varchar(255) DEFAULT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `adatok` text DEFAULT NULL,
  `ar` int(11) NOT NULL,
  `ert_telszam` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `hirdetesek`
--

INSERT INTO `hirdetesek` (`id`, `modell`, `marka`, `ajtok_szama`, `hengerurtartalom`, `uzemanyag`, `evjarat`, `futott_kilometer`, `szin`, `sebessegvalto_tipus`, `kiegeszitok`, `muszaki_vizsga_ervenyes`, `baleseti_elozmenyek`, `felhasznalo_id`, `adatok`, `ar`, `ert_telszam`, `createdAt`, `updatedAt`) VALUES
(77, 'Fiesta', 'Ford', 5, 1242, 'Benzin', 2007, 160231, 'Kék', 'Manuális', 'Klímaberendezés, Elektromos ablakok, Riasztó rendszer, CD-s autórádió,', '2026-06-17 00:00:00', 'Nincs', 6, 'Eladó egy 2007-es kék Ford Fiesta 1.3 benzines autó, amely megbízható és gazdaságos választás. Az autó jó állapotban van, rendszeresen karbantartott, alacsony futásteljesítménnyel rendelkezik, és ideális városi közlekedésre. Kérjük, érdeklődjön a részletekért!', 750000, '+36209317842', '2025-03-14 17:43:07', '2025-03-14 17:43:07'),
(78, '45', 'Rover', 5, 1396, 'Benzin', 2004, 268456, 'Zöld', 'Manuális', 'Klímaberendezés, Elektromos ablakok, Riasztó rendszer, Bluetooth autórádió, Alufelni, Nagy teljesítményű hangszórók ', '2025-04-25 00:00:00', 'Néhány karcolás található az autón', 7, 'Eladó egy 2004-es zöld Rover 45 1.4 benzines autó, amely stílusos és kényelmes választás. Az autó jó állapotban van, rendszeresen karbantartott, és ideális mindennapi használatra. Kérjük, érdeklődjön a részletekért!', 800000, '+36208524569', '2025-03-14 17:49:47', '2025-03-14 17:49:47'),
(79, 'Golf V 1.9 PDTDI', 'Volkswagen', 5, 1896, 'Dízel', 2008, 219235, 'Szürke', 'Manuális', 'Klímaberendezés, Elektromos ablakok, Riasztó rendszer, CD-s autórádió,', '2025-07-17 00:00:00', 'Nincs', 8, 'Eladó 2008-as Szürke Volkswagen Golf V 1.9 PD TDI\r\n\r\nKínálom eladásra megbízható és gazdaságos 2008-as szürke Volkswagen Golf V 1.9 PD TDI autómat. Ez az autó ideális választás mindennapi használatra, legyen szó városi közlekedésről vagy hosszabb utazásokról.', 1750000, '+36202654813', '2025-03-14 17:55:54', '2025-03-14 17:55:54'),
(80, 'Golf kettes de rósz', 'Rossz kettes golf', 3, 1685, 'Benzin/gáz', 1989, 357821, 'Piros', 'Automata', 'Olyan full extrás a kormány forog mindkét irányba héj.', '2024-10-17 00:00:00', '\"Figyeljétek a táblát\"', 9, 'Figyejide héj van egy kettesgolf héj nemkell héj?', 2147483647, '+36205468790', '2025-03-14 18:02:23', '2025-03-14 18:02:23'),
(81, '157', 'Alfa Romeo', 5, 1932, 'Dízel', 2012, 98374, 'Fekete', 'Automata', 'Klímaberendezés, Elektromos ablakok, Riasztó rendszer, CD-s autórádió, Tempomat, Fűthető ülések', '2027-06-09 00:00:00', 'Nincs', 10, 'Kínálom eladásra az ALFA ROMEO 157-es autómat, amely a stílus és a teljesítmény tökéletes kombinációját nyújtja. Ez az autó ideális választás a sportos vezetési élmény kedvelőinek.', 2345999, '+36301598763', '2025-03-14 18:08:49', '2025-03-14 18:08:49');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kepek`
--

CREATE TABLE `kepek` (
  `id` int(11) NOT NULL,
  `hirdetes_id` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kepek`
--

INSERT INTO `kepek` (`id`, `hirdetes_id`, `file_path`, `createdAt`, `updatedAt`) VALUES
(24, 77, 'uploads\\1741974187713-image1.jpg', '2025-03-14 17:43:07', '2025-03-14 17:43:07'),
(25, 77, 'uploads\\1741974187774-image5.jpg', '2025-03-14 17:43:07', '2025-03-14 17:43:07'),
(26, 77, 'uploads\\1741974187803-image11.jpg', '2025-03-14 17:43:07', '2025-03-14 17:43:07'),
(27, 78, 'uploads\\1741974587722-image4.jpg', '2025-03-14 17:49:47', '2025-03-14 17:49:47'),
(28, 78, 'uploads\\1741974587729-image6.jpg', '2025-03-14 17:49:47', '2025-03-14 17:49:47'),
(29, 78, 'uploads\\1741974587734-image7.jpg', '2025-03-14 17:49:47', '2025-03-14 17:49:47'),
(30, 78, 'uploads\\1741974587739-image8.jpg', '2025-03-14 17:49:47', '2025-03-14 17:49:47'),
(31, 78, 'uploads\\1741974587740-image10.jpg', '2025-03-14 17:49:47', '2025-03-14 17:49:47'),
(32, 79, 'uploads\\1741974954489-53d7763a-f4d6-4962-a6a4-789e388e28b2.jpg', '2025-03-14 17:55:54', '2025-03-14 17:55:54'),
(33, 79, 'uploads\\1741974954491-e451cab9-2211-479b-82ea-53696ce3ea40.jpg', '2025-03-14 17:55:54', '2025-03-14 17:55:54'),
(34, 79, 'uploads\\1741974954496-c7bbf2f7-8b76-4981-9f06-b96af7704c0f.jpg', '2025-03-14 17:55:54', '2025-03-14 17:55:54'),
(35, 80, 'uploads\\1741975343586-1d06bd4b-5454-47fb-a3dc-758785536a3d.jpg', '2025-03-14 18:02:23', '2025-03-14 18:02:23'),
(36, 80, 'uploads\\1741975343588-afa0a9d1-0a3c-494e-9783-b0d6dde7395d.jpg', '2025-03-14 18:02:23', '2025-03-14 18:02:23'),
(37, 80, 'uploads\\1741975343591-0a7fc31a-dfff-4589-b0e5-35936ab3e571.jpg', '2025-03-14 18:02:23', '2025-03-14 18:02:23'),
(38, 80, 'uploads\\1741975343594-1dd9e1e4-7a34-4f2c-8daf-b73094e59d68.jpg', '2025-03-14 18:02:23', '2025-03-14 18:02:23'),
(39, 80, 'uploads\\1741975343598-b5fe628e-dc44-4237-b3b1-6bf42fd92eaa.jpg', '2025-03-14 18:02:23', '2025-03-14 18:02:23'),
(40, 81, 'uploads\\1741975729950-34bf9277-4cc6-4515-a4e0-b52c8aa7385d.jpg', '2025-03-14 18:08:49', '2025-03-14 18:08:49'),
(41, 81, 'uploads\\1741975729952-2580d0f2-dcd8-4391-a267-062fb9443991.jpg', '2025-03-14 18:08:49', '2025-03-14 18:08:49'),
(42, 81, 'uploads\\1741975729954-5c61ce1b-ccf3-4900-96de-3872f2507dc5.jpg', '2025-03-14 18:08:49', '2025-03-14 18:08:49'),
(43, 81, 'uploads\\1741975729955-cf90cc4e-ef2d-4f81-b907-996d3396e1c0.jpg', '2025-03-14 18:08:49', '2025-03-14 18:08:49');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `komment`
--

CREATE TABLE `komment` (
  `id` int(11) NOT NULL,
  `posztId` int(11) NOT NULL,
  `felhasznaloId` int(11) NOT NULL,
  `felhasznaloNeve` text NOT NULL,
  `kommentTartalom` text NOT NULL,
  `letrehozas` datetime NOT NULL,
  `modositas` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `komment`
--

INSERT INTO `komment` (`id`, `posztId`, `felhasznaloId`, `felhasznaloNeve`, `kommentTartalom`, `letrehozas`, `modositas`) VALUES
(14, 61, 7, 'Marci', 'Szia,\n\nA vezető oldali ajtóban megtalálod egy bilétán ?', '2025-03-14 17:51:30', '2025-03-14 17:51:38'),
(15, 62, 8, 'Szabi', 'Nagyon rossz dolgokat kívánok a felhasználóknak haha hehe\n(moderátor számára törlés céljából)', '2025-03-14 17:57:38', '2025-03-14 17:57:51'),
(16, 63, 10, 'Pisti', 'Szia,\n\nKovácsvágáson keresd fel Pitykót, nem Szabolcsi de nincs messze!', '2025-03-14 18:09:47', '2025-03-14 18:09:47'),
(17, 62, 10, 'Pisti', 'Nem szabad', '2025-03-14 18:10:01', '2025-03-14 18:10:01'),
(18, 61, 10, 'Pisti', '34X, 3CVC, 3CVCWWA, 648, G, G4, H, JCC, JKB, PB, PBCR', '2025-03-14 18:11:05', '2025-03-14 18:11:05');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `poszt`
--

CREATE TABLE `poszt` (
  `id` int(11) NOT NULL,
  `felhasznaloId` int(11) NOT NULL,
  `felhasznaloNeve` text NOT NULL,
  `tartalom` text NOT NULL,
  `letrehozas` datetime NOT NULL,
  `modositas` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `poszt`
--

INSERT INTO `poszt` (`id`, `felhasznaloId`, `felhasznaloNeve`, `tartalom`, `letrehozas`, `modositas`) VALUES
(61, 6, 'Csabi', 'Sziasztok,\n\nValaki letudná írni a 2007-es kék Fiesták színkódját?\nFestéket szeretnék keverni!', '2025-03-14 17:44:50', '2025-03-14 17:44:50'),
(62, 8, 'Szabi', 'Hogy lehet az oldalra csúnya dolgokat írni?', '2025-03-14 17:56:52', '2025-03-14 17:56:52'),
(63, 9, 'Bálint', 'Szeruhéj!\n\nNem ismer valaki egy jó karosszéria lakatost Szabolcsban?\n', '2025-03-14 18:03:39', '2025-03-14 18:03:39');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`);

--
-- A tábla indexei `hirdetesek`
--
ALTER TABLE `hirdetesek`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kepek`
--
ALTER TABLE `kepek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hirdetes_id` (`hirdetes_id`);

--
-- A tábla indexei `komment`
--
ALTER TABLE `komment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posztId` (`posztId`);

--
-- A tábla indexei `poszt`
--
ALTER TABLE `poszt`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `hirdetesek`
--
ALTER TABLE `hirdetesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT a táblához `kepek`
--
ALTER TABLE `kepek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT a táblához `komment`
--
ALTER TABLE `komment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT a táblához `poszt`
--
ALTER TABLE `poszt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `kepek`
--
ALTER TABLE `kepek`
  ADD CONSTRAINT `kepek_ibfk_1` FOREIGN KEY (`hirdetes_id`) REFERENCES `hirdetesek` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `komment`
--
ALTER TABLE `komment`
  ADD CONSTRAINT `komment_ibfk_1` FOREIGN KEY (`posztId`) REFERENCES `poszt` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
