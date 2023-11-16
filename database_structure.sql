CREATE DATABASE  IF NOT EXISTS `artclinic` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `artclinic`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: artclinic
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `appointmentnumber` int NOT NULL,
  `doctor_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `appointment_date` datetime NOT NULL,
  `registeration_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `appointment_status` int NOT NULL,
  PRIMARY KEY (`appointmentnumber`),
  UNIQUE KEY `doctor_id_UNIQUE` (`appointmentnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (107,2,76,'2023-06-01 12:00:00','2023-05-21 15:32:48','2023-05-21 15:32:48',1);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `callrequests`
--

DROP TABLE IF EXISTS `callrequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `callrequests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phonenumber` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `submission_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `callrequests`
--

LOCK TABLES `callrequests` WRITE;
/*!40000 ALTER TABLE `callrequests` DISABLE KEYS */;
INSERT INTO `callrequests` VALUES (1,'Arthur Varteressians','(374) 949-8839','arthurvarteressian@gmail.com',0,'2023-05-16 12:35:03');
/*!40000 ALTER TABLE `callrequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `doctor_id` int NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `department` varchar(45) NOT NULL,
  PRIMARY KEY (`doctor_id`),
  UNIQUE KEY `doctor_id_UNIQUE` (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,'A. kim','Dentist'),(2,'H. Jhon','Cardiologists'),(3,'J. Alik','Neurologist'),(4,'P. Lee','Internal Medicine'),(5,'B. Gaya','Pulmonologist'),(6,'C. Richard','Radiologist');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managemenlogin`
--

DROP TABLE IF EXISTS `managemenlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managemenlogin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managemenlogin`
--

LOCK TABLES `managemenlogin` WRITE;
/*!40000 ALTER TABLE `managemenlogin` DISABLE KEYS */;
INSERT INTO `managemenlogin` VALUES (1,'A.kim@doctor.com','123','doctor'),(2,'h.jhon@doctor.com','321','doctor'),(3,'J.Alik@doctor.com','123','doctor'),(4,'P.lee@doctor.com','321','doctor'),(5,'b.gaya@doctor.com','12345','doctor'),(6,'c.richard@doctor.com','321','doctor'),(7,'artclinic@manager.com','54321','manager');
/*!40000 ALTER TABLE `managemenlogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patientslist`
--

DROP TABLE IF EXISTS `patientslist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patientslist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `phonenumber` varchar(20) NOT NULL,
  `hashedpassword` varchar(255) NOT NULL,
  `registration_date` date NOT NULL,
  `patient_status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patientslist`
--

LOCK TABLES `patientslist` WRITE;
/*!40000 ALTER TABLE `patientslist` DISABLE KEYS */;
INSERT INTO `patientslist` VALUES (1,'Asians','arteressian@gmail.com',12,'1234546','$2b$10$yx01XIhi1baBytuk8t.1Be7tcvB6Sl2VB73rCgDkobLjhsxrQNhOW','2023-05-01',0),(2,'Arthur Varteressians','artere4ssian@gmail.com',12,'12312412','$2b$10$s0N093GEiRP1.8Q7WlwzNOq13zSejQtIu.FemIDdyrIKNb4FFZI/2','2023-05-01',0);
/*!40000 ALTER TABLE `patientslist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-16 16:53:09
