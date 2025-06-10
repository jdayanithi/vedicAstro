ALTER TABLE tbl_login
ADD COLUMN birth_date DATE,
ADD COLUMN birth_time TIME,
ADD COLUMN birth_place VARCHAR(100),
ADD COLUMN profile_picture VARCHAR(255),
ADD COLUMN bio TEXT,
ADD COLUMN user_type ENUM('student', 'instructor', 'admin') NOT NULL DEFAULT 'student',
ADD COLUMN zodiac_sign VARCHAR(20),
ADD COLUMN rising_sign VARCHAR(20),
ADD COLUMN moon_sign VARCHAR(20);
