-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-03-2023 a las 16:44:26
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reservas_de_equipos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id_equipo` int(11) NOT NULL,
  `serial` int(3) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `fecha_de_adquisicion` date NOT NULL,
  `estatus` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id_equipo`, `serial`, `nombre`, `descripcion`, `fecha_de_adquisicion`, `estatus`) VALUES
(1, 101, 'Computadora', 'CPU Soneview 4GB RAM / 320GB', '2023-03-20', 'Ocupado'),
(2, 102, 'Laptop', 'Equipo de 16 GB de RAM - Marca HP', '2023-03-19', 'Ocupado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `espacios`
--

CREATE TABLE `espacios` (
  `id_espacio` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `direccion` varchar(70) NOT NULL,
  `estatus` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `espacios`
--

INSERT INTO `espacios` (`id_espacio`, `nombre`, `descripcion`, `direccion`, `estatus`) VALUES
(1, 'Audio Visuales', 'Sala 3x3 con aire acondicionado', 'Av Principal calle siempre viva', 'Ocupado'),
(2, 'Sala de Computo', 'Sala 5x5 con aire acondicionado', 'AV 2 con calle 13 edificios verdes', 'Ocupado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_tecnico`
--

CREATE TABLE `personal_tecnico` (
  `id_pt` int(11) NOT NULL,
  `cedula` int(8) NOT NULL,
  `nombre_y_apellido` varchar(45) NOT NULL,
  `cargo` varchar(30) NOT NULL,
  `usuario` varchar(10) NOT NULL,
  `clave` varchar(15) NOT NULL,
  `especialidad` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personal_tecnico`
--

INSERT INTO `personal_tecnico` (`id_pt`, `cedula`, `nombre_y_apellido`, `cargo`, `usuario`, `clave`, `especialidad`) VALUES
(1, 22123456, 'Arturo Bermeja Suarez', 'Ing. Computacion', 'arturito', 'excalibur', 'Servicio Tecnico'),
(2, 33456789, 'Chapulin Charles Colorado', 'Ing. Computacion', 'ramon', '123', 'Servicio Tecnico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL,
  `id_solicitante` int(11) NOT NULL,
  `fecha_de_inicio` date NOT NULL,
  `fecha_de_culminacion` date NOT NULL,
  `motivo` varchar(50) NOT NULL,
  `id_pt` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `id_espacio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id_reserva`, `id_solicitante`, `fecha_de_inicio`, `fecha_de_culminacion`, `motivo`, `id_pt`, `id_equipo`, `id_espacio`) VALUES
(1, 1, '2023-03-20', '2023-03-23', 'Edicion de Video', 1, 1, 1),
(2, 2, '2023-03-19', '2023-03-24', 'Creacion de Programa', 2, 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitantes`
--

CREATE TABLE `solicitantes` (
  `id_solicitante` int(11) NOT NULL,
  `cedula` int(8) NOT NULL,
  `nombre_y_apellido` varchar(45) NOT NULL,
  `fecha_de_nacimiento` date NOT NULL,
  `direccion` varchar(70) NOT NULL,
  `usuario` varchar(10) NOT NULL,
  `clave` varchar(15) NOT NULL,
  `telefono` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solicitantes`
--

INSERT INTO `solicitantes` (`id_solicitante`, `cedula`, `nombre_y_apellido`, `fecha_de_nacimiento`, `direccion`, `usuario`, `clave`, `telefono`) VALUES
(1, 12122122, 'Lolita Fresa', '2002-11-11', 'Carvajal Sector Cantarrana Edo. Trujillo', 'lola', '123', '04240555555'),
(2, 21211211, 'Carmen Alvarez', '2000-12-12', 'Valera las Acacias Edificio Cierra Aventura', 'alv', '123', '04141211231');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajos`
--

CREATE TABLE `trabajos` (
  `id_trabajo` int(11) NOT NULL,
  `fecha_de_inicio` date NOT NULL,
  `fecha_de_culminacion` date NOT NULL,
  `id_pt` int(11) NOT NULL,
  `id_reservas` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `trabajo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trabajos`
--

INSERT INTO `trabajos` (`id_trabajo`, `fecha_de_inicio`, `fecha_de_culminacion`, `id_pt`, `id_reservas`, `id_equipo`, `trabajo`) VALUES
(1, '2023-03-20', '2023-03-23', 1, 1, 1, 'Edicion de Video'),
(2, '2023-03-19', '2023-03-24', 2, 2, 2, 'Programacion');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id_equipo`);

--
-- Indices de la tabla `espacios`
--
ALTER TABLE `espacios`
  ADD PRIMARY KEY (`id_espacio`);

--
-- Indices de la tabla `personal_tecnico`
--
ALTER TABLE `personal_tecnico`
  ADD PRIMARY KEY (`id_pt`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `fk_reserva_pt` (`id_pt`),
  ADD KEY `fk_reserva_solicitante` (`id_solicitante`),
  ADD KEY `fk_reserva_equipo` (`id_equipo`),
  ADD KEY `fk_reserva_espacio` (`id_espacio`);

--
-- Indices de la tabla `solicitantes`
--
ALTER TABLE `solicitantes`
  ADD PRIMARY KEY (`id_solicitante`);

--
-- Indices de la tabla `trabajos`
--
ALTER TABLE `trabajos`
  ADD PRIMARY KEY (`id_trabajo`),
  ADD KEY `fk_trabajo_pt` (`id_pt`),
  ADD KEY `fk_trabajo_reserva` (`id_reservas`),
  ADD KEY `fk_trabajo_equipo` (`id_equipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `espacios`
--
ALTER TABLE `espacios`
  MODIFY `id_espacio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `personal_tecnico`
--
ALTER TABLE `personal_tecnico`
  MODIFY `id_pt` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `solicitantes`
--
ALTER TABLE `solicitantes`
  MODIFY `id_solicitante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `trabajos`
--
ALTER TABLE `trabajos`
  MODIFY `id_trabajo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `fk_reserva_equipo` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`),
  ADD CONSTRAINT `fk_reserva_espacio` FOREIGN KEY (`id_espacio`) REFERENCES `espacios` (`id_espacio`),
  ADD CONSTRAINT `fk_reserva_pt` FOREIGN KEY (`id_pt`) REFERENCES `personal_tecnico` (`id_pt`),
  ADD CONSTRAINT `fk_reserva_solicitante` FOREIGN KEY (`id_solicitante`) REFERENCES `solicitantes` (`id_solicitante`);

--
-- Filtros para la tabla `trabajos`
--
ALTER TABLE `trabajos`
  ADD CONSTRAINT `fk_trabajo_equipo` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`),
  ADD CONSTRAINT `fk_trabajo_pt` FOREIGN KEY (`id_pt`) REFERENCES `personal_tecnico` (`id_pt`),
  ADD CONSTRAINT `fk_trabajo_reserva` FOREIGN KEY (`id_reservas`) REFERENCES `reservas` (`id_reserva`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
