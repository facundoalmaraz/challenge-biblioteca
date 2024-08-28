-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bibliotecadb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bibliotecadb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bibliotecadb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `bibliotecadb` ;

-- -----------------------------------------------------
-- Table `bibliotecadb`.`_prisma_migrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bibliotecadb`.`_prisma_migrations` (
  `id` VARCHAR(36) NOT NULL,
  `checksum` VARCHAR(64) NOT NULL,
  `finished_at` DATETIME(3) NULL DEFAULT NULL,
  `migration_name` VARCHAR(255) NOT NULL,
  `logs` TEXT NULL DEFAULT NULL,
  `rolled_back_at` DATETIME(3) NULL DEFAULT NULL,
  `started_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` INT UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `bibliotecadb`.`libro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bibliotecadb`.`libro` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(191) NOT NULL,
  `autor` VARCHAR(191) NOT NULL,
  `isbn` VARCHAR(191) NOT NULL,
  `copias` INT NOT NULL DEFAULT '1',
  `disponibles` INT NOT NULL DEFAULT '1',
  `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `actualizadoEn` DATETIME(3) NOT NULL,
  `portada` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE UNIQUE INDEX `Libro_isbn_key` ON `bibliotecadb`.`libro` (`isbn` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `bibliotecadb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bibliotecadb`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(191) NOT NULL,
  `correo` VARCHAR(191) NOT NULL,
  `rol` ENUM('ADMIN', 'CLIENTE') NOT NULL DEFAULT 'CLIENTE',
  `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `actualizadoEn` DATETIME(3) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE UNIQUE INDEX `Usuario_correo_key` ON `bibliotecadb`.`usuario` (`correo` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `bibliotecadb`.`listaespera`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bibliotecadb`.`listaespera` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuarioId` INT NOT NULL,
  `libroId` INT NOT NULL,
  `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  CONSTRAINT `ListaEspera_libroId_fkey`
    FOREIGN KEY (`libroId`)
    REFERENCES `bibliotecadb`.`libro` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `ListaEspera_usuarioId_fkey`
    FOREIGN KEY (`usuarioId`)
    REFERENCES `bibliotecadb`.`usuario` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE INDEX `ListaEspera_usuarioId_fkey` ON `bibliotecadb`.`listaespera` (`usuarioId` ASC) VISIBLE;

CREATE INDEX `ListaEspera_libroId_fkey` ON `bibliotecadb`.`listaespera` (`libroId` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `bibliotecadb`.`reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bibliotecadb`.`reserva` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuarioId` INT NOT NULL,
  `libroId` INT NOT NULL,
  `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  CONSTRAINT `Reserva_libroId_fkey`
    FOREIGN KEY (`libroId`)
    REFERENCES `bibliotecadb`.`libro` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `Reserva_usuarioId_fkey`
    FOREIGN KEY (`usuarioId`)
    REFERENCES `bibliotecadb`.`usuario` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE INDEX `Reserva_usuarioId_fkey` ON `bibliotecadb`.`reserva` (`usuarioId` ASC) VISIBLE;

CREATE INDEX `Reserva_libroId_fkey` ON `bibliotecadb`.`reserva` (`libroId` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
