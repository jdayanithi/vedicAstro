-- Create lesson_keynotes table
CREATE TABLE lesson_keynotes (
    keynote_id bigint PRIMARY KEY AUTO_INCREMENT,
    lesson_id bigint NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    content_type ENUM('text', 'bullet_points', 'quote', 'example') DEFAULT 'text',
    order_sequence INT NOT NULL,
    is_important BOOLEAN DEFAULT FALSE,
    has_visual_aid BOOLEAN DEFAULT FALSE,
    visual_aid_url VARCHAR(255),
    related_planet VARCHAR(20),
    related_zodiac VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_lesson_keynotes_lesson_id ON lesson_keynotes(lesson_id);
CREATE INDEX idx_lesson_keynotes_order_sequence ON lesson_keynotes(lesson_id, order_sequence);
CREATE INDEX idx_lesson_keynotes_important ON lesson_keynotes(lesson_id, is_important);
CREATE INDEX idx_lesson_keynotes_content_type ON lesson_keynotes(lesson_id, content_type);
CREATE INDEX idx_lesson_keynotes_visual_aid ON lesson_keynotes(lesson_id, has_visual_aid);
CREATE INDEX idx_lesson_keynotes_planet ON lesson_keynotes(related_planet);
CREATE INDEX idx_lesson_keynotes_zodiac ON lesson_keynotes(related_zodiac);
