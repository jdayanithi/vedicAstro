CREATE TABLE deletion_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(100) NOT NULL,
    record_id BIGINT NOT NULL,
    record_data TEXT,
    deleted_by BIGINT,
    deleted_by_name VARCHAR(255),
    deletion_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deletion_reason VARCHAR(500),
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    INDEX idx_table_name (table_name),
    INDEX idx_record_id (record_id),
    INDEX idx_deleted_by (deleted_by),
    INDEX idx_deletion_timestamp (deletion_timestamp),
    INDEX idx_table_record (table_name, record_id),
    INDEX idx_user_agent (user_agent(255))
);
