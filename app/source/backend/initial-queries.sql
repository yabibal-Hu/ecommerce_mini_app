-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS `users` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255),
    `last_name` VARCHAR(255),
    `phone_number` VARCHAR(20),
    `role` ENUM('admin', 'customer', 'delivery') DEFAULT 'customer',
    `password_hash` VARCHAR(255),
    `telegram_id` VARCHAR(255) UNIQUE,
    `preferred_language` INT,
    FOREIGN KEY (`preferred_language`) REFERENCES `languages`(`language_id`)
) ENGINE=InnoDB;

-- 2. Create Categories Table
CREATE TABLE IF NOT EXISTS `categories` (
    `category_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT
) ENGINE=InnoDB;

-- 3. Create Products Table
CREATE TABLE IF NOT EXISTS `products` (
    `product_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `price` DECIMAL(10, 2) NOT NULL,
    `available` BOOLEAN DEFAULT TRUE,
    `category_id` INT,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`)
) ENGINE=InnoDB;

-- 4. Create Orders Table
CREATE TABLE IF NOT EXISTS `orders` (
    `order_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `delivery_id` INT,
    `status` ENUM('pending', 'accepted', 'delivering', 'completed', 'cancelled') DEFAULT 'pending',
    `order_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `delivery_date` DATETIME,
    `pickup_address` VARCHAR(255),
    `delivery_address` VARCHAR(255),
    `price` DECIMAL(10, 2),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY (`delivery_id`) REFERENCES `users`(`user_id`)
) ENGINE=InnoDB;

-- 5. Create Payments Table
CREATE TABLE IF NOT EXISTS `payments` (
    `payment_id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT,
    `amount` DECIMAL(10, 2),
    `payment_method` ENUM('cash', 'credit_card', 'online') NOT NULL,
    `status` ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    `payment_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`)
) ENGINE=InnoDB;

-- 6. Create Admin Logs Table
CREATE TABLE IF NOT EXISTS `admin_logs` (
    `log_id` INT AUTO_INCREMENT PRIMARY KEY,
    `admin_id` INT,
    `action` VARCHAR(255),
    `order_id` INT,
    `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`admin_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`)
) ENGINE=InnoDB;

-- 7. Create Delivery Personnel Table
CREATE TABLE IF NOT EXISTS `delivery_personnel` (
    `delivery_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `availability` BOOLEAN DEFAULT TRUE,
    `vehicle_type` VARCHAR(50),
    `license_plate` VARCHAR(50),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
) ENGINE=InnoDB;

-- 8. Create Cart Table
CREATE TABLE IF NOT EXISTS `cart` (
    `cart_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `product_id` INT,
    `quantity` INT DEFAULT 1,
    `added_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`)
) ENGINE=InnoDB;

-- 9. Create Favorites Table
CREATE TABLE IF NOT EXISTS `favorites` (
    `favorite_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `product_id` INT,
    `added_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`)
) ENGINE=InnoDB;

-- 10. Create Languages Table
CREATE TABLE IF NOT EXISTS `languages` (
    `language_id` INT AUTO_INCREMENT PRIMARY KEY,
    `language_code` VARCHAR(10) NOT NULL,  -- e.g., 'en', 'fr', 'es'
    `language_name` VARCHAR(50) NOT NULL  -- e.g., 'English', 'French', 'Spanish'
) ENGINE=InnoDB;

-- 11. Create Theme Settings Table
CREATE TABLE IF NOT EXISTS `themes` (
    `theme_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `theme_preference` ENUM('light', 'dark') DEFAULT 'light',
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
) ENGINE=InnoDB;

-- 12. Create Delivery Routes Table (Optional)
CREATE TABLE IF NOT EXISTS `delivery_routes` (
    `route_id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT,
    `pickup_lat` DECIMAL(10, 8),
    `pickup_long` DECIMAL(11, 8),
    `delivery_lat` DECIMAL(10, 8),
    `delivery_long` DECIMAL(11, 8),
    `distance` DECIMAL(10, 2),
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`)
) ENGINE=InnoDB;

-- Insert Default Admin
INSERT INTO `users` (`username`, `first_name`, `last_name`, `phone_number`, `role`, `password_hash`, `telegram_id`, `preferred_language`)
VALUES ('admin', 'Default', 'Admin', '1234567890', 'admin', MD5('admin_password'), '123456789', 1);

-- Insert Default Language
INSERT INTO `languages` (`language_code`, `language_name`)
VALUES ('en', 'English');


-- Password hashing: The password_hash uses MD5 for simplicity, but for security in production, it's recommended to use stronger hashing algorithms like bcrypt or argon2.
-- Default language: Inserts 'English' as the default language. You can add more languages using similar queries.
-- Admin role: The default admin's username is 'admin' and the password is 'admin_password' (hashed with MD5). Adjust the values as needed.