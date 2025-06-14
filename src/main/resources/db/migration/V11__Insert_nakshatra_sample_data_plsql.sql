```sql
-- Insert topics and capture topic_id for each
    INSERT INTO Topic (title, description, course_id, order_number, status_flag, created_at)
    VALUES (c_topic_intro, 'Basic understanding of the 27 lunar mansions', v_course_id, 1, 1, SYSDATE)
    RETURNING topic_id INTO v_topic_id_intro;
    INSERT INTO Topic (title, description, course_id, order_number, status_flag, created_at)
    VALUES (c_topic_char, 'Detailed study of each Nakshatra traits', v_course_id, 2, 1, SYSDATE)
    RETURNING topic_id INTO v_topic_id_char;
    INSERT INTO Topic (title, description, course_id, order_number, status_flag, created_at)
    VALUES (c_topic_deity, 'Ruling deities and symbolic meanings', v_course_id, 3, 1, SYSDATE)
    RETURNING topic_id INTO v_topic_id_deity;
    INSERT INTO Topic (title, description, course_id, order_number, status_flag, created_at)
    VALUES (c_topic_myth, 'Ancient stories and legends behind each Nakshatra', v_course_id, 4, 1, SYSDATE)
    RETURNING topic_id INTO v_topic_id_myth;
    INSERT INTO Topic (title, description, course_id, order_number, status_flag, created_at)
    VALUES (c_topic_remedy, 'Astrological remedies for each Nakshatra', v_course_id, 5, 1, SYSDATE)
    RETURNING topic_id INTO v_topic_id_remedy;
    INSERT INTO Topic (title, description, course_id, order_number, status_flag, created_at)
    VALUES (c_topic_birth, 'How to analyze birth Nakshatra', v_course_id, 6, 1, SYSDATE)
    RETURNING topic_id INTO v_topic_id_birth;
    INSERT INTO Topic (title, description, course_id, order_number, status_flag, created_at)
    VALUES (c_topic_compat, 'Marriage and relationship matching', v_course_id, 7, 1, SYSDATE)
    RETURNING topic_id INTO v_topic_id_compat;
    INSERT INTO Topic (title, description, course_id, order_number, status_flag, created_at)
    VALUES (c_topic_timing, 'Muhurta and auspicious timing using Nakshatras', v_course_id, 8, 1, SYSDATE)
    RETURNING topic_id INTO v_topic_id_timing;
    INSERT INTO Topic (title, description, course_id, order_number, status_flag, created_at)
    VALUES (c_topic_career, 'Professional guidance based on birth star', v_course_id, 9, 1, SYSDATE)
    RETURNING topic_id INTO v_topic_id_career;
    INSERT INTO Topic (title, description, course_id, order_number, status_flag, created_at)
    VALUES (c_topic_health, 'Health analysis through Nakshatra system', v_course_id, 10, 1, SYSDATE)
    RETURNING topic_id INTO v_topic_id_health;

    -- Insert lessons, connecting each to its topic
    INSERT INTO lessons (title, description, duration_minutes, content_url, topic_id, order_number, status_flag, created_at)
    VALUES ('Ashwini Nakshatra - The Horse Riders', 'First Nakshatra ruled by Ashwini Kumaras, known for healing and speed. Symbol: Horse Head, Deity: Ashwini Kumaras, Planet: Ketu', 45, 'https://example.com/videos/ashwini.mp4', v_topic_id_intro, 1, 1, SYSDATE);
    INSERT INTO lessons (title, description, duration_minutes, content_url, topic_id, order_number, status_flag, created_at)
    VALUES ('Bharani Nakshatra - The Bearer', 'Second Nakshatra ruled by Yama, represents transformation and restraint. Symbol: Yoni, Deity: Yama, Planet: Venus', 45, 'https://example.com/videos/bharani.mp4', v_topic_id_intro, 2, 1, SYSDATE);
    -- Add more lessons for each topic as needed, using the correct v_topic_id_* variable
```