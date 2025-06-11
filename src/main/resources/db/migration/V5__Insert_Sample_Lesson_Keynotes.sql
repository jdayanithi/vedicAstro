-- Insert sample lesson keynotes data
INSERT INTO lesson_keynotes (lesson_id, title, content, content_type, order_sequence, is_important, has_visual_aid, visual_aid_url, related_planet, related_zodiac) VALUES
-- Keynotes for lesson 1 (assuming lessons exist)
(1, 'Introduction to Vedic Astrology', 'Vedic Astrology, also known as Jyotisha, is an ancient Indian system of astrology that has been practiced for thousands of years.', 'text', 1, true, false, null, null, null),
(1, 'Key Principles', '• Based on sidereal zodiac\n• Uses 27 nakshatras (lunar mansions)\n• Emphasizes planetary periods (dashas)\n• Considers karmic influences', 'bullet_points', 2, true, false, null, null, null),
(1, 'Ancient Wisdom', '"The stars impel, they do not compel" - This fundamental principle shows that astrology provides guidance, not absolute fate.', 'quote', 3, false, false, null, null, null),

-- Keynotes for lesson 2
(2, 'The Twelve Zodiac Signs', 'The zodiac is divided into twelve signs, each representing different personality traits and life themes.', 'text', 1, true, false, null, null, null),
(2, 'Fire Signs', 'Aries, Leo, and Sagittarius are fire signs known for their energy, enthusiasm, and leadership qualities.', 'example', 2, false, true, '/images/fire-signs.jpg', 'Mars', 'Aries'),
(2, 'Earth Signs', 'Taurus, Virgo, and Capricorn are earth signs characterized by practicality, stability, and material focus.', 'example', 3, false, true, '/images/earth-signs.jpg', 'Venus', 'Taurus'),
(2, 'Air Signs', 'Gemini, Libra, and Aquarius are air signs known for communication, intellect, and social connections.', 'example', 4, false, true, '/images/air-signs.jpg', 'Mercury', 'Gemini'),
(2, 'Water Signs', 'Cancer, Scorpio, and Pisces are water signs associated with emotions, intuition, and psychic abilities.', 'example', 5, false, true, '/images/water-signs.jpg', 'Moon', 'Cancer'),

-- Keynotes for lesson 3
(3, 'Understanding Planetary Influences', 'Each planet in Vedic astrology represents different aspects of life and consciousness.', 'text', 1, true, false, null, null, null),
(3, 'The Sun (Surya)', 'Represents the soul, father, authority, and life force. It governs leadership and self-expression.', 'text', 2, true, false, null, 'Sun', 'Leo'),
(3, 'The Moon (Chandra)', 'Represents the mind, mother, emotions, and public image. It governs feelings and intuition.', 'text', 3, true, false, null, 'Moon', 'Cancer'),
(3, 'Mars (Mangal)', 'Represents energy, courage, conflict, and siblings. It governs action and determination.', 'text', 4, false, false, null, 'Mars', 'Aries'),
(3, 'Planetary Dignity', 'Planets function differently based on their placement in friendly, neutral, or enemy signs.', 'text', 5, true, true, '/images/planetary-dignity.jpg', null, null);
