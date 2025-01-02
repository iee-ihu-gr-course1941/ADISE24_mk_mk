-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 02 Ιαν 2025 στις 21:02:38
-- Έκδοση διακομιστή: 10.4.32-MariaDB
-- Έκδοση PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `ataxx`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `ataxx_board`
--

CREATE TABLE IF NOT EXISTS `ataxx_board` (
  `row` tinyint(4) NOT NULL,
  `column` tinyint(4) NOT NULL,
  `content` enum('empty','white','black') DEFAULT 'empty'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Stores the positions of the Ataxx board grid (7x7)';

INSERT INTO `ataxx_board` (`row`, `column`, `content`) VALUES
(0, 0, 'white'),  -- Player 1's piece
(0, 6, 'black'),  -- Player 2's piece
(6, 0, 'black'),  -- Player 2's piece
(6, 6, 'white');  -- Player 1's piece


-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `paiktes`
--

CREATE TABLE `paiktes` (
  `idPaikth` int(11) NOT NULL,
  `etiketaPaikth` varchar(20) NOT NULL,
  `usernamePaikth` varchar(20) NOT NULL DEFAULT 'Εισαγωγή username',
  `passwordPaikth` varchar(100) NOT NULL DEFAULT '',
  `pieceColor` enum('white','black') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `statuspaixnidiou`
--

CREATE TABLE `statuspaixnidiou` (
  `game_status` enum('not active','initialized','active','ended','aborted') NOT NULL DEFAULT 'not active',
  `current_player` enum('player1','player2') NOT NULL,
  `last_move` varchar(50) DEFAULT NULL,
  `round` int(11) DEFAULT 1,
  `winner` enum('player1','player2','draw') DEFAULT NULL,
  `last_change` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Stores the status of the Ataxx game';

UPDATE `statuspaixnidiou`
SET `game_status` = 'initialized',
    `current_player` = 'player1',
    `round` = 1,
    `last_move` = NULL,  -- No move has been made yet
    `winner` = NULL,     -- No winner yet
    `last_change` = NOW()
WHERE `game_status` = 'not active';

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `ataxx_board`
--
ALTER TABLE `ataxx_board`
  ADD PRIMARY KEY (`row`,`column`);

--
-- Ευρετήρια για πίνακα `paiktes`
--
ALTER TABLE `paiktes`
  ADD PRIMARY KEY (`idPaikth`) USING BTREE;

--
-- Ευρετήρια για πίνακα `statuspaixnidiou`
--
ALTER TABLE `statuspaixnidiou`
  ADD PRIMARY KEY (`game_status`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `paiktes`
--
ALTER TABLE `paiktes`
  MODIFY `idPaikth` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
