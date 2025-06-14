-- Sample data for 27 Nakshatras (Natchthiram) - Vedic Astrology Learning
-- Migration: V11__Insert_nakshatra_sample_data.sql
-- 
-- This migration can be run multiple times safely due to the comprehensive DELETE statements
-- The DELETE operations are performed in reverse order of foreign key dependencies to avoid constraint violations
-- 
-- Structure: Categories -> Courses -> Topics -> Lessons -> Lesson_Keynotes -> Tags -> Lesson_Tags/Keynote_Tags -> Notifications
-- Deletion order: Keynote_Tags -> Lesson_Tags -> Lesson_Keynotes -> Lessons -> Topics -> Courses -> Notifications -> Tags -> Categories

-- ===========================================
-- PHASE 1: DELETE EXISTING SAMPLE DATA
-- ===========================================
-- Temporarily disable safe update mode for this migration
SET SQL_SAFE_UPDATES = 0;

-- Note: If you encounter "safe update mode" errors, you can either:
-- 1. Disable safe update mode: SET SQL_SAFE_UPDATES = 0;
-- 2. Or use the MySQL Workbench: Preferences -> SQL Editor -> Uncheck "Safe Updates"
-- The queries below use JOIN syntax to work with safe update mode when possible.

-- Delete existing sample data in reverse order of foreign key dependencies
-- This allows multiple runs of the migration for testing
-- Using specific patterns and names to avoid deleting unrelated data

-- Step 1: Delete keynote tags (junction table) - Most dependent
-- Using JOIN approach to avoid safe update mode issues
DELETE kt FROM keynote_tags kt
INNER JOIN lesson_keynotes lk ON kt.keynote_id = lk.keynote_id
INNER JOIN lessons l ON lk.lesson_id = l.lesson_id
WHERE l.title LIKE '%Nakshatra%' OR 
    l.title LIKE '%Ashwini%' OR l.title LIKE '%Bharani%' OR l.title LIKE '%Krittika%' OR 
    l.title LIKE '%Rohini%' OR l.title LIKE '%Mrigashirsha%' OR l.title LIKE '%Ardra%' OR 
    l.title LIKE '%Punarvasu%' OR l.title LIKE '%Pushya%' OR l.title LIKE '%Ashlesha%' OR 
    l.title LIKE '%Magha%' OR l.title LIKE '%Purva Phalguni%' OR l.title LIKE '%Uttara Phalguni%' OR 
    l.title LIKE '%Hasta%' OR l.title LIKE '%Chitra%' OR l.title LIKE '%Swati%' OR 
    l.title LIKE '%Vishakha%' OR l.title LIKE '%Anuradha%' OR l.title LIKE '%Jyeshtha%' OR 
    l.title LIKE '%Mula%' OR l.title LIKE '%Purva Ashadha%' OR l.title LIKE '%Uttara Ashadha%' OR 
    l.title LIKE '%Shravana%' OR l.title LIKE '%Dhanishtha%' OR l.title LIKE '%Shatabhisha%' OR 
    l.title LIKE '%Purva Bhadrapada%' OR l.title LIKE '%Uttara Bhadrapada%' OR l.title LIKE '%Revati%';

-- Step 2: Delete lesson tags (junction table)
DELETE lt FROM lesson_tags lt
INNER JOIN lessons l ON lt.lesson_id = l.lesson_id
WHERE l.title LIKE '%Nakshatra%' OR 
    l.title LIKE '%Ashwini%' OR l.title LIKE '%Bharani%' OR l.title LIKE '%Krittika%' OR 
    l.title LIKE '%Rohini%' OR l.title LIKE '%Mrigashirsha%' OR l.title LIKE '%Ardra%' OR 
    l.title LIKE '%Punarvasu%' OR l.title LIKE '%Pushya%' OR l.title LIKE '%Ashlesha%' OR 
    l.title LIKE '%Magha%' OR l.title LIKE '%Purva Phalguni%' OR l.title LIKE '%Uttara Phalguni%' OR 
    l.title LIKE '%Hasta%' OR l.title LIKE '%Chitra%' OR l.title LIKE '%Swati%' OR 
    l.title LIKE '%Vishakha%' OR l.title LIKE '%Anuradha%' OR l.title LIKE '%Jyeshtha%' OR 
    l.title LIKE '%Mula%' OR l.title LIKE '%Purva Ashadha%' OR l.title LIKE '%Uttara Ashadha%' OR 
    l.title LIKE '%Shravana%' OR l.title LIKE '%Dhanishtha%' OR l.title LIKE '%Shatabhisha%' OR 
    l.title LIKE '%Purva Bhadrapada%' OR l.title LIKE '%Uttara Bhadrapada%' OR l.title LIKE '%Revati%';

