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

-- Data exporting was unselected.

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

-- Data exporting was unselected.

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

-- Data exporting was unselected.

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

-- Data exporting was unselected.

-- Dumping structure for table rsupos_db_bk.status
CREATE TABLE IF NOT EXISTS `status` (
  `status_id` varchar(50) NOT NULL,
  `status_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table rsupos_db_bk.store
CREATE TABLE IF NOT EXISTS `store` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_name` varchar(50) DEFAULT NULL,
  `store_manager` int(11) DEFAULT NULL,
  PRIMARY KEY (`store_id`),
  KEY `FK_store_user` (`store_manager`),
  CONSTRAINT `FK_store_user` FOREIGN KEY (`store_manager`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

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

-- Data exporting was unselected.

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

-- Data exporting was unselected.

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
