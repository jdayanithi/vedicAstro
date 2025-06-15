-- Add category_type column to categories table
ALTER TABLE `categories` 
ADD COLUMN `category_type` varchar(100) DEFAULT NULL 
AFTER `description`;

-- Add is_published column to categories table
ALTER TABLE `categories` 
ADD COLUMN `is_published` tinyint(1) NOT NULL DEFAULT 1 
AFTER `category_type`;