-- Step 3: Delete lesson keynotes
DELETE lk FROM lesson_keynotes lk
INNER JOIN lessons l ON lk.lesson_id = l.lesson_id
WHERE l.title LIKE '%Nakshatra%' OR 
    l.title LIKE '%Ashwini%' OR l.title LIKE '%Bharani%' OR l.title LIKE '%Krittika%' OR 
    l.title LIKE '%Rohini%' OR l.title LIKE '%Mrigashirsha%' OR l.title LIKE '%Ardra%' OR 
    l.title LIKE '%Punarvasu%' OR l.title LIKE '%Pushya%' OR l.title LIKE '%Ashlesha%' OR 
    l.title LIKE '%Magha%' OR l.title LIKE '%Purva Phalguni%' OR l.title LIKE '%Uttara Phalguni%' OR 
    l.title LIKE '%Hasta%' OR l.title LIKE '%Chitra%' OR l.title LIKE '%Swati%' OR 
    l.title LIKE '%Vishakha%' OR l.title LIKE '%Anuradha%' OR l.title LIKE '%Jyeshtha%' OR 
    l.title LIKE '%Mula%' OR l.title LIKE '%Purva Ashadha%' OR l.title LIKE '%Uttara Ashadha%' OR 
    l.title LIKE '%Shravana%' OR l.title LIKE '%Dhanishtha%' OR l.title LIKE '%Shatabhisha%' OR 
    l.title LIKE '%Purva Bhadrapada%' OR l.title LIKE '%Uttara Bhadrapada%' OR l.title LIKE '%Revati%';

-- Step 4: Delete lessons
DELETE FROM lessons WHERE 
    title LIKE '%Nakshatra%' OR 
    title LIKE '%Ashwini%' OR title LIKE '%Bharani%' OR title LIKE '%Krittika%' OR 
    title LIKE '%Rohini%' OR title LIKE '%Mrigashirsha%' OR title LIKE '%Ardra%' OR 
    title LIKE '%Punarvasu%' OR title LIKE '%Pushya%' OR title LIKE '%Ashlesha%' OR 
    title LIKE '%Magha%' OR title LIKE '%Purva Phalguni%' OR title LIKE '%Uttara Phalguni%' OR 
    title LIKE '%Hasta%' OR title LIKE '%Chitra%' OR title LIKE '%Swati%' OR 
    title LIKE '%Vishakha%' OR title LIKE '%Anuradha%' OR title LIKE '%Jyeshtha%' OR 
    title LIKE '%Mula%' OR title LIKE '%Purva Ashadha%' OR title LIKE '%Uttara Ashadha%' OR 
    title LIKE '%Shravana%' OR title LIKE '%Dhanishtha%' OR title LIKE '%Shatabhisha%' OR 
    title LIKE '%Purva Bhadrapada%' OR title LIKE '%Uttara Bhadrapada%' OR title LIKE '%Revati%';

-- Step 5: Delete topics (no JOIN, just pattern and title match)
DELETE FROM Topic WHERE title IN (
    'Introduction to Nakshatras', 
    'Nakshatra Characteristics', 
    'Nakshatra Deities and Symbols',
    'Nakshatra Mythology',
    'Nakshatra Remedies',
    'Birth Star Analysis',
    'Nakshatra Compatibility',
    'Nakshatra Timing',
    'Career Guidance through Nakshatras',
    'Health Predictions'
);

