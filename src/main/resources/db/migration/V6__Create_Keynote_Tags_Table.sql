-- Create keynote_tags table
CREATE TABLE keynote_tags (
    keynote_tag_id bigint PRIMARY KEY AUTO_INCREMENT,
    keynote_id bigint NOT NULL,
    tag_id bigint NOT NULL,
    relevance_score INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (keynote_id) REFERENCES lesson_keynotes(keynote_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE,
    UNIQUE KEY unique_keynote_tag (keynote_id, tag_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_keynote_tags_keynote_id ON keynote_tags(keynote_id);
CREATE INDEX idx_keynote_tags_tag_id ON keynote_tags(tag_id);
CREATE INDEX idx_keynote_tags_relevance_score ON keynote_tags(relevance_score);

-- Insert sample data (optional)
INSERT INTO keynote_tags (keynote_id, tag_id, relevance_score) VALUES 
(1, 1, 5),
(1, 2, 3),
(2, 1, 4),
(2, 3, 5),
(3, 2, 3),
(3, 3, 4);
