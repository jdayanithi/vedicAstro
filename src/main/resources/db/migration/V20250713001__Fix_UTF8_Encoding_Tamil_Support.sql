-- Fix UTF-8 encoding for Tamil and Unicode character support
-- This migration updates the character set and collation for text fields

-- First, check and update the database default charset
ALTER DATABASE astroguide CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Update courses table for Tamil text support
ALTER TABLE courses 
CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
MODIFY title VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
MODIFY description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
MODIFY thumbnail_url TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Update image_library table for Tamil text support
ALTER TABLE image_library 
CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
MODIFY title VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
MODIFY description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
MODIFY alt_text VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
MODIFY tags VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Update login table for Tamil text support (if it has text fields)
ALTER TABLE login 
CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
MODIFY first_name VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
MODIFY last_name VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
MODIFY bio TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
MODIFY birth_place VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
