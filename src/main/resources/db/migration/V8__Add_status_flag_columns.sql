-- Add status_flag column to tags table
ALTER TABLE tags 
ADD COLUMN status_flag TINYINT(1) DEFAULT 1 
COMMENT 'Status flag: 1 = enabled, 0 = disabled';

-- Add status_flag column to lessons table  
ALTER TABLE lessons 
ADD COLUMN status_flag TINYINT(1) DEFAULT 1 
COMMENT 'Status flag: 1 = enabled, 0 = disabled';

-- Add status_flag column to topics table
ALTER TABLE topics 
ADD COLUMN status_flag TINYINT(1) DEFAULT 1 
COMMENT 'Status flag: 1 = enabled, 0 = disabled';

-- Add status_flag column to courses table
ALTER TABLE courses 
ADD COLUMN status_flag TINYINT(1) DEFAULT 1 
COMMENT 'Status flag: 1 = enabled, 0 = disabled';

-- Add indexes for better query performance
CREATE INDEX idx_tags_status_flag ON tags(status_flag);
CREATE INDEX idx_lessons_status_flag ON lessons(status_flag);
CREATE INDEX idx_topics_status_flag ON topics(status_flag);
CREATE INDEX idx_courses_status_flag ON courses(status_flag);

-- Update existing records to be enabled by default
UPDATE tags SET status_flag = 1 WHERE status_flag IS NULL;
UPDATE lessons SET status_flag = 1 WHERE status_flag IS NULL;
UPDATE topics SET status_flag = 1 WHERE status_flag IS NULL;
UPDATE courses SET status_flag = 1 WHERE status_flag IS NULL;
