-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 08 Ιαν 2025 στις 17:58:37
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

CREATE TABLE `ataxx_board` (
  `row` tinyint(4) NOT NULL,
  `column` tinyint(4) NOT NULL,
  `content` enum('white','black') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Stores the positions of the Ataxx board grid (7x7)';

--
-- Άδειασμα δεδομένων του πίνακα `ataxx_board`
--

INSERT INTO `ataxx_board` (`row`, `column`, `content`) VALUES
(0, 0, 'white'),
(0, 1, NULL),
(0, 2, NULL),
(0, 3, NULL),
(0, 4, NULL),
(0, 5, NULL),
(0, 6, 'black'),
(1, 0, NULL),
(1, 1, NULL),
(1, 2, NULL),
(1, 3, NULL),
(1, 4, NULL),
(1, 5, NULL),
(1, 6, NULL),
(2, 0, NULL),
(2, 1, NULL),
(2, 2, NULL),
(2, 3, NULL),
(2, 4, NULL),
(2, 5, NULL),
(2, 6, NULL),
(3, 0, NULL),
(3, 1, NULL),
(3, 2, NULL),
(3, 3, NULL),
(3, 4, NULL),
(3, 5, NULL),
(3, 6, NULL),
(4, 0, NULL),
(4, 1, NULL),
(4, 2, NULL),
(4, 3, NULL),
(4, 4, NULL),
(4, 5, NULL),
(4, 6, NULL),
(5, 0, NULL),
(5, 1, NULL),
(5, 2, NULL),
(5, 3, NULL),
(5, 4, NULL),
(5, 5, NULL),
(5, 6, NULL),
(6, 0, 'black'),
(6, 1, NULL),
(6, 2, NULL),
(6, 3, NULL),
(6, 4, NULL),
(6, 5, NULL),
(6, 6, 'white');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `paiktes`
--

CREATE TABLE `paiktes` (
  `idPaikth` varchar(16) NOT NULL,
  `etiketaPaikth` varchar(20) NOT NULL,
  `usernamePaikth` varchar(20) NOT NULL DEFAULT 'Εισαγωγή username',
  `passwordPaikth` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Άδειασμα δεδομένων του πίνακα `paiktes`
--

INSERT INTO `paiktes` (`idPaikth`, `etiketaPaikth`, `usernamePaikth`, `passwordPaikth`) VALUES
('fk4jk76FZvnZElS5', 'white', 'manos', '$2y$10$ba1mlDZ8QuM0dl4UDX1gY.7xvdYtbXsFMpo5Xxm4q2.0cF1UNpMTC'),
('v0Ffzbp7a2a6ADUO', 'black', 'markos', '$2y$10$YwhinShuVQ3XsDsU0BIglejvY/1RRe3zr3In.NuSV4br2s4IN/4Fa');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `statuspaixnidiou`
--

CREATE TABLE `statuspaixnidiou` (
  `game_status` enum('not active','initialized','active','ended','aborted') NOT NULL DEFAULT 'not active',
  `round` int(11) DEFAULT 1,
  `winner` enum('white','black','draw') DEFAULT NULL,
  `validmove` enum('yes','no') NOT NULL DEFAULT 'yes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Stores the status of the Ataxx game';

--
-- Άδειασμα δεδομένων του πίνακα `statuspaixnidiou`
--

INSERT INTO `statuspaixnidiou` (`game_status`, `round`, `winner`, `validmove`) VALUES
('not active', 0, NULL, 'yes');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
