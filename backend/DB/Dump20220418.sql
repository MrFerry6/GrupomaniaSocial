CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `text` varchar(500) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `video` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Title','Post content',NULL,NULL),(2,'Title','Post content',NULL,NULL),(3,'Title','Post content',NULL,NULL),(4,'Title','Post content',NULL,NULL),(5,'Title','Post content',NULL,NULL),(6,'Cagon to','En to me cago',NULL,NULL),(7,'Cagon to','En to me cago',NULL,NULL),(8,'Cagon to','En to me cago',NULL,NULL),(9,'Cagon to','En to me cago',NULL,NULL),(10,'Cagon to','En to me cago',NULL,NULL),(11,'Cagon to','En to me cago',NULL,NULL),(12,'Cagon to','En to me cago',NULL,NULL),(13,'Cagon to','En to me cago',NULL,NULL),(14,'Cagon to','En to me cago',NULL,NULL),(15,'Cagon to','En to me cago',NULL,NULL),(16,'Cagon to','En to me cago',NULL,NULL),(17,'Cagon to','En to me cago',NULL,NULL),(18,'fdasdsaf','dfggsdfg',NULL,NULL),(19,'fdasdsaf','dfggsdfg',NULL,NULL),(20,'fdasdsaf','dfggsdfg',NULL,NULL),(21,'fdasdsaf','sadASDSAd',NULL,NULL),(22,'fdasdsaf','sdaDSDSAa',NULL,NULL),(23,'fdasdsaf','fdasf aqfda sdf adfs ',NULL,NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'tuputamadre@hamijo.comf','$2b$10$bOFJ/nJTbR75ncJimUxD3eq26lTyxAEEZMmqqvMvy.D25bpbSL1/m'),(20,'tuputamadre@hamicon.com','$2b$10$DmZHfFfpIMEELTDaSroKc.pqRh3pGK/RZ3ito66USROQaJReq0y3u'),(22,'usekr88d10@user.user','$2b$10$OOCTnL6T1iJ2RwDO9sgy/OAjxQh6dfuCQLQ2CjOV0mPcDU2U2E0Yi'),(23,'tuputamadrdfse@hamijo.com','$2b$10$i0yOSsRij6BqQIhvgZotN.oU3iUptvozvCQ12P84tfKN6rmR88eDq'),(24,'tuputamadre16@hamijo.com','$2b$10$4zp/Wqn0Pua3LzozzftNOuPs2yFPiLWTV4wHN.j6TPdiRQ082EOg2'),(28,'tuputamadre25@hamijo.com','$2b$10$Mk0jDBEW0G1ulmG1qi4iZO4g3IlDJvyya2wIe7ntufaEAu0EZ1OCW'),(55,'tuputamadddre@hamijo.com','$2b$10$nmZE2QSrXNOm5lz1JTovbOsrDwh6R/nlAEt4UiAxBbwT.Cl.N5Z1.'),(56,'tuputamdsadre@hamijo.com','$2b$10$p8oOeiEF/83zN1tFX0pl2uUnPi8FwjuNkY7QnCQAR2Z.tIRksuFHS'),(57,'tuputdfaamadre@hamijo.com','$2b$10$LgaLI2Emiba3MApjjWSYTu0nL3yTSFbSK2dHgHfSFU4MC88g9y2i2'),(58,'tuputamdfadadre@hamijo.com','$2b$10$ORTRXnf2ug9I4etm.8ehR.DdfVHIJJGtKbEUyROMYxsmVCG5tezgO'),(59,'tuputamafffdre@hamijo.com','$2b$10$JP6yHOM49L/.Oz0cQ9j.E.KO.64NkRVJWvRF2qgtsgVSbIVqM.5Ha'),(64,'tuputavbxbvxcmadre@hamijo.com','$2b$10$M2ytUrM9ntYw/zROFCb7guWnihRPOd3X2xCUSheR.H5aEHRmbNQ0G'),(65,'tuputamadrdsfadfae@hamijo.com','$2b$10$hn8s9YHCwOG2wwLJFaBDxePZud6jnoZTtWmArwfWuV1zXMf54Bl66'),(67,'tuputafdsafdfmadre@hamijo.com','$2b$10$oPUhjYzRDbS6FWtUzs12.e4Y1gNCpHOcd3Gd3X77CmFQcmktBwG8m'),(68,'tuputamadre@hamijo.comsdafsd','$2b$10$EoeA2uCs.kvz72WscM4WNeDv4YBxZWVONzASWX/8xM24gOEnXrx.i'),(81,'tuputamadre@hamijo.com','$2b$10$dqCGqfdlcZEJAvmaHbHjPePKQB9qioRjn3XiFf0v.GGIEEV8PNFAW'),(84,'tuputamsdadre@hamijo.com','$2b$10$d9W8UkYPLCfUC6U.X25ol.KKNwAWIdczga.NsbRdKsCt90I0WRuk6'),(85,'tuputamdfasfdasfadre@hamijo.com','$2b$10$q95lkqCKtSqCbDBLFvAT7uR4K8y4GbtAGQnYl1blwPYLn0NybpY3O');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-18 18:37:06
