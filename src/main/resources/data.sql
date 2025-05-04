-- Insert admin user
INSERT INTO tbl_login (username, password, role, first_name, last_name, phone_number, created_date)
VALUES ('admin@example.com', '$2a$10$Zk84dC1BleAWF3q73QyBiOhKtrTtYKAXQFHS9AFYO6wovYnMGpYy6', 'ADMIN', 'Admin', 'User', '1234567890', CURRENT_TIMESTAMP);

-- Insert viewer user
INSERT INTO tbl_login (username, password, role, first_name, last_name, phone_number, created_date)
VALUES ('viewer@example.com', '$2a$10$Zk84dC1BleAWF3q73QyBiOhKtrTtYKAXQFHS9AFYO6wovYnMGpYy6', 'VIEWER', 'Viewer', 'User', '9876543210', CURRENT_TIMESTAMP);

-- Insert additional admin user with password123
INSERT INTO tbl_login (username, password, role, first_name, last_name, phone_number, created_date)
VALUES ('admin2@example.com', '$2a$10$Zk84dC1BleAWF3q73QyBiOhKtrTtYKAXQFHS9AFYO6wovYnMGpYy6', 'ADMIN', 'Admin2', 'User', '5555555555', CURRENT_TIMESTAMP);

-- Insert additional viewer user with password123  
INSERT INTO tbl_login (username, password, role, first_name, last_name, phone_number, created_date)
VALUES ('viewer2@example.com', '$2a$10$Zk84dC1BleAWF3q73QyBiOhKtrTtYKAXQFHS9AFYO6wovYnMGpYy6', 'VIEWER', 'Viewer2', 'User', '6666666666', CURRENT_TIMESTAMP);