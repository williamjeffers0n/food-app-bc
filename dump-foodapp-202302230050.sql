-- MySQL dump 10.13  Distrib 8.0.31, for macos13.0 (x86_64)
--
-- Host: localhost    Database: foodapp
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Chilli burger With Pepper Relish','This scrumptious burger sits under a chilli lamb pattie, roasted bell pepper dip, onions, tomatoes and lettuce.','https://i.ndtvimg.com/i/2016-05/chilli-burger_625x350_41464592906.jpg','2023-02-21 16:38:04','2023-02-21 16:38:04',NULL),(2,'Perfect Lamb Satay Burger','Succulent lamb burgers with the crunchiness of cashew nuts and the creaminess of peanut butter smothered with a gorgeous satay sauce.','https://i.ndtvimg.com/i/2016-05/lamb-burger_625x350_41464593235.jpg','2023-02-21 16:39:36','2023-02-21 16:39:36',NULL),(3,'Lamb and Tomato Stuffed Burger','A perfectly shaped lamb pattie cooked to perfection. The tomatoes aren\'t just a topping but the spotlight of this beautiful dish.','https://i.ndtvimg.com/i/2016-05/lamb-tomato-burger_625x350_71464593063.jpg','2023-02-21 16:40:25','2023-02-21 16:40:25',NULL),(4,' Crunchy Chicken and Fish Burger','If a burger for you is all about the meat and protein then you\'re at the right place. Experience the goodness of chicken, fish and a tangy hot and sour sauce.','https://i.ndtvimg.com/i/2016-05/chicken-fish-burger_625x350_61464592753.jpg','2023-02-21 16:41:16','2023-02-21 16:41:16',NULL),(5,' Chicken Feta Cheese Burger With Potato Salad','Chicken mince marinated with salt, pepper and feta cheese is only the beginning of this ultimate wonder. To accompany this we\'ve got a guilt free potato salad with a yogurt dressing.','https://i.ndtvimg.com/i/2016-05/chicken-burger_625x350_61464591266.jpg','2023-02-21 16:42:18','2023-02-21 16:42:18',NULL),(6,' Lentil and Mushroom Burger','For the healthy and calorie conscious folks we\'ve got this tasty burger. A lentil, mushroom and sun dried tomato pattie packed between a whole wheat bun.','https://i.ndtvimg.com/i/2016-05/lentil-mushroom-burger_625x350_71464592318.jpg','2023-02-21 16:43:01','2023-02-21 16:43:01',NULL),(7,' Lentil and Mushroom Burger','Chicken mince marinated with salt, pepper and feta cheese is only the beginning of this ultimate wonder. To accompany this we\'ve got a guilt free potato salad with a yogurt dressing.','https://i.ndtvimg.com/i/2016-05/lentil-mushroom-burger_625x350_71464592318.jpg','2023-02-21 18:41:13','2023-02-21 18:41:13',NULL),(8,' Crunchy Chicken and Fish Burger','For the healthy and calorie conscious folks we\'ve got this tasty burger. A lentil, mushroom and sun dried tomato pattie packed between a whole wheat bun.','https://i.ndtvimg.com/i/2016-05/chicken-burger_625x350_61464591266.jpg','2023-02-21 18:41:13','2023-02-21 18:41:13',NULL);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price_per_item` decimal(10,3) NOT NULL DEFAULT '0.000',
  `total_item_amount` decimal(10,3) NOT NULL DEFAULT '0.000',
  `no_of_item` int DEFAULT NULL,
  `item_id` int NOT NULL,
  `order_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1.000,25.000,1,1,1,'2023-02-21 18:34:46','2023-02-21 18:34:46',NULL),(2,1.000,25.000,1,1,2,'2023-02-21 18:35:50','2023-02-21 18:35:50',NULL),(3,1.000,25.000,1,2,2,'2023-02-21 18:35:50','2023-02-21 18:35:50',NULL),(4,0.000,0.000,NULL,7,3,'2023-02-21 18:41:13','2023-02-21 18:41:13',NULL),(5,0.000,0.000,NULL,8,3,'2023-02-21 18:41:13','2023-02-21 18:41:13',NULL);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_amount` decimal(10,3) NOT NULL DEFAULT '0.000',
  `total_items` int DEFAULT NULL,
  `status` enum('placed','acknowledge','ready','delivered','completed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'placed',
  `payment_status` enum('paid','hold','notPaid') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'notPaid',
  `restaurant_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,25.000,1,'placed','notPaid',1,1,'2023-02-21 18:34:46','2023-02-21 18:34:46',NULL),(2,25.000,1,'placed','notPaid',1,1,'2023-02-21 18:35:50','2023-02-21 18:35:50',NULL),(3,25.000,1,'placed','notPaid',1,1,'2023-02-21 18:41:13','2023-02-21 18:41:13',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant_items`
--

DROP TABLE IF EXISTS `restaurant_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `restaurant_id` int NOT NULL,
  `amount` decimal(10,3) NOT NULL DEFAULT '0.000',
  `quantity` enum('small','medium','large') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'small',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `restaurant_items_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `restaurant_items_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant_items`
--

LOCK TABLES `restaurant_items` WRITE;
/*!40000 ALTER TABLE `restaurant_items` DISABLE KEYS */;
INSERT INTO `restaurant_items` VALUES (1,1,5,20.000,'small','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(2,2,5,25.000,'medium','2022-08-25 19:09:00','2022-08-25 19:09:00','2022-08-25 19:09:00'),(3,3,5,22.000,'small','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(4,1,2,23.000,'small','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(5,2,2,23.000,'medium','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(6,3,2,25.000,'large','2022-08-25 19:09:00','2022-08-25 19:09:00','2022-08-25 19:09:00'),(7,4,2,23.000,'small','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(8,5,2,23.000,'medium','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(9,6,2,25.000,'large','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(10,1,3,23.000,'small','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(11,2,3,23.000,'medium','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(12,3,3,25.000,'large','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(13,4,3,23.000,'small','2022-08-25 19:09:00','2022-08-25 19:09:00','2022-08-25 19:09:00'),(14,5,3,23.000,'medium','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(15,6,3,25.000,'large','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(16,1,4,23.000,'small','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(17,2,4,23.000,'medium','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(18,3,4,25.000,'large','2022-08-25 19:09:00','2022-08-25 19:09:00','2022-08-25 19:09:00'),(19,4,4,23.000,'small','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(20,5,4,23.000,'medium','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(21,6,4,25.000,'large','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(22,4,5,23.000,'small','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(23,5,5,23.000,'medium','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL),(24,6,5,25.000,'large','2022-08-25 19:09:00','2022-08-25 19:09:00',NULL);
/*!40000 ALTER TABLE `restaurant_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'Bossman\'s Burgr Factory','After gaining popularity in Romania, The Burgr Factory has launched their restaurant in Dubai. Widely known as \'The Cheat Day Headquarters\'','https://lh5.googleusercontent.com/-zOM2NBSi-Bg/AAAAAAAAAAI/AAAAAAAAAAA/1n2UpSJ26Kg/s88-p-k-no-ns-nd/photo.jpg','594 Jumeirah Beach Rd - Umm Suqeim - Jumeirah 3 - Dubai','2023-02-21 16:48:01','2023-02-21 16:48:01',NULL),(2,'Bossman\'s Burgr Factory','After gaining popularity in Romania, The Burgr Factory has launched their restaurant in Dubai. Widely known as \'The Cheat Day Headquarters\'','https://lh5.googleusercontent.com/-zOM2NBSi-Bg/AAAAAAAAAAI/AAAAAAAAAAA/1n2UpSJ26Kg/s88-p-k-no-ns-nd/photo.jpg','594 Jumeirah Beach Rd - Umm Suqeim - Jumeirah 3 - Dubai','2023-02-21 16:48:21','2023-02-21 16:48:21',NULL),(3,'Hadoota Masreya','Traditional Egyptian choice with a warm atmosphere offering a classic menu, along with a buffet.','https://lh6.googleusercontent.com/-Bgd0HlTTDec/AAAAAAAAAAI/AAAAAAAAAAA/kHdaYhFRhPo/s44-p-k-no-ns-nd/photo.jpg','Sheikh Zayed Rd - Al Safa - Al Safa 1 - Dubai','2023-02-21 16:50:41','2023-02-21 16:50:41',NULL),(4,'Hot Burger','The Best Burger in Town','https://lh6.googleusercontent.com/-Bgd0HlTTDec/AAAAAAAAAAI/AAAAAAAAAAA/kHdaYhFRhPo/s44-p-k-no-ns-nd/photo.jpg','Buhaira corniche - Midfa building Alkhan street Al majaz - Al Khaledia Suburb - Sharjah','2023-02-21 16:51:37','2023-02-21 16:51:37',NULL),(5,'Zoal Burger Restaurant','Zoal Burger is a story and a love story that can only be made by love','https://lh5.googleusercontent.com/-3O76I_GymjU/AAAAAAAAAAI/AAAAAAAAAAA/xhrMjngX_yg/s44-p-k-no-ns-nd/photo.jpg','Dr. Murad Building (DMM Building - 20th St - Dubai','2023-02-21 16:52:59','2023-02-21 16:52:59',NULL);
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20230220102242-create-user.js'),('20230221150628-create-items.js'),('20230221150707-create-restaurants.js'),('20230221150709-create-orders.js'),('20230221150747-create-restaurant-items.js'),('20230221152501-create-order-items.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_ext` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_salt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'-NOoo-F3rKPzE6I9E3SZ',' liju','liju@jvdm1.com','liju','4321543211','+91','abc House','4g/IlPoXm278rKznfQuwj4P6ThsnrAE9y7RvdIwV4Y4=','59lgQKLSAKSa7WKcuRfK1Q==','2023-02-21 16:30:35','2023-02-21 16:30:35',NULL),(2,'-NOup0OoNomvl9bd5S-k','William','joyal@jv1.com','jopyal','0529274101','+971',NULL,'K71pP8vpgyMnfwzG6xH4iwJ/hOQzVXH4n/5sTM94HME=','rnQeJ4LY1gPtw64q/FgMaA==','2023-02-22 20:32:45','2023-02-22 20:32:45',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'foodapp'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-23  0:50:41
