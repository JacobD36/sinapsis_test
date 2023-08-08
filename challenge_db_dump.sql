CREATE TABLE `campania` ( 
  `idCampania` INT AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(200) NOT NULL,
  `idUsuario` INT NULL DEFAULT 'NULL' ,
  `fechaHoraProgramacion` DATETIME NOT NULL,
  `estado` TINYINT NOT NULL DEFAULT 1 ,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`idCampania`)
);
CREATE TABLE `cliente` ( 
  `idCliente` INT AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `estado` TINYINT NOT NULL DEFAULT 1 ,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`idCliente`)
);
CREATE TABLE `mensaje` ( 
  `idMensaje` INT AUTO_INCREMENT NOT NULL,
  `idCampania` INT NOT NULL,
  `estadoEnvio` INT NOT NULL DEFAULT 1  COMMENT '1: Pendiente, 2: Enviado, 3: Error' ,
  `fechaHoraEnvio` DATETIME NOT NULL,
  `mensaje` VARCHAR(160) NOT NULL,
  `estado` TINYINT NOT NULL DEFAULT 1 ,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`idMensaje`)
);
CREATE TABLE `usuario` ( 
  `idUsuario` INT AUTO_INCREMENT NOT NULL,
  `idCliente` INT NULL DEFAULT 'NULL' ,
  `usuario` VARCHAR(30) NOT NULL,
  `estado` TINYINT NOT NULL DEFAULT 1 ,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`idUsuario`)
);
SET FOREIGN_KEY_CHECKS = 0;
INSERT INTO `campania` (`idCampania`, `nombre`, `idUsuario`, `fechaHoraProgramacion`, `estado`, `createdAt`, `updatedAt`) VALUES (1, 'CLARO', 1, '2023-12-01 00:00:00', 1, '2023-08-08 17:21:15', '2023-08-08 17:21:15');
INSERT INTO `campania` (`idCampania`, `nombre`, `idUsuario`, `fechaHoraProgramacion`, `estado`, `createdAt`, `updatedAt`) VALUES (2, 'CLARO', 2, '2023-12-01 00:00:00', 1, '2023-08-08 17:21:26', '2023-08-08 17:21:26');
INSERT INTO `campania` (`idCampania`, `nombre`, `idUsuario`, `fechaHoraProgramacion`, `estado`, `createdAt`, `updatedAt`) VALUES (3, 'CLARO-MOVILES', 3, '2023-09-15 00:00:00', 1, '2023-08-08 17:21:44', '2023-08-08 17:21:44');
INSERT INTO `campania` (`idCampania`, `nombre`, `idUsuario`, `fechaHoraProgramacion`, `estado`, `createdAt`, `updatedAt`) VALUES (4, 'CLARO-MOVILES', 1, '2023-09-15 00:00:00', 1, '2023-08-08 17:21:50', '2023-08-08 17:21:50');
INSERT INTO `campania` (`idCampania`, `nombre`, `idUsuario`, `fechaHoraProgramacion`, `estado`, `createdAt`, `updatedAt`) VALUES (5, 'ENTEL-EMPRESAS', 5, '2023-11-11 00:00:00', 1, '2023-08-08 17:22:10', '2023-08-08 17:22:10');
INSERT INTO `campania` (`idCampania`, `nombre`, `idUsuario`, `fechaHoraProgramacion`, `estado`, `createdAt`, `updatedAt`) VALUES (6, 'ENTEL-POWER', 6, '2023-10-15 00:00:00', 1, '2023-08-08 17:22:31', '2023-08-08 17:22:31');
INSERT INTO `cliente` (`idCliente`, `nombre`, `estado`, `createdAt`, `updatedAt`) VALUES (1, 'ADRIANA CALLE MORALES', 1, '2023-08-08 17:18:02', '2023-08-08 17:18:02');
INSERT INTO `cliente` (`idCliente`, `nombre`, `estado`, `createdAt`, `updatedAt`) VALUES (2, 'RAQUEL CORO COBA', 1, '2023-08-08 17:18:13', '2023-08-08 17:18:13');
INSERT INTO `cliente` (`idCliente`, `nombre`, `estado`, `createdAt`, `updatedAt`) VALUES (3, 'SAUL DIAZ LEÓN', 1, '2023-08-08 17:18:23', '2023-08-08 17:18:23');
INSERT INTO `mensaje` (`idMensaje`, `idCampania`, `estadoEnvio`, `fechaHoraEnvio`, `mensaje`, `estado`, `createdAt`, `updatedAt`) VALUES (1, 1, 1, '2023-12-15 00:00:00', 'Este es un mensaje de prueba para campaña CLARO nro. 1', 1, '2023-08-08 17:23:46', '2023-08-08 17:23:46');
INSERT INTO `mensaje` (`idMensaje`, `idCampania`, `estadoEnvio`, `fechaHoraEnvio`, `mensaje`, `estado`, `createdAt`, `updatedAt`) VALUES (2, 5, 1, '2023-11-12 00:00:00', 'Este es un mensaje de prueba para campaña ENTEL-EMPRESAS nro. 2', 1, '2023-08-08 17:24:12', '2023-08-08 17:24:12');
INSERT INTO `mensaje` (`idMensaje`, `idCampania`, `estadoEnvio`, `fechaHoraEnvio`, `mensaje`, `estado`, `createdAt`, `updatedAt`) VALUES (3, 3, 1, '2023-09-15 00:00:00', 'Este es un mensaje de prueba para campaña CLARO-MOVILES nro. 3', 1, '2023-08-08 17:24:42', '2023-08-08 17:24:42');
INSERT INTO `usuario` (`idUsuario`, `idCliente`, `usuario`, `estado`, `createdAt`, `updatedAt`) VALUES (1, 1, 'CARLOS ANGLAS MORALES', 1, '2023-08-08 17:18:51', '2023-08-08 17:18:51');
INSERT INTO `usuario` (`idUsuario`, `idCliente`, `usuario`, `estado`, `createdAt`, `updatedAt`) VALUES (2, 1, 'JASMINE BLANCO PUMA', 1, '2023-08-08 17:19:03', '2023-08-08 17:19:03');
INSERT INTO `usuario` (`idUsuario`, `idCliente`, `usuario`, `estado`, `createdAt`, `updatedAt`) VALUES (3, 2, 'ETHEL CORNEJO RIVERA', 1, '2023-08-08 17:19:17', '2023-08-08 17:19:17');
INSERT INTO `usuario` (`idUsuario`, `idCliente`, `usuario`, `estado`, `createdAt`, `updatedAt`) VALUES (4, 2, 'MONICA DEL VALLE ARIAS', 1, '2023-08-08 17:19:30', '2023-08-08 17:19:30');
INSERT INTO `usuario` (`idUsuario`, `idCliente`, `usuario`, `estado`, `createdAt`, `updatedAt`) VALUES (5, 3, 'LISBETH CRISOSTOMO PALOMINO', 1, '2023-08-08 17:20:15', '2023-08-08 17:20:15');
INSERT INTO `usuario` (`idUsuario`, `idCliente`, `usuario`, `estado`, `createdAt`, `updatedAt`) VALUES (6, 3, 'DANNA ARDILES ROJAS', 1, '2023-08-08 17:20:25', '2023-08-08 17:20:25');
SET FOREIGN_KEY_CHECKS = 1;
ALTER TABLE `campania` ADD CONSTRAINT `campania_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `mensaje` ADD CONSTRAINT `mensaje_ibfk_1` FOREIGN KEY (`idCampania`) REFERENCES `campania` (`idCampania`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE;
