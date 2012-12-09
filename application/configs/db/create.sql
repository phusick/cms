SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

USE `cms` ;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `users` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT ,
  `username` VARCHAR(64) NOT NULL ,
  `password` VARCHAR(40) NOT NULL ,
  `role` VARCHAR(20) NOT NULL DEFAULT 'member' ,
  `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
  `date_created` DATETIME NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `items`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `items` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT ,
  `user_id` BIGINT(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'author' ,
  `language` CHAR(2) NOT NULL DEFAULT 'cs' COMMENT 'cs || en' ,
  `type` VARCHAR(20) NOT NULL DEFAULT 'undefined' ,
  `publish` TINYINT(1) NULL DEFAULT 0 ,
  `uri` VARCHAR(100) NULL COMMENT 'URI; e.g.: name = new lollipop => example.com/post/new-lollipop' ,
  `translation_id` BIGINT(20) UNSIGNED NULL COMMENT 'a self-referencing foreign key for translations: english translation may have its czech version as its parent' ,
  `parent_id` BIGINT(20) UNSIGNED NULL ,
  `order` INT(11) NOT NULL DEFAULT 0 COMMENT 'menu order based on the principle of z-index' ,
  `date_created` DATETIME NOT NULL ,
  `date_updated` DATETIME NULL ,
  `date_start` DATETIME NULL COMMENT 'Display post on website after this date.' ,
  `date_end` DATETIME NULL ,
  `title` VARCHAR(255) NULL ,
  `data` LONGTEXT NULL COMMENT 'json encoded data' ,
  `content` LONGTEXT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_items_users` (`user_id` ASC) ,
  INDEX `fk_items_items1` (`translation_id` ASC) ,
  INDEX `fk_items_items2` (`parent_id` ASC) ,
  CONSTRAINT `fk_items_users`
    FOREIGN KEY (`user_id` )
    REFERENCES `users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_items1`
    FOREIGN KEY (`translation_id` )
    REFERENCES `items` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_items2`
    FOREIGN KEY (`parent_id` )
    REFERENCES `items` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `logs`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `logs` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT ,
  `date` DATETIME NOT NULL ,
  `priority` INT NOT NULL ,
  `message` TEXT NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
