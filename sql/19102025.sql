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

-- Dumping structure for table rsupos_db.category
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` varchar(50) NOT NULL,
  `category_name` varchar(50) DEFAULT NULL,
  `category_store` int(11) DEFAULT NULL,
  KEY `FK_category_store` (`category_store`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `FK_category_store` FOREIGN KEY (`category_store`) REFERENCES `store` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db.category: ~10 rows (approximately)
INSERT INTO `category` (`category_id`, `category_name`, `category_store`) VALUES
	('beverage', 'เครื่องดื่ม', 2),
	('snack', 'ของทานเล่น', 2),
	('main_course', 'อาหารจานหลัก', 2),
	('salad', 'สลัด', 2),
	('beverage', 'เครื่องดื่ม', 1),
	('snack', 'ของทานเล่น', 1),
	('main_course', 'อาหารจานหลัก', 1),
	('salad', 'สลัด', 1),
	('dessert', 'ขนมหวาน', 2),
	('dessert', 'ขนมหวาน', 1);

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
	(1, 1, 1, 'c2dea8a7-7b8a-4a5f-8b70-f81c77db9a33', 49, 1, 20.00, 'water', 'กำลังเตรียมอาหาร', '2025-09-28 00:07:05'),
	(2, 1, 1, 'c2dea8a7-7b8a-4a5f-8b70-f81c77db9a33', 56, 1, 120.00, 'krowpat_kung', 'กำลังเตรียมอาหาร', '2025-09-28 00:07:05'),
	(3, 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 49, 2, 20.00, 'water', 'ส่งอาหารแล้ว', '2025-10-06 07:30:00'),
	(4, 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 52, 1, 60.00, 'popcorn', 'กำลังทำอาหาร', '2025-10-06 07:30:00'),
	(5, 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 59, 3, 125.00, 'kangkew', 'ส่งอาหารแล้ว', '2025-10-06 07:30:51'),
	(6, 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 42, 2, 90.14, 'icecream_valila', 'กำลังเตรียมอาหาร', '2025-10-10 08:21:19'),
	(7, 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 57, 2, 110.00, 'padthai', 'กำลังเตรียมอาหาร', '2025-10-10 08:21:19'),
	(8, 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 55, 1, 45.00, 'bean_fries', 'กำลังเตรียมอาหาร', '2025-10-17 07:34:17'),
	(9, 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 46, 1, 40.00, 'chayen', 'กำลังเตรียมอาหาร', '2025-10-17 09:13:56');

-- Dumping structure for table rsupos_db.order_log
CREATE TABLE IF NOT EXISTS `order_log` (
  `log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `action` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `storeid` int(11) DEFAULT NULL,
  `tableid` int(11) DEFAULT NULL,
  `sessionid` text DEFAULT NULL,
  `productid` int(11) DEFAULT NULL,
  `status` enum('กำลังเตรียมอาหาร','กำลังทำอาหาร','ส่งอาหารแล้ว') DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `log_time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db.order_log: ~25 rows (approximately)
INSERT INTO `order_log` (`log_id`, `action`, `storeid`, `tableid`, `sessionid`, `productid`, `status`, `time`, `log_time`) VALUES
	(1, 'INSERT', 1, 1, 'c2dea8a7-7b8a-4a5f-8b70-f81c77db9a33', 41, 'กำลังเตรียมอาหาร', '2025-09-22 23:38:56', '2025-09-22 23:38:56'),
	(2, 'INSERT', 1, 1, 'c2dea8a7-7b8a-4a5f-8b70-f81c77db9a33', 50, 'กำลังเตรียมอาหาร', '2025-09-22 23:38:56', '2025-09-22 23:38:56'),
	(3, 'UPDATE', 1, 1, 'c2dea8a7-7b8a-4a5f-8b70-f81c77db9a33', 41, 'กำลังทำอาหาร', '2025-09-22 23:38:56', '2025-09-22 23:41:42'),
	(4, 'UPDATE', 1, 1, 'c2dea8a7-7b8a-4a5f-8b70-f81c77db9a33', 50, 'ส่งอาหารแล้ว', '2025-09-22 23:38:56', '2025-09-22 23:41:50'),
	(5, 'INSERT', 1, 1, 'c2dea8a7-7b8a-4a5f-8b70-f81c77db9a33', 41, 'กำลังเตรียมอาหาร', '2025-09-24 10:26:01', '2025-09-24 10:26:01'),
	(6, 'INSERT', 1, 1, 'c2dea8a7-7b8a-4a5f-8b70-f81c77db9a33', 42, 'กำลังเตรียมอาหาร', '2025-09-24 10:26:01', '2025-09-24 10:26:01'),
	(7, 'INSERT', 1, 1, 'c2dea8a7-7b8a-4a5f-8b70-f81c77db9a33', 43, 'กำลังเตรียมอาหาร', '2025-09-24 10:26:01', '2025-09-24 10:26:01'),
	(8, 'INSERT', 1, 4, '9865c517-2ad8-4668-9e0a-5685f1c4a834', 60, 'กำลังเตรียมอาหาร', '2025-09-24 10:27:24', '2025-09-24 10:27:24'),
	(9, 'INSERT', 1, 4, '9865c517-2ad8-4668-9e0a-5685f1c4a834', 53, 'กำลังเตรียมอาหาร', '2025-09-24 10:27:24', '2025-09-24 10:27:24'),
	(10, 'INSERT', 1, 4, '9865c517-2ad8-4668-9e0a-5685f1c4a834', 49, 'กำลังเตรียมอาหาร', '2025-09-24 10:27:24', '2025-09-24 10:27:24'),
	(11, 'UPDATE', 1, 4, '9865c517-2ad8-4668-9e0a-5685f1c4a834', 53, 'ส่งอาหารแล้ว', '2025-09-24 10:27:24', '2025-09-24 10:28:04'),
	(12, 'INSERT', 1, 1, 'c2dea8a7-7b8a-4a5f-8b70-f81c77db9a33', 51, 'กำลังเตรียมอาหาร', '2025-09-28 00:06:23', '2025-09-28 00:06:23'),
	(13, 'INSERT', 1, 1, 'c2dea8a7-7b8a-4a5f-8b70-f81c77db9a33', 52, 'กำลังเตรียมอาหาร', '2025-09-28 00:06:23', '2025-09-28 00:06:23'),
	(14, 'INSERT', 1, 1, 'c2dea8a7-7b8a-4a5f-8b70-f81c77db9a33', 49, 'กำลังเตรียมอาหาร', '2025-09-28 00:07:05', '2025-09-28 00:07:05'),
	(15, 'INSERT', 1, 1, 'c2dea8a7-7b8a-4a5f-8b70-f81c77db9a33', 56, 'กำลังเตรียมอาหาร', '2025-09-28 00:07:05', '2025-09-28 00:07:05'),
	(16, 'INSERT', 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 49, 'กำลังเตรียมอาหาร', '2025-10-06 07:30:00', '2025-10-06 07:30:00'),
	(17, 'INSERT', 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 52, 'กำลังเตรียมอาหาร', '2025-10-06 07:30:00', '2025-10-06 07:30:00'),
	(18, 'INSERT', 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 59, 'กำลังเตรียมอาหาร', '2025-10-06 07:30:51', '2025-10-06 07:30:51'),
	(19, 'UPDATE', 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 49, 'ส่งอาหารแล้ว', '2025-10-06 07:30:00', '2025-10-06 07:40:00'),
	(20, 'UPDATE', 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 52, 'กำลังทำอาหาร', '2025-10-06 07:30:00', '2025-10-06 07:40:01'),
	(21, 'UPDATE', 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 59, 'ส่งอาหารแล้ว', '2025-10-06 07:30:51', '2025-10-06 07:40:03'),
	(22, 'INSERT', 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 42, 'กำลังเตรียมอาหาร', '2025-10-10 08:21:19', '2025-10-10 08:21:19'),
	(23, 'INSERT', 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 57, 'กำลังเตรียมอาหาร', '2025-10-10 08:21:19', '2025-10-10 08:21:19'),
	(24, 'INSERT', 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 55, 'กำลังเตรียมอาหาร', '2025-10-17 07:34:17', '2025-10-17 07:34:17'),
	(25, 'INSERT', 1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 46, 'กำลังเตรียมอาหาร', '2025-10-17 09:13:56', '2025-10-17 09:13:56');

-- Dumping structure for table rsupos_db.product
CREATE TABLE IF NOT EXISTS `product` (
  `product_storeid` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_category` varchar(50) DEFAULT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `product_des` text DEFAULT NULL,
  `product_img` text DEFAULT NULL,
  `product_price` decimal(20,2) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FK_product_category` (`product_category`),
  KEY `FK_product_store` (`product_storeid`),
  CONSTRAINT `FK_product_category` FOREIGN KEY (`product_category`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_product_store` FOREIGN KEY (`product_storeid`) REFERENCES `store` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db.product: ~30 rows (approximately)