DELETE FROM Topic WHERE 
    title LIKE '%Nakshatra%' OR
    title LIKE '%Ashwini%' OR title LIKE '%Bharani%' OR title LIKE '%Krittika%' OR 
    title LIKE '%Rohini%' OR title LIKE '%Mrigashirsha%' OR title LIKE '%Ardra%' OR 
    title LIKE '%Punarvasu%' OR title LIKE '%Pushya%' OR title LIKE '%Ashlesha%' OR 
    title LIKE '%Magha%' OR title LIKE '%Purva Phalguni%' OR title LIKE '%Uttara Phalguni%' OR 
    title LIKE '%Hasta%' OR title LIKE '%Chitra%' OR title LIKE '%Swati%' OR 
    title LIKE '%Vishakha%' OR title LIKE '%Anuradha%' OR title LIKE '%Jyeshtha%' OR 
    title LIKE '%Mula%' OR title LIKE '%Purva Ashadha%' OR title LIKE '%Uttara Ashadha%' OR 
    title LIKE '%Shravana%' OR title LIKE '%Dhanishtha%' OR title LIKE '%Shatabhisha%' OR 
    title LIKE '%Purva Bhadrapada%' OR title LIKE '%Uttara Bhadrapada%' OR title LIKE '%Revati%';

-- Step 6: Delete courses
DELETE FROM courses WHERE 
    title IN (
        'Complete Nakshatra Course', 
        'Beginner Vedic Astrology', 
        'Nakshatra Compatibility', 
        'Predictive Astrology with Nakshatras'
    ) OR
    title LIKE '%Nakshatra%' OR
    description LIKE '%27 lunar mansions%';

-- Step 7: Delete broadcast notifications
DELETE FROM notifications WHERE 
    (is_broadcast = true AND title LIKE '%Nakshatra%') OR
    title LIKE '%Welcome to Nakshatra%' OR
    title LIKE '%New Nakshatra%' OR
    message LIKE '%lunar mansion%';

-- Step 8: Delete tags
DELETE FROM tags WHERE tag_name IN (
    'Nakshatra', 'Deity', 'Symbol', 'Characteristics', 'Mythology', 
    'Remedies', 'Compatibility', 'Career', 'Health', 'Spiritual', 'Timing', 'Prediction'
);

-- Step 9: Delete child categories first (respecting foreign key constraints)
DELETE FROM categories WHERE name IN ('Nakshatras', 'Basic Learning', 'Advanced Studies', 'Predictive Astrology');

-- Step 10: Delete parent category last
DELETE FROM categories WHERE name = 'Vedic Astrology';

-- Additional cleanup: Handle any orphaned records that might have been missed
-- Delete any remaining records that might have specific Nakshatra names
DELETE FROM lessons WHERE description LIKE '%Ashwini%' OR description LIKE '%Bharani%' OR description LIKE '%Krittika%';
DELETE FROM Topic WHERE description LIKE '%Ashwini%' OR description LIKE '%Bharani%' OR description LIKE '%Krittika%';

-- Commit the deletions before proceeding with inserts
-- This ensures a clean state for the new data

-- Reset auto-increment if needed (optional)
-- ALTER TABLE categories AUTO_INCREMENT = 1;

-- Begin inserting new sample data
-- =================================

-- ==========================================
-- PHASE 2: INSERT NEW SAMPLE DATA
-- ==========================================

-- Insert parent category first
INSERT INTO categories (name, description, thumbnail_url, parent_category_id, created_at) VALUES
('Vedic Astrology', 'Complete guide to Vedic Astrology and its principles', 'https://example.com/thumbnails/vedic-astrology.jpg', NULL, NOW());

-- Get the parent category_id for 'Vedic Astrology'
SET @vedic_astrology_id = (SELECT category_id FROM categories WHERE name = 'Vedic Astrology');

-- Insert child categories referencing the parent
INSERT INTO categories (name, description, thumbnail_url, parent_category_id, created_at) VALUES
('Nakshatras', '27 Lunar Mansions - Foundation of Vedic Astrology', 'https://example.com/thumbnails/nakshatras.jpg', @vedic_astrology_id, NOW()),
('Basic Learning', 'Fundamental concepts for beginners', 'https://example.com/thumbnails/basic-learning.jpg', @vedic_astrology_id, NOW()),
('Advanced Studies', 'Advanced concepts and techniques', 'https://example.com/thumbnails/advanced-studies.jpg', @vedic_astrology_id, NOW()),
('Predictive Astrology', 'Techniques for predictions and timing', 'https://example.com/thumbnails/predictive.jpg', @vedic_astrology_id, NOW());

