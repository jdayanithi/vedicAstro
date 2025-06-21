-- Test script to add a payment with pending status
-- Run this in your MySQL database to create test data

-- First, make sure we have a test user (assuming loginId = 1 exists)
-- And a test course (assuming courseId = 1 exists)

-- Insert a test payment with pending status
INSERT INTO payments (login_id, course_id, amount, payment_method, transaction_id, status, payment_date, comments)
VALUES (1, 1, 999.00, 'UPI', 'TEST_TXN_12345', 'pending', NOW(), 'Test payment for debugging');

-- Check if the payment was inserted
SELECT p.*, c.title as course_title, l.email as user_email 
FROM payments p
JOIN courses c ON p.course_id = c.course_id
JOIN login l ON p.login_id = l.login_id
WHERE p.status = 'pending';
