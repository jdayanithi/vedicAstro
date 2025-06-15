-- Update existing categories with sample category types
UPDATE `categories` 
SET `category_type` = 'Astro' 
WHERE `category_type` IS NULL AND `name` LIKE '%Beginner%';

-- You can add more updates here for existing categories
-- Example:
-- UPDATE `categories` SET `category_type` = 'IT' WHERE `name` LIKE '%Technology%';
-- UPDATE `categories` SET `category_type` = 'Student' WHERE `name` LIKE '%Student%';
-- UPDATE `categories` SET `category_type` = 'Academic' WHERE `name` LIKE '%Academic%';
-- UPDATE `categories` SET `category_type` = 'Professional' WHERE `name` LIKE '%Professional%';
