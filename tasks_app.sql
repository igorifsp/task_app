DROP DATABASE IF EXISTS `task_app`;

CREATE DATABASE task_app;

USE task_app;

CREATE TABLE `users` (
  `email` VARCHAR(45) UNIQUE NOT NULL,
  `password` VARCHAR(16) NOT NULL,
  `favoriteActivity` TINYTEXT,
  `username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`email`)
);

CREATE TABLE `tasks` (
  `idTask` int AUTO_INCREMENT,
  `title` varchar(45),
  `description` TEXT,
  `isCompleted` BOOLEAN,
  `emailUser` VARCHAR(45),
  PRIMARY KEY (`idTask`),
  FOREIGN KEY (`emailUser`) REFERENCES `users` (`email`)
);


