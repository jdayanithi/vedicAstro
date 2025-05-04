-- Insert admin user
INSERT INTO tbl_login (username, password, role, first_name, last_name, phone_number, created_date)
VALUES ('admin', '$2a$10$HQeWmrlAGDr0s3MUNNwlje8F3v8.gNLqZz1hH4nYPDQtFCpvgbPpG', 'ADMIN', 'Admin', 'User', '1234567890', CURRENT_TIMESTAMP);

-- Insert viewer user
INSERT INTO tbl_login (username, password, role, first_name, last_name, phone_number, created_date)
VALUES ('viewer', '$2a$10$HQeWmrlAGDr0s3MUNNwlje8F3v8.gNLqZz1hH4nYPDQtFCpvgbPpG', 'VIEWER', 'Viewer', 'User', '9876543210', CURRENT_TIMESTAMP);

-- Insert additional admin user with password123
INSERT INTO tbl_login (username, password, role, first_name, last_name, phone_number, created_date)
VALUES ('admin2', '$2a$10$6EwITJ7Vyc0stV5PqHBsqe4K7U3JZxXS7YHW.IgWj6F1dX6EpjhvO', 'ADMIN', 'Admin2', 'User', '5555555555', CURRENT_TIMESTAMP);

-- Insert additional viewer user with password123  
INSERT INTO tbl_login (username, password, role, first_name, last_name, phone_number, created_date)
VALUES ('viewer2', '$2a$10$6EwITJ7Vyc0stV5PqHBsqe4K7U3JZxXS7YHW.IgWj6F1dX6EpjhvO', 'VIEWER', 'Viewer2', 'User', '6666666666', CURRENT_TIMESTAMP);