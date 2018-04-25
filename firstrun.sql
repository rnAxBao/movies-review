drop database if exists `mymovie`;
CREATE SCHEMA `mymovie` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
CREATE TABLE `mymovie`.`account` (
  `account_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC));

