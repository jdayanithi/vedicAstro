-- Insert a test user for authentication testing
INSERT INTO tbl_login (username, password, role, first_name, last_name, user_type, created_date, updated_date)
VALUES 
  ('testuser@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'USER', 'Test', 'User', 'STUDENT', NOW(), NOW()),
  ('admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'ADMIN', 'Admin', 'User', 'TEACHER', NOW(), NOW());
  
-- The encrypted password is 'secret' for both users
