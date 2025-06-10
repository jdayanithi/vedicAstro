-- Create new users table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birth_date DATE,
    birth_time TIME,
    birth_place VARCHAR(100),
    profile_picture VARCHAR(255),
    bio TEXT,
    user_type ENUM('student', 'instructor', 'admin') NOT NULL,
    zodiac_sign VARCHAR(20),
    rising_sign VARCHAR(20),
    moon_sign VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Migrate data from tbl_login to users
INSERT INTO users (
    username,
    email,
    password_hash,
    first_name,
    last_name,
    user_type,
    created_at,
    updated_at
)
SELECT 
    username,
    username as email,
    password as password_hash,
    first_name,
    last_name,
    CASE 
        WHEN role = 'ADMIN' THEN 'admin'
        ELSE 'student'
    END as user_type,
    created_date as created_at,
    updated_date as updated_at
FROM tbl_login;

-- Drop the old table after confirming the migration was successful
-- DROP TABLE tbl_login;
