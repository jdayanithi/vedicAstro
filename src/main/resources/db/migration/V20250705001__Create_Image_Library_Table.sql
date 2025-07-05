-- Create image_library table
CREATE TABLE image_library (
    image_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    width INT,
    height INT,
    title VARCHAR(255),
    description TEXT,
    alt_text VARCHAR(255),
    tags VARCHAR(500),
    lesson_id BIGINT,
    topic_id BIGINT,
    course_id BIGINT,
    category ENUM('LESSON_CONTENT', 'TOPIC_THUMBNAIL', 'COURSE_BANNER', 'ILLUSTRATION', 'DIAGRAM', 'ICON', 'BACKGROUND', 'PROFILE', 'GENERAL', 'MARKETING'),
    is_public BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    status_flag BOOLEAN DEFAULT TRUE,
    uploaded_by VARCHAR(100),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_lesson_id (lesson_id),
    INDEX idx_topic_id (topic_id),
    INDEX idx_course_id (course_id),
    INDEX idx_category (category),
    INDEX idx_status_flag (status_flag),
    INDEX idx_upload_date (upload_date),
    INDEX idx_is_public (is_public),
    INDEX idx_is_featured (is_featured),
    INDEX idx_file_name (file_name),
    
    FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE SET NULL,
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE SET NULL,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE SET NULL
);

-- Insert sample data for testing
INSERT INTO image_library (
    file_name, original_name, file_path, file_size, mime_type, width, height,
    title, description, alt_text, tags, category, is_public, is_featured,
    uploaded_by
) VALUES 
(
    'sample_lesson_1.jpg', 'lesson_diagram.jpg', 'lesson_content/lesson_1/sample_lesson_1.jpg',
    156789, 'image/jpeg', 800, 600,
    'Vedic Chart Example', 'Sample vedic astrology chart for lesson demonstration',
    'Vedic chart diagram', 'astrology,chart,vedic,diagram',
    'LESSON_CONTENT', TRUE, FALSE, 'admin'
),
(
    'course_banner_1.jpg', 'astrology_banner.jpg', 'course_banner/course_1/course_banner_1.jpg',
    234567, 'image/jpeg', 1200, 400,
    'Astrology Course Banner', 'Main banner for astrology fundamentals course',
    'Course banner for astrology', 'banner,course,astrology',
    'COURSE_BANNER', TRUE, TRUE, 'admin'
),
(
    'icon_planet_sun.png', 'sun_icon.png', 'icon/general/icon_planet_sun.png',
    12345, 'image/png', 64, 64,
    'Sun Planet Icon', 'Icon representing the Sun planet in astrology',
    'Sun planet icon', 'sun,planet,icon,astrology',
    'ICON', TRUE, FALSE, 'admin'
);

-- Create indexes for better performance
CREATE INDEX idx_image_library_title ON image_library (title);
CREATE INDEX idx_image_library_description ON image_library (description(255));
CREATE INDEX idx_image_library_tags ON image_library (tags);
CREATE INDEX idx_image_library_associations ON image_library (lesson_id, topic_id, course_id);
CREATE INDEX idx_image_library_metadata ON image_library (category, is_public, is_featured, status_flag);

-- Add comment to table
ALTER TABLE image_library COMMENT = 'Image library for storing and managing images associated with lessons, topics, and courses';
