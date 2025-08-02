const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'vedic_astro',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Database initialization
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await connection.execute(`USE ${dbConfig.database}`);
    
    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255),
        full_name VARCHAR(255),
        phone VARCHAR(20),
        date_of_birth DATE,
        google_id VARCHAR(255),
        profile_picture VARCHAR(500),
        auth_provider ENUM('local', 'google') DEFAULT 'local',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        is_active TINYINT(1) DEFAULT 1,
        INDEX idx_email (email),
        INDEX idx_username (username),
        INDEX idx_google_id (google_id),
        INDEX idx_auth_provider (auth_provider)
      )
    `);

    // Create courses table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course_name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        duration_weeks INT,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create payments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        payment_method ENUM('credit_card', 'debit_card', 'paypal', 'bank_transfer', 'upi', 'google_play') NOT NULL,
        payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
        transaction_id VARCHAR(255),
        payment_gateway VARCHAR(100),
        google_play_purchase_token VARCHAR(500),
        google_play_product_id VARCHAR(255),
        google_play_order_id VARCHAR(255),
        is_subscription TINYINT(1) DEFAULT 0,
        subscription_start_date TIMESTAMP NULL,
        subscription_end_date TIMESTAMP NULL,
        payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_course_id (course_id),
        INDEX idx_payment_status (payment_status),
        INDEX idx_google_play_token (google_play_purchase_token),
        INDEX idx_google_play_order (google_play_order_id)
      )
    `);

    // Create user_courses table (enrollment tracking)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completion_date TIMESTAMP NULL,
        status ENUM('enrolled', 'in_progress', 'completed', 'dropped') DEFAULT 'enrolled',
        progress_percentage DECIMAL(5, 2) DEFAULT 0.00,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_course (user_id, course_id),
        INDEX idx_user_id (user_id),
        INDEX idx_course_id (course_id)
      )
    `);

    // Create user_devices table (device tracking)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_devices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        device_id VARCHAR(255) NOT NULL,
        device_name VARCHAR(255),
        device_model VARCHAR(255),
        device_brand VARCHAR(255),
        android_version VARCHAR(50),
        app_version VARCHAR(50),
        is_active TINYINT(1) DEFAULT 1,
        first_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        login_count INT DEFAULT 1,
        fcm_token VARCHAR(500),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_device (user_id, device_id),
        INDEX idx_user_id (user_id),
        INDEX idx_device_id (device_id),
        INDEX idx_is_active (is_active)
      )
    `);

    // Create login_sessions table (session tracking)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS login_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        device_id VARCHAR(255) NOT NULL,
        session_token VARCHAR(500) NOT NULL,
        jwt_token_id VARCHAR(255),
        login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        logout_time TIMESTAMP NULL,
        is_active TINYINT(1) DEFAULT 1,
        ip_address VARCHAR(45),
        user_agent TEXT,
        location_country VARCHAR(100),
        location_city VARCHAR(100),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_device_id (device_id),
        INDEX idx_session_token (session_token),
        INDEX idx_is_active (is_active),
        INDEX idx_jwt_token_id (jwt_token_id)
      )
    `);

    // Insert sample courses
    await connection.execute(`
      INSERT IGNORE INTO courses (id, course_name, description, price, duration_weeks) VALUES
      (1, 'Basic Vedic Astrology', 'Introduction to Vedic Astrology fundamentals', 999.00, 8),
      (2, 'Advanced Nakshatra Analysis', 'Deep dive into Nakshatra characteristics and predictions', 1499.00, 12),
      (3, 'Horoscope Reading Mastery', 'Complete guide to reading and interpreting horoscopes', 1999.00, 16),
      (4, 'Remedial Astrology', 'Learn about astrological remedies and solutions', 1299.00, 10)
    `);

    connection.release();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

// Call initialization
// initializeDatabase();

module.exports = pool;
module.exports.initializeDatabase = initializeDatabase;