INSERT INTO `product` (`product_storeid`, `product_id`, `product_category`, `product_name`, `product_des`, `product_img`, `product_price`) VALUES
	(1, 41, 'dessert', 'เค้กช็อกโกแลต', 'เค้กเนื้อช็อกโกแลตเข้มข้น', 'cakecho', 150.00),
	(1, 42, 'dessert', 'ไอศกรีมวนิลา', 'ไอศกรีมวนิลาแท้ 100%', 'icecream_valila', 90.14),
	(1, 43, 'dessert', 'พุดดิ้งมะม่วง', 'พุดดิ้งมะม่วงรสชาติหวานหอม', 'puding_mango', 80.00),
	(1, 44, 'dessert', 'บราวนี่', 'บราวนี่เนื้อหนึบช็อกโกแลต', 'brownie', 120.00),
	(1, 45, 'dessert', 'แพนเค้กผลไม้', 'แพนเค้กเสิร์ฟพร้อมผลไม้สด', 'cake_fruit', 130.00),
	(1, 46, 'beverage', 'ชาเย็น', 'ชาไทยเย็น หวานกำลังดี', 'chayen', 40.00),
	(1, 47, 'beverage', 'กาแฟสด', 'กาแฟดำสดจากเมล็ดคั่ว', 'gafare', 50.00),
	(1, 48, 'beverage', 'น้ำผลไม้สด', 'น้ำส้มคั้นสด', 'water_fruit', 60.00),
	(1, 49, 'beverage', 'น้ำเปล่า', 'น้ำดื่มสะอาด', 'water', 20.00),
	(1, 50, 'beverage', 'โซดาผลไม้', 'โซดารสชาติผลไม้', 'soda_fruit', 45.00),
	(1, 51, 'snack', 'มันฝรั่งทอด', 'มันฝรั่งทอดกรอบร้อนๆ', 'fries', 70.00),
	(1, 52, 'snack', 'ป๊อปคอร์น', 'ป๊อปคอร์นรสเนย', 'popcorn', 60.00),
	(1, 53, 'snack', 'ถั่วอบ', 'ถั่วอบกรอบรสเค็ม', 'bean', 50.00),
	(1, 54, 'snack', 'ข้าวโพดคั่ว', 'ข้าวโพดคั่วกรอบ', 'popcorn', 55.00),
	(1, 55, 'snack', 'ขนมถั่วลิสง', 'ขนมถั่วลิสงหวาน', 'bean_fries', 45.00),
	(1, 56, 'main_course', 'ข้าวผัดกุ้ง', 'ข้าวผัดรสชาติจัดจ้านกับกุ้งสด', 'krowpat_kung', 120.00),
	(1, 57, 'main_course', 'ผัดไทย', 'ผัดไทยกุ้งสด ใส่ถั่วลิสง', 'padthai', 110.00),
	(1, 58, 'main_course', 'ต้มยำกุ้ง', 'ต้มยำกุ้งน้ำข้น รสแซ่บ', 'tomyum', 130.00),
	(1, 59, 'main_course', 'แกงเขียวหวานไก่', 'แกงเขียวหวานไก่รสเข้มข้น', 'kangkew', 125.00),
	(1, 60, 'main_course', 'ส้มตำไทย', 'ส้มตำไทยรสจัดจ้าน', 'somtumthai', 90.00),
	(2, 61, 'dessert', 'มูสช็อกโกแลต', 'มูสช็อกโกแลตเนื้อนุ่ม', 'moschok', 160.00),
	(2, 62, 'dessert', 'เจลาโต้ผลไม้', 'เจลาโต้รสผลไม้สด', 'gelato', 100.00),
	(2, 63, 'beverage', 'กาแฟลาเต้', 'กาแฟลาเต้รสละมุน', 'coffe_late', 70.00),
	(2, 64, 'beverage', 'น้ำมะนาวสด', 'น้ำมะนาวคั้นสดไม่ใส่น้ำตาล', 'manou', 50.00),
	(2, 65, 'snack', 'เครปญี่ปุ่น', 'เครปกรอบไส้ครีมสด', 'carpe', 90.00),
	(2, 66, 'snack', 'แซนด์วิชทูน่า', 'แซนด์วิชไส้ทูน่า', 'sandwitch', 110.00),
	(2, 67, 'main_course', 'ข้าวมันไก่', 'ข้าวมันไก่เนื้อนุ่ม', 'ricesteamedwithchicken', 100.00),
	(2, 68, 'main_course', 'ก๋วยเตี๋ยวเรือ', 'ก๋วยเตี๋ยวเรือรสจัด', 'thaiboatnooddles', 95.00),
	(2, 69, 'salad', 'สลัดผักรวม', 'สลัดผักสดน้ำสลัดงา', 'salat', 80.00),
	(2, 70, 'salad', 'สลัดทูน่า', 'สลัดผักกับทูน่าและน้ำสลัดซีฟู้ด', 'salat_tuna', 120.00);

