-- Insert test payment with pending status
-- Make sure you have login_id=1 and course_id=1 in your database

INSERT INTO payments (login_id, course_id, amount, payment_method, transaction_id, status, payment_date, comments)
VALUES (1, 1, 999.00, 'UPI', 'TEST_TXN_PENDING_12345', 'pending', NOW(), 'Test payment with pending status for debugging')
ON DUPLICATE KEY UPDATE
amount = VALUES(amount),
payment_method = VALUES(payment_method),
transaction_id = VALUES(transaction_id),
status = VALUES(status),
comments = VALUES(comments);

-- Also insert another payment with completed status for comparison
INSERT INTO payments (login_id, course_id, amount, payment_method, transaction_id, status, payment_date, comments)
VALUES (1, 2, 1500.00, 'UPI', 'TEST_TXN_COMPLETED_56789', 'completed', NOW(), 'Test payment with completed status for debugging')
ON DUPLICATE KEY UPDATE
amount = VALUES(amount),
payment_method = VALUES(payment_method),
transaction_id = VALUES(transaction_id),
status = VALUES(status),
comments = VALUES(comments);

-- Check inserted data
SELECT 
    p.payment_id,
    p.login_id,
    p.course_id,
    c.title as course_title,
    p.amount,
    p.status,
    p.payment_method,
    p.transaction_id,
    p.payment_date
FROM payments p
LEFT JOIN courses c ON p.course_id = c.course_id
WHERE p.transaction_id LIKE 'TEST_TXN_%'
ORDER BY p.payment_date DESC;
