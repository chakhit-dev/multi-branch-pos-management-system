-- --------------------------------------------------------
-- Host:                         103.82.249.195
-- Server version:               11.4.3-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for rsupos_db
CREATE DATABASE IF NOT EXISTS `rsupos_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `rsupos_db`;

-- Dumping structure for table rsupos_db.orderlist
CREATE TABLE IF NOT EXISTS `orderlist` (
  `orderid` int(11) NOT NULL AUTO_INCREMENT,
  `storeid` int(11) DEFAULT NULL,
  `tableid` int(11) DEFAULT NULL,
  `sessionid` text DEFAULT NULL,
  `productid` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(20,2) DEFAULT NULL,
  `img` text DEFAULT NULL,
  `status` enum('กำลังเตรียมอาหาร','กำลังทำอาหาร','ส่งอาหารแล้ว') DEFAULT 'กำลังเตรียมอาหาร',
  `time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`orderid`),
  KEY `FK_order_store` (`storeid`),
  KEY `FK_order_tableslist` (`tableid`),
  KEY `FK_order_product` (`productid`),
  CONSTRAINT `FK_order_product` FOREIGN KEY (`productid`) REFERENCES `product` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_order_store` FOREIGN KEY (`storeid`) REFERENCES `store` (`store_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_order_tableslist` FOREIGN KEY (`tableid`) REFERENCES `tableslist` (`table_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db.orderlist: ~9 rows (approximately)
INSERT INTO `orderlist` (`orderid`, `storeid`, `tableid`, `sessionid`, `productid`, `quantity`, `price`, `img`, `status`, `time`) VALUES
	(1, 1, 1, 'ac6d157f-a79a-4e55-be16-b1fcb62f041b', 45, 1, 130.00, 'cake_fruit', 'กำลังเตรียมอาหาร', '2025-10-21 12:41:24'),
	(2, 1, 1, 'ac6d157f-a79a-4e55-be16-b1fcb62f041b', 46, 1, 40.00, 'chayen', 'กำลังเตรียมอาหาร', '2025-10-21 12:41:24'),
	(3, 1, 2, 'c83c9029-2a7a-4131-8368-2c15023c8c0e', 41, 1, 150.00, 'cakecho', 'กำลังเตรียมอาหาร', '2025-10-23 07:14:13'),
	(4, 1, 2, 'c83c9029-2a7a-4131-8368-2c15023c8c0e', 50, 1, 45.00, 'soda_fruit', 'กำลังเตรียมอาหาร', '2025-10-23 07:14:13'),
	(5, 1, 2, 'c83c9029-2a7a-4131-8368-2c15023c8c0e', 49, 1, 20.00, 'water', 'กำลังเตรียมอาหาร', '2025-10-23 07:14:13'),
	(6, 1, 3, '65da4a14-4c60-4267-a1e4-c994b047af4d', 48, 1, 60.00, 'water_fruit', 'กำลังเตรียมอาหาร', '2025-10-23 08:55:02'),
	(7, 1, 3, '65da4a14-4c60-4267-a1e4-c994b047af4d', 60, 1, 90.00, 'somtumthai', 'กำลังเตรียมอาหาร', '2025-10-23 08:55:02'),
	(8, 1, 3, '65da4a14-4c60-4267-a1e4-c994b047af4d', 58, 1, 130.00, 'tomyum', 'กำลังเตรียมอาหาร', '2025-10-23 08:55:02'),
	(9, 1, 1, 'ac6d157f-a79a-4e55-be16-b1fcb62f041b', 41, 1, 150.00, 'cakecho', 'กำลังเตรียมอาหาร', '2025-10-23 08:55:30');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
