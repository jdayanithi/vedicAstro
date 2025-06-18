-- Manual SQL script to add Google OAuth columns to tbl_login table
-- Run this script in your MySQL database if automatic migration fails

USE astroguide;

-- Add only the google_id column (we'll use username for email)
ALTER TABLE `tbl_login` 
ADD COLUMN `google_id` VARCHAR(255) UNIQUE AFTER `phone_number`;

-- Make phone_number nullable for Google users
ALTER TABLE `tbl_login` 
MODIFY COLUMN `phone_number` VARCHAR(255) NULL;

-- Create index for better performance
CREATE INDEX `idx_tbl_login_google_id` ON `tbl_login` (`google_id`);

-- Verify the changes
DESCRIBE `tbl_login`;

-- Show the updated table structure
SHOW CREATE TABLE `tbl_login`;
