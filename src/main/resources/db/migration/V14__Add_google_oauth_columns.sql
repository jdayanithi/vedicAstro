-- Add google_id column for Google OAuth login support (using username for email)
-- Migration: V14__Add_google_oauth_columns.sql

ALTER TABLE `tbl_login` 
ADD COLUMN `google_id` VARCHAR(255) UNIQUE AFTER `phone_number`;

-- Update phone_number to allow NULL values for Google users
ALTER TABLE `tbl_login` 
MODIFY COLUMN `phone_number` VARCHAR(255) NULL;

-- Create index for faster google_id lookups
CREATE INDEX `idx_tbl_login_google_id` ON `tbl_login` (`google_id`);
