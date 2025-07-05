package com.vedicastrology.repository;

import com.vedicastrology.entity.LessonTag;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LessonTagRepository extends JpaRepository<LessonTag, Long> {
    List<LessonTag> findByLesson_LessonId(Long lessonId);
    List<LessonTag> findByTag_TagId(Long tagId);
    LessonTag findByLesson_LessonIdAndTag_TagId(Long lessonId, Long tagId);
    boolean existsByLesson_LessonIdAndTag_TagId(Long lessonId, Long tagId);
    void deleteByLesson_LessonIdAndTag_TagId(Long lessonId, Long tagId);
}
