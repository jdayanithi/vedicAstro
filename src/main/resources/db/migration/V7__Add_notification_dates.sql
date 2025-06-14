-- Add start_date and expiry_date columns to notifications table
ALTER TABLE notifications 
ADD COLUMN start_date DATETIME NULL 
COMMENT 'When the notification becomes active';

ALTER TABLE notifications 
ADD COLUMN expiry_date DATETIME NULL 
COMMENT 'When the notification expires (optional)';

-- Add indexes for better query performance
CREATE INDEX idx_notifications_start_date ON notifications(start_date);
CREATE INDEX idx_notifications_expiry_date ON notifications(expiry_date);

-- Update existing records to have a start date (current created_at time)
UPDATE notifications 
SET start_date = created_at 
WHERE start_date IS NULL;

-- Update notification_type column to have default values for existing records
UPDATE notifications 
SET notification_type = 'push' 
WHERE notification_type IS NULL OR notification_type = '';
