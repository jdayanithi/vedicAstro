-- Increase thumbnail_url column size to handle longer URLs
ALTER TABLE courses MODIFY COLUMN thumbnail_url VARCHAR(2000);
