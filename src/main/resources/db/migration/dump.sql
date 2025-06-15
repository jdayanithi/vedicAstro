-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: astroguide
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text,
  `parent_category_id` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `thumbnail_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `parent_category_id` (`parent_category_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (3,'Beginner','Beginner course',NULL,'2025-06-11 03:38:55',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `posted_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs1slvnkuemjsq2kj4h3vhx7i1` (`post_id`),
  CONSTRAINT `FKs1slvnkuemjsq2kj4h3vhx7i1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text,
  `login_id` bigint NOT NULL,
  `category_id` bigint DEFAULT NULL,
  `difficulty_level` enum('beginner','intermediate','advanced') DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `duration_hours` int DEFAULT NULL,
  `thumbnail_url` text,
  `is_published` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status_flag` tinyint(1) DEFAULT '1' COMMENT 'Status flag: 1 = enabled, 0 = disabled',
  PRIMARY KEY (`course_id`),
  KEY `login_id` (`login_id`),
  KEY `category_id` (`category_id`),
  KEY `idx_courses_status_flag` (`status_flag`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `tbl_login` (`id`),
  CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'27 Natchathras','27 Natchathras Details',3,3,'beginner',100.00,10,'data:image/jpeg;base64,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',1,'2025-06-11 03:43:08','2025-06-14 12:41:54',1);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keynote_tags`
--

DROP TABLE IF EXISTS `keynote_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keynote_tags` (
  `keynote_tag_id` bigint NOT NULL AUTO_INCREMENT,
  `keynote_id` bigint NOT NULL,
  `tag_id` bigint NOT NULL,
  `relevance_score` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`keynote_tag_id`),
  UNIQUE KEY `keynote_id` (`keynote_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `keynote_tags_ibfk_1` FOREIGN KEY (`keynote_id`) REFERENCES `lesson_keynotes` (`keynote_id`) ON DELETE CASCADE,
  CONSTRAINT `keynote_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keynote_tags`
--

LOCK TABLES `keynote_tags` WRITE;
/*!40000 ALTER TABLE `keynote_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `keynote_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_keynotes`
--

DROP TABLE IF EXISTS `lesson_keynotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_keynotes` (
  `keynote_id` bigint NOT NULL AUTO_INCREMENT,
  `lesson_id` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `content_type` enum('text','bullet_points','quote','example') DEFAULT 'text',
  `order_sequence` int NOT NULL,
  `is_important` tinyint(1) DEFAULT '0',
  `has_visual_aid` tinyint(1) DEFAULT '0',
  `visual_aid_url` varchar(255) DEFAULT NULL,
  `related_planet` varchar(20) DEFAULT NULL,
  `related_zodiac` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`keynote_id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `lesson_keynotes_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`lesson_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_keynotes`
--

LOCK TABLES `lesson_keynotes` WRITE;
/*!40000 ALTER TABLE `lesson_keynotes` DISABLE KEYS */;
INSERT INTO `lesson_keynotes` VALUES (48,84,'Ashwini - Key Characteristics','Deity: Ashwini Kumaras (Divine Physicians)\nSymbol: Horse Head\nRuling Planet: Ketu\nElement: Earth\nGender: Male\nGuna: Rajas\nCaste: Vaishya\nDirection: South\nBody Part: Knees\nAnimal: Male Horse','text',1,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58'),(49,84,'Ashwini - Personality Traits','Quick action, Natural healers, Adventurous, Independent, Energetic, Impatient, Restless, Good in emergencies, Athletic abilities, Leadership qualities','text',2,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58'),(50,84,'Ashwini - Career & Health','Suitable careers: Medicine, Surgery, Emergency services, Sports, Military, Police, Firefighting, Racing\n\nHealth: Generally good health, prone to head injuries, knee problems, accidents due to speed','text',3,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58'),(51,85,'Bharani - Key Characteristics','Deity: Yama (God of Death)\nSymbol: Yoni (Vulva)\nRuling Planet: Venus\nElement: Earth\nGender: Female\nGuna: Rajas\nCaste: Mleccha\nDirection: East\nBody Part: Head, Forehead\nAnimal: Elephant','text',1,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58'),(52,85,'Bharani - Personality Traits','Strong willpower, Creative, Responsible, Passionate, Can bear heavy burdens, Artistic, Sensual, Determined, Patient, Good organizers','text',2,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58'),(53,85,'Bharani - Career & Health','Suitable careers: Arts, Entertainment, Fashion, Beauty industry, Agriculture, Food industry, Publishing, Writing\n\nHealth: Reproductive system issues, head-related problems, diabetes risk','text',3,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58'),(54,86,'Krittika - Key Characteristics','Deity: Agni (Fire God)\nSymbol: Razor/Knife\nRuling Planet: Sun\nElement: Fire\nGender: Female\nGuna: Rajas\nCaste: Brahmin\nDirection: North\nBody Part: Head, Crown\nAnimal: Goat','text',1,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58'),(55,86,'Krittika - Personality Traits','Sharp intellect, Leadership abilities, Famous, Authoritative, Can cut through illusions, Strong digestion, Courageous, Independent, Critical thinking, Truth-seeking','text',2,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58'),(56,86,'Krittika - Career & Health','Suitable careers: Government, Politics, Military, Police, Judiciary, Cooking, Fire-related work, Leadership roles\n\nHealth: Digestive issues, fever, inflammatory conditions, head problems','text',3,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58'),(57,87,'Rohini - Key Characteristics','Deity: Brahma (Creator)\nSymbol: Ox Cart/Chariot\nRuling Planet: Moon\nElement: Earth\nGender: Female\nGuna: Rajas\nCaste: Shudra\nDirection: East\nBody Part: Forehead, Ankles\nAnimal: Serpent','text',1,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58'),(58,87,'Rohini - Personality Traits','Beautiful, Magnetic personality, Creative, Materialistic, Fertile, Business-minded, Charming, Romantic, Luxury-loving, Artistic talents','text',2,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58'),(59,87,'Rohini - Career & Health','Suitable careers: Entertainment, Fashion, Beauty, Business, Banking, Real estate, Arts, Music, Dance, Agriculture\n\nHealth: Throat problems, reproductive issues, diabetes, weight gain','text',3,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58'),(60,88,'Mrigashira - Key Characteristics','Deity: Soma (Moon God)\nSymbol: Deer Head\nRuling Planet: Mars\nElement: Earth\nGender: Neutral\nGuna: Rajas\nCaste: Vaishya\nDirection: North\nBody Part: Face, Chin\nAnimal: Female Serpent','text',1,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58'),(61,88,'Mrigashira - Personality Traits','Constantly searching, Curious nature, Gentle, Traveler, Research-oriented, Suspicious, Fickle-minded, Good communication, Love for music, Spiritual inclination','text',2,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58'),(62,88,'Mrigashira - Career & Health','Suitable careers: Research, Travel industry, Music, Writing, Teaching, Sales, Marketing, Gemology, Perfumery\n\nHealth: Throat issues, constipation, mental stress, nervous disorders','text',3,0,0,NULL,NULL,NULL,'2025-06-14 12:33:58','2025-06-14 12:33:58');
/*!40000 ALTER TABLE `lesson_keynotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_tags`
--

DROP TABLE IF EXISTS `lesson_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_tags` (
  `lesson_tag_id` bigint NOT NULL AUTO_INCREMENT,
  `lesson_id` bigint NOT NULL,
  `tag_id` bigint NOT NULL,
  `relevance_score` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`lesson_tag_id`),
  UNIQUE KEY `lesson_id` (`lesson_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `lesson_tags_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`lesson_id`) ON DELETE CASCADE,
  CONSTRAINT `lesson_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=368 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_tags`
--

LOCK TABLES `lesson_tags` WRITE;
/*!40000 ALTER TABLE `lesson_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `lesson_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons` (
  `lesson_id` bigint NOT NULL AUTO_INCREMENT,
  `topic_id` bigint NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text,
  `content_type` enum('video','article','quiz','exercise') DEFAULT NULL,
  `content_url` varchar(255) DEFAULT NULL,
  `duration_minutes` int DEFAULT NULL,
  `order_number` int NOT NULL,
  `is_free` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status_flag` tinyint(1) DEFAULT '1' COMMENT 'Status flag: 1 = enabled, 0 = disabled',
  PRIMARY KEY (`lesson_id`),
  KEY `topic_id` (`topic_id`),
  KEY `idx_lessons_status_flag` (`status_flag`),
  CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`topic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES (84,54,'Ashwini Nakshatra - The Horse Riders','First Nakshatra ruled by Ashwini Kumaras, known for healing and speed. Symbol: Horse Head, Deity: Ashwini Kumaras, Planet: Ketu',NULL,'https://example.com/videos/ashwini.mp4',45,1,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(85,54,'Bharani Nakshatra - The Bearer','Second Nakshatra ruled by Yama, represents transformation and restraint. Symbol: Yoni, Deity: Yama, Planet: Venus',NULL,'https://example.com/videos/bharani.mp4',45,2,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(86,54,'Krittika Nakshatra - The Cutter','Third Nakshatra ruled by Agni, represents fire and purification. Symbol: Razor, Deity: Agni, Planet: Sun',NULL,'https://example.com/videos/krittika.mp4',45,3,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(87,54,'Rohini Nakshatra - The Red One','Fourth Nakshatra ruled by Brahma, known for beauty and creativity. Symbol: Ox Cart, Deity: Brahma, Planet: Moon',NULL,'https://example.com/videos/rohini.mp4',45,4,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(88,54,'Mrigashira Nakshatra - The Deer Head','Fifth Nakshatra ruled by Soma, represents search and quest. Symbol: Deer Head, Deity: Soma, Planet: Mars',NULL,'https://example.com/videos/mrigashir.mp4',45,5,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(89,54,'Ardra Nakshatra - The Moist One','Sixth Nakshatra ruled by Rudra, represents storms and transformation. Symbol: Diamond, Deity: Rudra, Planet: Rahu',NULL,'https://example.com/videos/ardra.mp4',45,6,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(90,54,'Punarvasu Nakshatra - The Returner','Seventh Nakshatra ruled by Aditi, represents renewal and restoration. Symbol: Bow and Quiver, Deity: Aditi, Planet: Jupiter',NULL,'https://example.com/videos/punarvasu.mp4',45,7,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(91,54,'Pushya Nakshatra - The Nourisher','Eighth Nakshatra ruled by Brihaspati, most auspicious for spiritual growth. Symbol: Flower, Deity: Brihaspati, Planet: Saturn',NULL,'https://example.com/videos/pushya.mp4',45,8,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(92,54,'Ashlesha Nakshatra - The Embracer','Ninth Nakshatra ruled by Nagas, represents serpent power and wisdom. Symbol: Coiled Serpent, Deity: Nagas, Planet: Mercury',NULL,'https://example.com/videos/ashlesha.mp4',45,9,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(93,54,'Magha Nakshatra - The Mighty','Tenth Nakshatra ruled by Pitrs, represents ancestral power and authority. Symbol: Royal Throne, Deity: Pitrs, Planet: Ketu',NULL,'https://example.com/videos/magha.mp4',45,10,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(94,54,'Purva Phalguni Nakshatra - The Former Red One','Eleventh Nakshatra ruled by Bhaga, represents luxury and pleasure. Symbol: Hammock, Deity: Bhaga, Planet: Venus',NULL,'https://example.com/videos/purva-phalguni.mp4',45,11,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(95,54,'Uttara Phalguni Nakshatra - The Latter Red One','Twelfth Nakshatra ruled by Aryaman, represents friendship and contracts. Symbol: Bed, Deity: Aryaman, Planet: Sun',NULL,'https://example.com/videos/uttara-phalguni.mp4',45,12,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(96,54,'Hasta Nakshatra - The Hand','Thirteenth Nakshatra ruled by Savitar, represents skill and craftsmanship. Symbol: Hand, Deity: Savitar, Planet: Moon',NULL,'https://example.com/videos/hasta.mp4',45,13,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(97,54,'Chitra Nakshatra - The Bright One','Fourteenth Nakshatra ruled by Tvashtar, represents creativity and beauty. Symbol: Pearl, Deity: Tvashtar, Planet: Mars',NULL,'https://example.com/videos/chitra.mp4',45,14,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(98,54,'Swati Nakshatra - The Sword','Fifteenth Nakshatra ruled by Vayu, represents independence and movement. Symbol: Sword, Deity: Vayu, Planet: Rahu',NULL,'https://example.com/videos/swati.mp4',45,15,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(99,54,'Vishakha Nakshatra - The Forked','Sixteenth Nakshatra ruled by Indra-Agni, represents determination and goals. Symbol: Archway, Deity: Indra-Agni, Planet: Jupiter',NULL,'https://example.com/videos/vishakha.mp4',45,16,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(100,54,'Anuradha Nakshatra - The Follower','Seventeenth Nakshatra ruled by Mitra, represents friendship and cooperation. Symbol: Lotus, Deity: Mitra, Planet: Saturn',NULL,'https://example.com/videos/anuradha.mp4',45,17,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(101,54,'Jyeshtha Nakshatra - The Eldest','Eighteenth Nakshatra ruled by Indra, represents seniority and protection. Symbol: Earring, Deity: Indra, Planet: Mercury',NULL,'https://example.com/videos/jyeshtha.mp4',45,18,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(102,54,'Mula Nakshatra - The Root','Nineteenth Nakshatra ruled by Niriti, represents destruction and transformation. Symbol: Bunch of Roots, Deity: Niriti, Planet: Ketu',NULL,'https://example.com/videos/mula.mp4',45,19,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(103,54,'Purva Ashadha Nakshatra - The Former Invincible One','Twentieth Nakshatra ruled by Apas, represents purification and invincibility. Symbol: Fan, Deity: Apas, Planet: Venus',NULL,'https://example.com/videos/purva-ashadha.mp4',45,20,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(104,54,'Uttara Ashadha Nakshatra - The Latter Invincible One','Twenty-first Nakshatra ruled by Vishvedevas, represents final victory. Symbol: Elephant Tusk, Deity: Vishvedevas, Planet: Sun',NULL,'https://example.com/videos/uttara-ashadha.mp4',45,21,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(105,54,'Shravana Nakshatra - The Listener','Twenty-second Nakshatra ruled by Vishnu, represents learning and listening. Symbol: Three Footprints, Deity: Vishnu, Planet: Moon',NULL,'https://example.com/videos/shravana.mp4',45,22,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(106,54,'Dhanishtha Nakshatra - The Richest','Twenty-third Nakshatra ruled by Vasus, represents wealth and music. Symbol: Drum, Deity: Vasus, Planet: Mars',NULL,'https://example.com/videos/dhanishtha.mp4',45,23,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(107,54,'Shatabhisha Nakshatra - The Hundred Healers','Twenty-fourth Nakshatra ruled by Varuna, represents healing and secrecy. Symbol: Circle, Deity: Varuna, Planet: Rahu',NULL,'https://example.com/videos/shatabhisha.mp4',45,24,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(108,54,'Purva Bhadrapada Nakshatra - The Former Lucky Feet','Twenty-fifth Nakshatra ruled by Aja Ekapada, represents spiritual fire. Symbol: Sword, Deity: Aja Ekapada, Planet: Jupiter',NULL,'https://example.com/videos/purva-bhadrapada.mp4',45,25,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(109,54,'Uttara Bhadrapada Nakshatra - The Latter Lucky Feet','Twenty-sixth Nakshatra ruled by Ahir Budhnya, represents cosmic serpent. Symbol: Twin, Deity: Ahir Budhnya, Planet: Saturn',NULL,'https://example.com/videos/uttara-bhadrapada.mp4',45,26,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1),(110,54,'Revati Nakshatra - The Wealthy','Twenty-seventh Nakshatra ruled by Pushan, represents nourishment and journey. Symbol: Fish, Deity: Pushan, Planet: Mercury',NULL,'https://example.com/videos/revati.mp4',45,27,0,'2025-06-14 12:33:58','2025-06-14 12:33:58',1);
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` bigint NOT NULL AUTO_INCREMENT,
  `login_id` bigint DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `notification_type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` datetime DEFAULT NULL COMMENT 'When the notification becomes active',
  `expiry_date` datetime DEFAULT NULL COMMENT 'When the notification expires (optional)',
  `is_broadcast` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`notification_id`),
  KEY `login_id` (`login_id`),
  KEY `idx_notifications_start_date` (`start_date`),
  KEY `idx_notifications_expiry_date` (`expiry_date`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `tbl_login` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (3,NULL,'Interactive Learning','Practice identifying your birth Nakshatra and explore personality traits, career guidance, and compatibility.',0,'email','2025-06-14 12:22:32','2025-06-14 17:52:32','2025-06-29 17:52:32',1),(4,NULL,'Monthly Predictions','Monthly astrological predictions based on Nakshatra transits and planetary positions.',0,'push','2025-06-14 12:22:32','2025-06-14 17:52:32','2025-07-14 17:52:32',1),(7,NULL,'Interactive Learning','Practice identifying your birth Nakshatra and explore personality traits, career guidance, and compatibility.',0,'email','2025-06-14 12:30:19','2025-06-14 18:00:19','2025-06-29 18:00:19',1),(8,NULL,'Monthly Predictions','Monthly astrological predictions based on Nakshatra transits and planetary positions.',0,'push','2025-06-14 12:30:19','2025-06-14 18:00:19','2025-07-14 18:00:19',1),(9,NULL,'Welcome to Nakshatra Learning','Welcome to the comprehensive 27 Nakshatras course! Begin your journey into Vedic Astrology today.',0,'push','2025-06-14 12:33:58','2025-06-14 18:03:58','2025-07-14 18:03:58',1),(10,NULL,'Complete Nakshatra Database','All 27 Nakshatras with detailed information, characteristics, and practical applications are now available.',0,'push','2025-06-14 12:33:58','2025-06-14 18:03:58','2025-06-21 18:03:58',1),(11,NULL,'Interactive Learning','Practice identifying your birth Nakshatra and explore personality traits, career guidance, and compatibility.',0,'email','2025-06-14 12:33:58','2025-06-14 18:03:58','2025-06-29 18:03:58',1),(12,NULL,'Monthly Predictions','Monthly astrological predictions based on Nakshatra transits and planetary positions.',0,'push','2025-06-14 12:33:58','2025-06-14 18:03:58','2025-07-14 18:03:58',1);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` bigint NOT NULL AUTO_INCREMENT,
  `login_id` bigint NOT NULL,
  `course_id` bigint NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
  `payment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expiry_date` datetime DEFAULT NULL COMMENT 'Expiry date for payment validity or access duration',
  `created_by` bigint DEFAULT NULL COMMENT 'ID of user who created this payment record',
  `modified_by` bigint DEFAULT NULL COMMENT 'ID of user who last modified this payment record',
  `comments` text COMMENT 'Additional comments or notes about the payment',
  PRIMARY KEY (`payment_id`),
  KEY `login_id` (`login_id`),
  KEY `course_id` (`course_id`),
  KEY `idx_payments_expiry_date` (`expiry_date`),
  KEY `fk_payments_created_by` (`created_by`),
  KEY `fk_payments_modified_by` (`modified_by`),
  CONSTRAINT `fk_payments_created_by` FOREIGN KEY (`created_by`) REFERENCES `tbl_login` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_payments_modified_by` FOREIGN KEY (`modified_by`) REFERENCES `tbl_login` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `tbl_login` (`id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `like_count` int NOT NULL,
  `view_count` int NOT NULL,
  `date` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(5000) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `posted_by` varchar(255) DEFAULT NULL,
  `tags` varbinary(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `tag_id` bigint NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(50) NOT NULL,
  `tag_category` varchar(50) DEFAULT NULL,
  `description` text,
  `created_by_user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status_flag` tinyint(1) DEFAULT '1' COMMENT 'Status flag: 1 = enabled, 0 = disabled',
  PRIMARY KEY (`tag_id`),
  UNIQUE KEY `tag_name` (`tag_name`),
  KEY `idx_tags_status_flag` (`status_flag`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (3,'Meditation','Practice','Meditation related content',NULL,'2025-06-11 11:28:34',1),(113,'Nakshatra',NULL,'Related to lunar mansions',NULL,'2025-06-14 12:33:58',1),(114,'Deity',NULL,'Ruling deity of celestial bodies',NULL,'2025-06-14 12:33:58',1),(115,'Symbol',NULL,'Symbolic representation',NULL,'2025-06-14 12:33:58',1),(116,'Characteristics',NULL,'Personality traits and qualities',NULL,'2025-06-14 12:33:58',1),(117,'Mythology',NULL,'Mythological stories and legends',NULL,'2025-06-14 12:33:58',1),(118,'Remedies',NULL,'Astrological remedies and solutions',NULL,'2025-06-14 12:33:58',1),(119,'Compatibility',NULL,'Relationship and marriage compatibility',NULL,'2025-06-14 12:33:58',1),(120,'Career',NULL,'Professional and career guidance',NULL,'2025-06-14 12:33:58',1),(121,'Health',NULL,'Health and wellness aspects',NULL,'2025-06-14 12:33:58',1),(122,'Spiritual',NULL,'Spiritual growth and development',NULL,'2025-06-14 12:33:58',1),(123,'Timing',NULL,'Muhurta and auspicious timing',NULL,'2025-06-14 12:33:58',1),(124,'Prediction',NULL,'Predictive techniques',NULL,'2025-06-14 12:33:58',1);
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_login`
--

DROP TABLE IF EXISTS `tbl_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_login` (
  `created_date` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `updated_date` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `birth_time` time DEFAULT NULL,
  `birth_place` varchar(100) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `bio` text,
  `user_type` enum('student','instructor','admin') NOT NULL DEFAULT 'student',
  `zodiac_sign` varchar(20) DEFAULT NULL,
  `rising_sign` varchar(20) DEFAULT NULL,
  `moon_sign` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_q9elbtfnf8yhxrntro5tgbnam` (`phone_number`),
  UNIQUE KEY `UK_dsmjdva87upwed7ovgbl8sidw` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_login`
--

LOCK TABLES `tbl_login` WRITE;
/*!40000 ALTER TABLE `tbl_login` DISABLE KEYS */;
INSERT INTO `tbl_login` VALUES ('2025-06-11 00:17:03.000000',1,NULL,NULL,'Viewer','User','$2a$10$Zk84dC1BleAWF3q73QyBiOhKtrTtYKAXQFHS9AFYO6wovYnMGpYy6','9876543210','VIEWER',NULL,'viewer@example.com',NULL,NULL,NULL,NULL,NULL,'student',NULL,NULL,NULL),('2025-06-11 00:16:53.000000',3,'2025-06-11 10:32:57.942987',NULL,'Admin','User','$2a$10$Qc9Aj6a0iOTgIBspGO3hFuDh.pVDBqd1NiVNMhlzzcy6KeMph3iAu','1234567890','ADMIN','admin','admin@example.com',NULL,NULL,NULL,NULL,NULL,'student',NULL,NULL,NULL);
/*!40000 ALTER TABLE `tbl_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tags`
--

DROP TABLE IF EXISTS `tbl_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(50) NOT NULL,
  `tag_category` varchar(50) DEFAULT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tag_id`),
  UNIQUE KEY `tag_name` (`tag_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tags`
--

LOCK TABLES `tbl_tags` WRITE;
/*!40000 ALTER TABLE `tbl_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic` (
  `topic_id` bigint NOT NULL AUTO_INCREMENT,
  `course_id` bigint NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text,
  `order_number` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status_flag` tinyint(1) DEFAULT '1' COMMENT 'Status flag: 1 = enabled, 0 = disabled',
  PRIMARY KEY (`topic_id`),
  KEY `course_id` (`course_id`),
  KEY `idx_topics_status_flag` (`status_flag`),
  CONSTRAINT `topic_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES (54,1,'Introduction to Nakshatras','Basic understanding of the 27 lunar mansions',1,'2025-06-14 12:33:58','2025-06-14 12:33:58',1);
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-15 11:15:43


-- -- Insert admin user
-- INSERT INTO tbl_login (username, password, role, first_name, last_name, phone_number, created_date)
-- VALUES ('admin@example.com', '$2a$10$Zk84dC1BleAWF3q73QyBiOhKtrTtYKAXQFHS9AFYO6wovYnMGpYy6', 'ADMIN', 'Admin', 'User', '1234567890', CURRENT_TIMESTAMP);

-- -- Insert viewer user
-- INSERT INTO tbl_login (username, password, role, first_name, last_name, phone_number, created_date)
-- VALUES ('viewer@example.com', '$2a$10$Zk84dC1BleAWF3q73QyBiOhKtrTtYKAXQFHS9AFYO6wovYnMGpYy6', 'VIEWER', 'Viewer', 'User', '9876543210', CURRENT_TIMESTAMP);
