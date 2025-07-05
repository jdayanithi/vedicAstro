-- Create login_history table for tracking all login attempts and security events
CREATE TABLE login_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Login attempt details
    username VARCHAR(255),
    user_id BIGINT NULL,
    ip_address VARCHAR(45) NOT NULL, -- IPv6 compatible
    user_agent TEXT,
    
    -- Login result
    login_status ENUM('SUCCESS', 'FAILED', 'BLOCKED_IP', 'BLOCKED_USERNAME', 'SUSPICIOUS_ACTIVITY') NOT NULL,
    login_type ENUM('STANDARD', 'GOOGLE_OAUTH') NOT NULL DEFAULT 'STANDARD',
    failure_reason VARCHAR(500),
    
    -- Security information
    is_suspicious BOOLEAN DEFAULT FALSE,
    risk_score INT DEFAULT 0, -- 0-100 risk score
    
    -- Geographic and device info
    country VARCHAR(100),
    region VARCHAR(100),
    city VARCHAR(100),
    device_type VARCHAR(50),
    browser VARCHAR(100),
    os VARCHAR(100),
    
    -- Timestamps
    attempt_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for performance
    INDEX idx_username (username),
    INDEX idx_user_id (user_id),
    INDEX idx_ip_address (ip_address),
    INDEX idx_login_status (login_status),
    INDEX idx_attempt_timestamp (attempt_timestamp),
    INDEX idx_is_suspicious (is_suspicious),
    INDEX idx_ip_timestamp (ip_address, attempt_timestamp),
    INDEX idx_username_timestamp (username, attempt_timestamp),
    
    -- Foreign key constraint
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Create a view for recent suspicious activity
CREATE OR REPLACE VIEW recent_suspicious_activity AS
SELECT 
    lh.*,
    u.email as user_email,
    u.first_name,
    u.last_name
FROM login_history lh
LEFT JOIN users u ON lh.user_id = u.user_id
WHERE lh.is_suspicious = TRUE 
   OR lh.login_status IN ('BLOCKED_IP', 'BLOCKED_USERNAME', 'SUSPICIOUS_ACTIVITY')
   OR lh.risk_score >= 70
ORDER BY lh.attempt_timestamp DESC;

-- Create a view for login statistics
CREATE OR REPLACE VIEW login_statistics AS
SELECT 
    DATE(attempt_timestamp) as login_date,
    COUNT(*) as total_attempts,
    SUM(CASE WHEN login_status = 'SUCCESS' THEN 1 ELSE 0 END) as successful_logins,
    SUM(CASE WHEN login_status = 'FAILED' THEN 1 ELSE 0 END) as failed_logins,
    SUM(CASE WHEN login_status IN ('BLOCKED_IP', 'BLOCKED_USERNAME') THEN 1 ELSE 0 END) as blocked_attempts,
    SUM(CASE WHEN is_suspicious = TRUE THEN 1 ELSE 0 END) as suspicious_attempts,
    COUNT(DISTINCT ip_address) as unique_ips,
    COUNT(DISTINCT username) as unique_usernames
FROM login_history
WHERE attempt_timestamp >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY DATE(attempt_timestamp)
ORDER BY login_date DESC;
