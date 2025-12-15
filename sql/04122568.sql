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


-- Dumping database structure for rsupos_db_bk
CREATE DATABASE IF NOT EXISTS `rsupos_db_bk` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `rsupos_db_bk`;

-- Dumping structure for table rsupos_db_bk.category
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` varchar(50) NOT NULL,
  `category_name` varchar(50) DEFAULT NULL,
  `category_store` int(11) DEFAULT NULL,
  KEY `FK_category_store` (`category_store`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `FK_category_store` FOREIGN KEY (`category_store`) REFERENCES `store` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db_bk.category: ~12 rows (approximately)
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
	('dessert', 'ขนมหวาน', 1),
	('Test11', 'Test12', 9),
	('testy', 'testly', 8);

-- Dumping structure for table rsupos_db_bk.orderlist
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db_bk.orderlist: ~11 rows (approximately)
INSERT INTO `orderlist` (`orderid`, `storeid`, `tableid`, `sessionid`, `productid`, `quantity`, `price`, `img`, `status`, `time`) VALUES
	(12, 1, 1, '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 41, 1, 150.00, 'cakecho', 'กำลังเตรียมอาหาร', '2025-11-17 08:55:50'),
	(13, 1, 1, '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 48, 1, 60.00, 'water_fruit', 'กำลังเตรียมอาหาร', '2025-11-17 08:55:50'),
	(14, 1, 1, '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 56, 1, 120.00, 'krowpat_kung', 'กำลังเตรียมอาหาร', '2025-11-17 08:55:50'),
	(15, 1, 1, '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 43, 1, 80.00, 'puding_mango', 'กำลังเตรียมอาหาร', '2025-11-17 09:16:17'),
	(16, 1, 1, '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 47, 1, 50.00, 'gafare', 'กำลังเตรียมอาหาร', '2025-11-17 09:16:17'),
	(17, 1, 1, '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 54, 1, 55.00, 'popcorn', 'กำลังเตรียมอาหาร', '2025-11-17 09:20:45'),
	(18, 1, 1, '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 55, 1, 45.00, 'bean_fries', 'กำลังเตรียมอาหาร', '2025-11-17 09:20:45'),
	(19, 1, 1, '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 59, 1, 125.00, 'kangkew', 'กำลังเตรียมอาหาร', '2025-11-17 10:18:57'),
	(20, 1, 1, '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 60, 1, 90.00, 'somtumthai', 'กำลังเตรียมอาหาร', '2025-11-17 10:18:57'),
	(21, 1, 1, '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 42, 1, 90.14, 'icecream_valila', 'กำลังเตรียมอาหาร', '2025-11-17 11:43:26'),
	(24, 1, 4, '25967953-69c9-4462-8dd1-986c1210e97a', 41, 1, 150.00, 'cakecho', 'กำลังเตรียมอาหาร', '2025-11-19 13:14:28'),
	(25, 1, 2, '900950ee-7377-4f0c-b253-59076b4042db', 41, 1, 150.00, 'cakecho', 'กำลังเตรียมอาหาร', '2025-12-03 17:39:12');

-- Dumping structure for table rsupos_db_bk.orderlist_log
CREATE TABLE IF NOT EXISTS `orderlist_log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `orderid` int(11) NOT NULL,
  `storeid` text DEFAULT NULL,
  `sessionid` text DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `old_status` varchar(255) DEFAULT NULL,
  `new_status` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(20,2) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`log_id`) USING BTREE,
  KEY `FK_log_order` (`orderid`) USING BTREE,
  CONSTRAINT `FK_log_order` FOREIGN KEY (`orderid`) REFERENCES `orderlist` (`orderid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db_bk.orderlist_log: ~7 rows (approximately)
INSERT INTO `orderlist_log` (`log_id`, `orderid`, `storeid`, `sessionid`, `action`, `old_status`, `new_status`, `quantity`, `price`, `detail`, `created_at`) VALUES
	(1, 17, '1', '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 'insert', NULL, 'กำลังเตรียมอาหาร', 1, 55.00, 'สร้างออเดอร์ใหม่', '2025-11-17 09:20:45'),
	(2, 18, '1', '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 'insert', NULL, 'กำลังเตรียมอาหาร', 1, 45.00, 'สร้างออเดอร์ใหม่', '2025-11-17 09:20:45'),
	(3, 19, '2', '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 'insert', NULL, 'กำลังเตรียมอาหาร', 1, 125.00, 'สร้างออเดอร์ใหม่', '2025-11-17 10:18:57'),
	(4, 20, '2', '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 'insert', NULL, 'กำลังเตรียมอาหาร', 1, 90.00, 'สร้างออเดอร์ใหม่', '2025-11-17 10:18:57'),
	(5, 21, '1', '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 'insert', NULL, 'กำลังเตรียมอาหาร', 1, 90.14, 'สร้างออเดอร์ใหม่', '2025-11-17 11:43:26'),
	(8, 24, '1', '25967953-69c9-4462-8dd1-986c1210e97a', 'insert', NULL, 'กำลังเตรียมอาหาร', 1, 150.00, 'สร้างออเดอร์ใหม่', '2025-11-19 13:14:28'),
	(9, 25, '1', '900950ee-7377-4f0c-b253-59076b4042db', 'insert', NULL, 'กำลังเตรียมอาหาร', 1, 150.00, 'สร้างออเดอร์ใหม่', '2025-12-03 17:39:12');

-- Dumping structure for table rsupos_db_bk.product
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
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db_bk.product: ~37 rows (approximately)
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
	(2, 70, 'salad', 'สลัดทูน่า', 'สลัดผักกับทูน่าและน้ำสลัดซีฟู้ด', 'salat_tuna', 120.00),
	(2, 72, 'salad', 'SaladTest', 'test', 'salad', 1200.00),
	(9, 73, 'Test11', 'นานา', 'บานานา000', 'banana', 100.00),
	(8, 75, 'testy', 'testily', 'testy', 'oooo', 120.76),
	(8, 76, 'testy', 'Test', 'test', 'cake', 545.00),
	(1, 77, 'dessert', 'cake test', 'test', 'cake', 9000.00),
	(2, 78, 'snack', 'cake test', 'test', 'cake', 54533.00),
	(1, 79, 'beverage', 'test drink', 'test', 'cake', 4000.00);

-- Dumping structure for table rsupos_db_bk.status
CREATE TABLE IF NOT EXISTS `status` (
  `status_id` varchar(50) NOT NULL,
  `status_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db_bk.status: ~6 rows (approximately)
INSERT INTO `status` (`status_id`, `status_name`) VALUES
	('available', 'พร้อมใช้งาน'),
	('cleaning', 'กำลังทำความสะอาด'),
	('disabled', 'ปิดใช้งาน'),
	('occupied', 'ไม่ว่าง / กำลังใช้งาน'),
	('reserved', 'จองล่วงหน้า'),
	('waiting_for_bill', 'รอเช็คบิล');

-- Dumping structure for table rsupos_db_bk.store
CREATE TABLE IF NOT EXISTS `store` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_name` varchar(50) DEFAULT NULL,
  `store_manager` int(11) DEFAULT NULL,
  PRIMARY KEY (`store_id`),
  KEY `FK_store_user` (`store_manager`),
  CONSTRAINT `FK_store_user` FOREIGN KEY (`store_manager`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db_bk.store: ~10 rows (approximately)
INSERT INTO `store` (`store_id`, `store_name`, `store_manager`) VALUES
	(1, 'สาขานครปฐม', 10000),
	(2, 'สาขากทม', 10000),
	(3, 'สาขาราชบุรี', 10000),
	(4, 'กรุงธน', 10003),
	(5, 'โตเกียว', 10003),
	(6, 'รังสิต', 10003),
	(7, 'พาราก้อน', 10003),
	(8, 'นครสววรค์', 10003),
	(9, 'ชิบูย่า', 10003),
	(12, 'test', 10003);

-- Dumping structure for table rsupos_db_bk.tableslist
CREATE TABLE IF NOT EXISTS `tableslist` (
  `store_id` int(11) DEFAULT NULL,
  `table_id` int(11) NOT NULL,
  `session_id` varchar(50) DEFAULT NULL,
  `customer_amount` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'available',
  `update_time` timestamp NULL DEFAULT NULL,
  KEY `FK_table_store` (`store_id`),
  KEY `FK_table_status` (`status`),
  KEY `table_id` (`table_id`),
  CONSTRAINT `FK_table_status` FOREIGN KEY (`status`) REFERENCES `status` (`status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_table_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db_bk.tableslist: ~9 rows (approximately)
INSERT INTO `tableslist` (`store_id`, `table_id`, `session_id`, `customer_amount`, `status`, `update_time`) VALUES
	(1, 1, '3b32bf2c-c1ed-4889-b4aa-39f8398a8248', 6, 'occupied', '2025-11-17 08:54:59'),
	(1, 2, '900950ee-7377-4f0c-b253-59076b4042db', 5, 'waiting_for_bill', '2025-12-03 17:41:38'),
	(1, 3, '', 0, 'available', '2025-11-19 05:55:25'),
	(2, 1, 'e3798620-5a26-48e5-beac-40f504bb5776', 132, 'occupied', '2025-10-19 09:39:01'),
	(2, 2, NULL, 0, 'available', '2025-09-10 10:27:02'),
	(2, 3, NULL, 0, 'available', '2025-09-10 10:27:02'),
	(3, 1, '', 0, 'available', '2025-09-13 22:13:54'),
	(1, 4, '25967953-69c9-4462-8dd1-986c1210e97a', 5, 'waiting_for_bill', '2025-11-19 13:15:26'),
	(5, 1, '7f524acf-d31c-4ac2-8d0d-c39efbbda6bf', 5, 'occupied', '2025-11-16 23:57:44');

-- Dumping structure for table rsupos_db_bk.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `atb` int(11) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10006 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rsupos_db_bk.user: ~5 rows (approximately)
INSERT INTO `user` (`id`, `username`, `password`, `name`, `email`, `atb`, `role`) VALUES
	(10000, 'admin', 'admin', 'admin', 'admin@admin.com', 1, 'admin'),
	(10001, 'owner', 'owner', 'owner', 'owner@owner.com', 0, 'owner'),
	(10003, 'oliengpppp', '112233', 'Olieng Pacharuk', 'og@gg.com', 2, 'admin'),
	(10004, 'ck', 'ck', 'Chakhit', 'ck@gmail.com', 1, 'member'),
	(10005, 'pk', 'pk', 'pk', 'ploy11@gg.com', 8, 'member');

-- Dumping structure for trigger rsupos_db_bk.trg_orderlist_insert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER trg_orderlist_insert
AFTER INSERT ON orderlist
FOR EACH ROW
BEGIN
    INSERT INTO orderlist_log (orderid, storeid, sessionid, action, new_status, quantity, price, detail)
    VALUES (NEW.orderid, NEW.storeid, NEW.sessionid, 'insert', NEW.status, NEW.quantity, NEW.price, 'สร้างออเดอร์ใหม่');
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger rsupos_db_bk.trg_orderlist_update_status
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER trg_orderlist_update_status
AFTER UPDATE ON orderlist
FOR EACH ROW
BEGIN
    IF (OLD.status <> NEW.status) THEN
        INSERT INTO orderlist_log (orderid, storeid, sessionid, action, old_status, new_status, detail)
        VALUES (NEW.orderid, NEW.storeid, NEW.sessionid, 'update_status', OLD.status, NEW.status, 'เปลี่ยนสถานะออเดอร์');
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
