-- Add expiry_date column to payments table
ALTER TABLE payments 
ADD COLUMN expiry_date DATETIME NULL 
COMMENT 'Expiry date for payment validity or access duration';

-- Add created_by and modified_by columns for audit trail
ALTER TABLE payments 
ADD COLUMN created_by BIGINT NULL 
COMMENT 'ID of user who created this payment record';

ALTER TABLE payments 
ADD COLUMN modified_by BIGINT NULL 
COMMENT 'ID of user who last modified this payment record';

-- Add comments column for additional notes
ALTER TABLE payments 
ADD COLUMN comments TEXT NULL 
COMMENT 'Additional comments or notes about the payment';

-- Add foreign key constraints for created_by and modified_by
ALTER TABLE payments 
ADD CONSTRAINT fk_payments_created_by 
FOREIGN KEY (created_by) REFERENCES login(id) ON DELETE SET NULL;

ALTER TABLE payments 
ADD CONSTRAINT fk_payments_modified_by 
FOREIGN KEY (modified_by) REFERENCES login(id) ON DELETE SET NULL;

-- Add index for better query performance on expiry_date
CREATE INDEX idx_payments_expiry_date ON payments(expiry_date);

-- Add indexes for audit columns
CREATE INDEX idx_payments_created_by ON payments(created_by);
CREATE INDEX idx_payments_modified_by ON payments(modified_by);

-- Update existing records to have a default expiry date (e.g., 1 year from payment date)
UPDATE payments 
SET expiry_date = DATE_ADD(payment_date, INTERVAL 1 YEAR) 
WHERE expiry_date IS NULL AND status = 'completed';
