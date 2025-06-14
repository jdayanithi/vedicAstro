-- Add support for broadcast notifications to all users
ALTER TABLE notifications 
ADD COLUMN is_broadcast BOOLEAN DEFAULT false NOT NULL,
MODIFY COLUMN login_id BIGINT NULL;

-- Add index for better performance when querying broadcast notifications
CREATE INDEX idx_notifications_broadcast ON notifications(is_broadcast);

-- Add index for better performance when querying by user and broadcast status
CREATE INDEX idx_notifications_user_broadcast ON notifications(login_id, is_broadcast);
