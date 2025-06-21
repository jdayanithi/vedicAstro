-- Add payment_proof_url column to payments table
ALTER TABLE payments ADD COLUMN payment_proof_url VARCHAR(500) AFTER comments;