-- Insert Tags
INSERT INTO tags (tag_name, description, status_flag, created_at) VALUES
('Nakshatra', 'Related to lunar mansions', true, NOW()),
('Deity', 'Ruling deity of celestial bodies', true, NOW()),
('Symbol', 'Symbolic representation', true, NOW()),
('Characteristics', 'Personality traits and qualities', true, NOW()),
('Mythology', 'Mythological stories and legends', true, NOW()),
('Remedies', 'Astrological remedies and solutions', true, NOW()),
('Compatibility', 'Relationship and marriage compatibility', true, NOW()),
('Career', 'Professional and career guidance', true, NOW()),
('Health', 'Health and wellness aspects', true, NOW()),
('Spiritual', 'Spiritual growth and development', true, NOW()),
('Timing', 'Muhurta and auspicious timing', true, NOW()),
('Prediction', 'Predictive techniques', true, NOW());

-- Insert Courses
INSERT INTO courses (title, description, login_id, duration_hours, price, thumbnail_url, status_flag, created_at)
VALUES
('Complete Nakshatra Course', 'Comprehensive study of all 27 Nakshatras with practical applications', 1, 40, 299.99, 'https://example.com/courses/nakshatra-complete.jpg', true, NOW()),
('Beginner Vedic Astrology', 'Foundation course for Vedic Astrology beginners', 1, 30, 199.99, 'https://example.com/courses/vedic-beginner.jpg', true, NOW()),
('Nakshatra Compatibility', 'Marriage and relationship compatibility through Nakshatras', 1, 20, 149.99, 'https://example.com/courses/compatibility.jpg', true, NOW()),
('Predictive Astrology with Nakshatras', 'Advanced prediction techniques using Nakshatra system', 1, 35, 399.99, 'https://example.com/courses/predictive.jpg', true, NOW());

-- Insert Topics
INSERT INTO Topic (title, description, course_id, order_number, status_flag, created_at) VALUES
('Introduction to Nakshatras', 'Basic understanding of the 27 lunar mansions', 1, 1, true, NOW()),
('Nakshatra Characteristics', 'Detailed study of each Nakshatra traits', 1, 2, true, NOW()),
('Nakshatra Deities and Symbols', 'Ruling deities and symbolic meanings', 1, 3, true, NOW()),
('Nakshatra Mythology', 'Ancient stories and legends behind each Nakshatra', 1, 4, true, NOW()),
('Nakshatra Remedies', 'Astrological remedies for each Nakshatra', 1, 5, true, NOW()),
('Birth Star Analysis', 'How to analyze birth Nakshatra', 1, 6, true, NOW()),
('Nakshatra Compatibility', 'Marriage and relationship matching', 1, 7, true, NOW()),
('Nakshatra Timing', 'Muhurta and auspicious timing using Nakshatras', 1, 8, true, NOW()),
('Career Guidance through Nakshatras', 'Professional guidance based on birth star', 1, 9, true, NOW()),
('Health Predictions', 'Health analysis through Nakshatra system', 1, 10, true, NOW());

