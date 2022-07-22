-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: gimnasiobd.cjv7mg1cwgaz.us-east-1.rds.amazonaws.com    Database: gimnasio
-- ------------------------------------------------------
-- Server version	5.5.5-10.5.13-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `idadmin` int(12) NOT NULL AUTO_INCREMENT,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(230) NOT NULL,
  PRIMARY KEY (`idadmin`),
  UNIQUE KEY `correo` (`correo`),
  UNIQUE KEY `correo_2` (`correo`),
  UNIQUE KEY `correo_3` (`correo`),
  UNIQUE KEY `correo_4` (`correo`),
  UNIQUE KEY `correo_5` (`correo`),
  UNIQUE KEY `correo_6` (`correo`),
  UNIQUE KEY `correo_7` (`correo`),
  UNIQUE KEY `correo_8` (`correo`),
  UNIQUE KEY `correo_9` (`correo`),
  UNIQUE KEY `correo_10` (`correo`),
  UNIQUE KEY `correo_11` (`correo`),
  UNIQUE KEY `correo_12` (`correo`),
  UNIQUE KEY `correo_13` (`correo`),
  UNIQUE KEY `correo_14` (`correo`),
  UNIQUE KEY `correo_15` (`correo`),
  UNIQUE KEY `correo_16` (`correo`),
  UNIQUE KEY `correo_17` (`correo`),
  UNIQUE KEY `correo_18` (`correo`),
  UNIQUE KEY `correo_19` (`correo`),
  UNIQUE KEY `correo_20` (`correo`),
  UNIQUE KEY `correo_21` (`correo`),
  UNIQUE KEY `correo_22` (`correo`),
  UNIQUE KEY `correo_23` (`correo`),
  UNIQUE KEY `correo_24` (`correo`),
  UNIQUE KEY `correo_25` (`correo`),
  UNIQUE KEY `correo_26` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'andrea@andrea.com','123456');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;