-- Dumping structure for table rsupos_db.status
CREATE TABLE IF NOT EXISTS `status` (
  `status_id` varchar(50) NOT NULL,
  `status_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db.status: ~6 rows (approximately)
INSERT INTO `status` (`status_id`, `status_name`) VALUES
	('available', 'พร้อมใช้งาน'),
	('cleaning', 'กำลังทำความสะอาด'),
	('disabled', 'ปิดใช้งาน'),
	('occupied', 'ไม่ว่าง / กำลังใช้งาน'),
	('reserved', 'จองล่วงหน้า'),
	('waiting_for_bill', 'รอเช็คบิล');

-- Dumping structure for table rsupos_db.store
CREATE TABLE IF NOT EXISTS `store` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_name` varchar(50) DEFAULT NULL,
  `store_manager` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db.store: ~2 rows (approximately)
INSERT INTO `store` (`store_id`, `store_name`, `store_manager`) VALUES
	(1, 'สาขานครปฐม', 'John Doe'),
	(2, 'สาขากทม', 'Johnny'),
	(3, 'สาขาราชบุรี', 'Kenny');

-- Dumping structure for table rsupos_db.tableslist
CREATE TABLE IF NOT EXISTS `tableslist` (
  `store_id` int(11) DEFAULT NULL,
  `table_id` int(11) NOT NULL,
  `session_id` varchar(50) DEFAULT NULL,
  `customer_amount` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  KEY `FK_table_store` (`store_id`),
  KEY `FK_table_status` (`status`),
  KEY `table_id` (`table_id`),
  CONSTRAINT `FK_table_status` FOREIGN KEY (`status`) REFERENCES `status` (`status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_table_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db.tableslist: ~8 rows (approximately)
INSERT INTO `tableslist` (`store_id`, `table_id`, `session_id`, `customer_amount`, `status`, `update_time`) VALUES
	(1, 1, '', 0, 'available', '2025-10-06 07:15:08'),
	(1, 2, '', 0, 'available', '2025-09-22 18:34:16'),
	(1, 3, '36b095f8-1ec6-4ed6-9e6b-fa0474559f48', 4, 'occupied', '2025-10-06 07:15:15'),
	(2, 1, 'e3798620-5a26-48e5-beac-40f504bb5776', 132, 'occupied', '2025-09-18 21:30:09'),
	(2, 2, NULL, 0, 'available', '2025-09-10 10:27:02'),
	(2, 3, NULL, 0, 'available', '2025-09-10 10:27:02'),
	(3, 1, '', 0, 'available', '2025-09-13 22:13:54'),
	(1, 4, '9865c517-2ad8-4668-9e0a-5685f1c4a834', 32, 'occupied', '2025-09-24 10:26:41');

-- Dumping structure for table rsupos_db.user
CREATE TABLE IF NOT EXISTS `user` (
  `userid` int(11) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db.user: ~0 rows (approximately)

-- Dumping structure for trigger rsupos_db.order_after_insert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `order_after_insert`
AFTER INSERT ON `orderlist` FOR EACH ROW
BEGIN
	INSERT INTO `order_log` (
		`action`, `storeid`, `tableid`, `sessionid`, `productid`, `status`, `time`
	) VALUES (
		'INSERT', NEW.storeid, NEW.tableid, NEW.sessionid, NEW.productid, NEW.status, NEW.time
	);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger rsupos_db.order_after_update
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `order_after_update`
AFTER UPDATE ON `orderlist` FOR EACH ROW
BEGIN
	INSERT INTO `order_log` (
		`action`, `storeid`, `tableid`, `sessionid`, `productid`, `status`, `time`
	) VALUES (
		'UPDATE', NEW.storeid, NEW.tableid, NEW.sessionid, NEW.productid, NEW.status, NEW.time
	);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