-- Insert Lessons for 27 Nakshatras
INSERT INTO lessons (title, description, duration_minutes, content_url, topic_id, order_number, status_flag, created_at) VALUES
('Ashwini Nakshatra - The Horse Riders', 'First Nakshatra ruled by Ashwini Kumaras, known for healing and speed. Symbol: Horse Head, Deity: Ashwini Kumaras, Planet: Ketu', 45, 'https://example.com/videos/ashwini.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 1, true, NOW()),
('Bharani Nakshatra - The Bearer', 'Second Nakshatra ruled by Yama, represents transformation and restraint. Symbol: Yoni, Deity: Yama, Planet: Venus', 45, 'https://example.com/videos/bharani.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 2, true, NOW()),
('Krittika Nakshatra - The Cutter', 'Third Nakshatra ruled by Agni, represents fire and purification. Symbol: Razor, Deity: Agni, Planet: Sun', 45, 'https://example.com/videos/krittika.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 3, true, NOW()),
('Rohini Nakshatra - The Red One', 'Fourth Nakshatra ruled by Brahma, known for beauty and creativity. Symbol: Ox Cart, Deity: Brahma, Planet: Moon', 45, 'https://example.com/videos/rohini.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 4, true, NOW()),
('Mrigashira Nakshatra - The Deer Head', 'Fifth Nakshatra ruled by Soma, represents search and quest. Symbol: Deer Head, Deity: Soma, Planet: Mars', 45, 'https://example.com/videos/mrigashir.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 5, true, NOW()),
('Ardra Nakshatra - The Moist One', 'Sixth Nakshatra ruled by Rudra, represents storms and transformation. Symbol: Diamond, Deity: Rudra, Planet: Rahu', 45, 'https://example.com/videos/ardra.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 6, true, NOW()),
('Punarvasu Nakshatra - The Returner', 'Seventh Nakshatra ruled by Aditi, represents renewal and restoration. Symbol: Bow and Quiver, Deity: Aditi, Planet: Jupiter', 45, 'https://example.com/videos/punarvasu.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 7, true, NOW()),
('Pushya Nakshatra - The Nourisher', 'Eighth Nakshatra ruled by Brihaspati, most auspicious for spiritual growth. Symbol: Flower, Deity: Brihaspati, Planet: Saturn', 45, 'https://example.com/videos/pushya.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 8, true, NOW()),
('Ashlesha Nakshatra - The Embracer', 'Ninth Nakshatra ruled by Nagas, represents serpent power and wisdom. Symbol: Coiled Serpent, Deity: Nagas, Planet: Mercury', 45, 'https://example.com/videos/ashlesha.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 9, true, NOW()),
('Magha Nakshatra - The Mighty', 'Tenth Nakshatra ruled by Pitrs, represents ancestral power and authority. Symbol: Royal Throne, Deity: Pitrs, Planet: Ketu', 45, 'https://example.com/videos/magha.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 10, true, NOW()),
('Purva Phalguni Nakshatra - The Former Red One', 'Eleventh Nakshatra ruled by Bhaga, represents luxury and pleasure. Symbol: Hammock, Deity: Bhaga, Planet: Venus', 45, 'https://example.com/videos/purva-phalguni.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 11, true, NOW()),
('Uttara Phalguni Nakshatra - The Latter Red One', 'Twelfth Nakshatra ruled by Aryaman, represents friendship and contracts. Symbol: Bed, Deity: Aryaman, Planet: Sun', 45, 'https://example.com/videos/uttara-phalguni.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 12, true, NOW()),
('Hasta Nakshatra - The Hand', 'Thirteenth Nakshatra ruled by Savitar, represents skill and craftsmanship. Symbol: Hand, Deity: Savitar, Planet: Moon', 45, 'https://example.com/videos/hasta.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 13, true, NOW()),
('Chitra Nakshatra - The Bright One', 'Fourteenth Nakshatra ruled by Tvashtar, represents creativity and beauty. Symbol: Pearl, Deity: Tvashtar, Planet: Mars', 45, 'https://example.com/videos/chitra.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 14, true, NOW()),
('Swati Nakshatra - The Sword', 'Fifteenth Nakshatra ruled by Vayu, represents independence and movement. Symbol: Sword, Deity: Vayu, Planet: Rahu', 45, 'https://example.com/videos/swati.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 15, true, NOW()),
('Vishakha Nakshatra - The Forked', 'Sixteenth Nakshatra ruled by Indra-Agni, represents determination and goals. Symbol: Archway, Deity: Indra-Agni, Planet: Jupiter', 45, 'https://example.com/videos/vishakha.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 16, true, NOW()),
('Anuradha Nakshatra - The Follower', 'Seventeenth Nakshatra ruled by Mitra, represents friendship and cooperation. Symbol: Lotus, Deity: Mitra, Planet: Saturn', 45, 'https://example.com/videos/anuradha.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 17, true, NOW()),
('Jyeshtha Nakshatra - The Eldest', 'Eighteenth Nakshatra ruled by Indra, represents seniority and protection. Symbol: Earring, Deity: Indra, Planet: Mercury', 45, 'https://example.com/videos/jyeshtha.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 18, true, NOW()),
('Mula Nakshatra - The Root', 'Nineteenth Nakshatra ruled by Niriti, represents destruction and transformation. Symbol: Bunch of Roots, Deity: Niriti, Planet: Ketu', 45, 'https://example.com/videos/mula.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 19, true, NOW()),
('Purva Ashadha Nakshatra - The Former Invincible One', 'Twentieth Nakshatra ruled by Apas, represents purification and invincibility. Symbol: Fan, Deity: Apas, Planet: Venus', 45, 'https://example.com/videos/purva-ashadha.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 20, true, NOW()),
('Uttara Ashadha Nakshatra - The Latter Invincible One', 'Twenty-first Nakshatra ruled by Vishvedevas, represents final victory. Symbol: Elephant Tusk, Deity: Vishvedevas, Planet: Sun', 45, 'https://example.com/videos/uttara-ashadha.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 21, true, NOW()),
('Shravana Nakshatra - The Listener', 'Twenty-second Nakshatra ruled by Vishnu, represents learning and listening. Symbol: Three Footprints, Deity: Vishnu, Planet: Moon', 45, 'https://example.com/videos/shravana.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 22, true, NOW()),
('Dhanishtha Nakshatra - The Richest', 'Twenty-third Nakshatra ruled by Vasus, represents wealth and music. Symbol: Drum, Deity: Vasus, Planet: Mars', 45, 'https://example.com/videos/dhanishtha.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 23, true, NOW()),
('Shatabhisha Nakshatra - The Hundred Healers', 'Twenty-fourth Nakshatra ruled by Varuna, represents healing and secrecy. Symbol: Circle, Deity: Varuna, Planet: Rahu', 45, 'https://example.com/videos/shatabhisha.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 24, true, NOW()),
('Purva Bhadrapada Nakshatra - The Former Lucky Feet', 'Twenty-fifth Nakshatra ruled by Aja Ekapada, represents spiritual fire. Symbol: Sword, Deity: Aja Ekapada, Planet: Jupiter', 45, 'https://example.com/videos/purva-bhadrapada.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 25, true, NOW()),
('Uttara Bhadrapada Nakshatra - The Latter Lucky Feet', 'Twenty-sixth Nakshatra ruled by Ahir Budhnya, represents cosmic serpent. Symbol: Twin, Deity: Ahir Budhnya, Planet: Saturn', 45, 'https://example.com/videos/uttara-bhadrapada.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 26, true, NOW()),
('Revati Nakshatra - The Wealthy', 'Twenty-seventh Nakshatra ruled by Pushan, represents nourishment and journey. Symbol: Fish, Deity: Pushan, Planet: Mercury', 45, 'https://example.com/videos/revati.mp4', (SELECT topic_id FROM Topic WHERE title = 'Introduction to Nakshatras'), 27, true, NOW());

-- Insert Lesson Keynotes for Nakshatras
INSERT INTO lesson_keynotes (title, content, content_type, lesson_id, order_sequence, created_at) VALUES
-- Ashwini Keynotes
('Ashwini - Key Characteristics', 'Deity: Ashwini Kumaras (Divine Physicians)\nSymbol: Horse Head\nRuling Planet: Ketu\nElement: Earth\nGender: Male\nGuna: Rajas\nCaste: Vaishya\nDirection: South\nBody Part: Knees\nAnimal: Male Horse', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Ashwini Nakshatra - The Horse Riders'), 1, NOW()),
('Ashwini - Personality Traits', 'Quick action, Natural healers, Adventurous, Independent, Energetic, Impatient, Restless, Good in emergencies, Athletic abilities, Leadership qualities', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Ashwini Nakshatra - The Horse Riders'), 2, NOW()),
('Ashwini - Career & Health', 'Suitable careers: Medicine, Surgery, Emergency services, Sports, Military, Police, Firefighting, Racing\n\nHealth: Generally good health, prone to head injuries, knee problems, accidents due to speed', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Ashwini Nakshatra - The Horse Riders'), 3, NOW()),

-- Bharani Keynotes  
('Bharani - Key Characteristics', 'Deity: Yama (God of Death)\nSymbol: Yoni (Vulva)\nRuling Planet: Venus\nElement: Earth\nGender: Female\nGuna: Rajas\nCaste: Mleccha\nDirection: East\nBody Part: Head, Forehead\nAnimal: Elephant', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Bharani Nakshatra - The Bearer'), 1, NOW()),
('Bharani - Personality Traits', 'Strong willpower, Creative, Responsible, Passionate, Can bear heavy burdens, Artistic, Sensual, Determined, Patient, Good organizers', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Bharani Nakshatra - The Bearer'), 2, NOW()),
('Bharani - Career & Health', 'Suitable careers: Arts, Entertainment, Fashion, Beauty industry, Agriculture, Food industry, Publishing, Writing\n\nHealth: Reproductive system issues, head-related problems, diabetes risk', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Bharani Nakshatra - The Bearer'), 3, NOW()),

-- Krittika Keynotes
('Krittika - Key Characteristics', 'Deity: Agni (Fire God)\nSymbol: Razor/Knife\nRuling Planet: Sun\nElement: Fire\nGender: Female\nGuna: Rajas\nCaste: Brahmin\nDirection: North\nBody Part: Head, Crown\nAnimal: Goat', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Krittika Nakshatra - The Cutter'), 1, NOW()),
('Krittika - Personality Traits', 'Sharp intellect, Leadership abilities, Famous, Authoritative, Can cut through illusions, Strong digestion, Courageous, Independent, Critical thinking, Truth-seeking', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Krittika Nakshatra - The Cutter'), 2, NOW()),
('Krittika - Career & Health', 'Suitable careers: Government, Politics, Military, Police, Judiciary, Cooking, Fire-related work, Leadership roles\n\nHealth: Digestive issues, fever, inflammatory conditions, head problems', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Krittika Nakshatra - The Cutter'), 3, NOW()),

-- Rohini Keynotes
('Rohini - Key Characteristics', 'Deity: Brahma (Creator)\nSymbol: Ox Cart/Chariot\nRuling Planet: Moon\nElement: Earth\nGender: Female\nGuna: Rajas\nCaste: Shudra\nDirection: East\nBody Part: Forehead, Ankles\nAnimal: Serpent', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Rohini Nakshatra - The Red One'), 1, NOW()),
('Rohini - Personality Traits', 'Beautiful, Magnetic personality, Creative, Materialistic, Fertile, Business-minded, Charming, Romantic, Luxury-loving, Artistic talents', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Rohini Nakshatra - The Red One'), 2, NOW()),
('Rohini - Career & Health', 'Suitable careers: Entertainment, Fashion, Beauty, Business, Banking, Real estate, Arts, Music, Dance, Agriculture\n\nHealth: Throat problems, reproductive issues, diabetes, weight gain', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Rohini Nakshatra - The Red One'), 3, NOW()),

-- Mrigashira Keynotes
('Mrigashira - Key Characteristics', 'Deity: Soma (Moon God)\nSymbol: Deer Head\nRuling Planet: Mars\nElement: Earth\nGender: Neutral\nGuna: Rajas\nCaste: Vaishya\nDirection: North\nBody Part: Face, Chin\nAnimal: Female Serpent', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Mrigashira Nakshatra - The Deer Head'), 1, NOW()),
('Mrigashira - Personality Traits', 'Constantly searching, Curious nature, Gentle, Traveler, Research-oriented, Suspicious, Fickle-minded, Good communication, Love for music, Spiritual inclination', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Mrigashira Nakshatra - The Deer Head'), 2, NOW()),
('Mrigashira - Career & Health', 'Suitable careers: Research, Travel industry, Music, Writing, Teaching, Sales, Marketing, Gemology, Perfumery\n\nHealth: Throat issues, constipation, mental stress, nervous disorders', 'text', (SELECT lesson_id FROM lessons WHERE title = 'Mrigashira Nakshatra - The Deer Head'), 3, NOW());

-- Insert Lesson Tags (Many-to-Many relationship)
INSERT INTO lesson_tags (lesson_id, tag_id) 
SELECT l.lesson_id, t.tag_id 
FROM lessons l 
CROSS JOIN tags t 
WHERE l.title LIKE '%Nakshatra%' AND t.tag_name IN ('Nakshatra', 'Deity', 'Symbol', 'Characteristics');

-- Insert broadcast notifications
INSERT INTO notifications (title, message, notification_type, is_broadcast, start_date, expiry_date, created_at) VALUES
('Welcome to Nakshatra Learning', 'Welcome to the comprehensive 27 Nakshatras course! Begin your journey into Vedic Astrology today.', 'push', true, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), NOW()),
('Complete Nakshatra Database', 'All 27 Nakshatras with detailed information, characteristics, and practical applications are now available.', 'push', true, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), NOW()),
('Interactive Learning', 'Practice identifying your birth Nakshatra and explore personality traits, career guidance, and compatibility.', 'email', true, NOW(), DATE_ADD(NOW(), INTERVAL 15 DAY), NOW()),
('Monthly Predictions', 'Monthly astrological predictions based on Nakshatra transits and planetary positions.', 'push', true, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), NOW());

-- Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;
