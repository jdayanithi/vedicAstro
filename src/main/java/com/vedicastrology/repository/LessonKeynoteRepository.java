package com.vedicastrology.repository;

import com.vedicastrology.entity.LessonKeynote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface LessonKeynoteRepository extends JpaRepository<LessonKeynote, Long> {
    
    // Find keynotes by lesson ID ordered by sequence
    @Query("SELECT lk FROM LessonKeynote lk WHERE lk.lessonId = :lessonId ORDER BY lk.orderSequence ASC")
    List<LessonKeynote> findByLessonIdOrderByOrderSequence(@Param("lessonId") Long lessonId);
    
    // Find important keynotes by lesson ID
    @Query("SELECT lk FROM LessonKeynote lk WHERE lk.lessonId = :lessonId AND lk.isImportant = true ORDER BY lk.orderSequence ASC")
    List<LessonKeynote> findImportantKeynotesByLessonId(@Param("lessonId") Long lessonId);
    
    // Find keynotes by content type
    @Query("SELECT lk FROM LessonKeynote lk WHERE lk.lessonId = :lessonId AND lk.contentType = :contentType ORDER BY lk.orderSequence ASC")
    List<LessonKeynote> findByLessonIdAndContentType(@Param("lessonId") Long lessonId, @Param("contentType") String contentType);
    
    // Find keynotes with visual aids
    @Query("SELECT lk FROM LessonKeynote lk WHERE lk.lessonId = :lessonId AND lk.hasVisualAid = true ORDER BY lk.orderSequence ASC")
    List<LessonKeynote> findKeynotesWithVisualAidsByLessonId(@Param("lessonId") Long lessonId);
    
    // Find keynotes by related planet
    @Query("SELECT lk FROM LessonKeynote lk WHERE lk.relatedPlanet = :planet ORDER BY lk.orderSequence ASC")
    List<LessonKeynote> findByRelatedPlanet(@Param("planet") String planet);
    
    // Find keynotes by related zodiac
    @Query("SELECT lk FROM LessonKeynote lk WHERE lk.relatedZodiac = :zodiac ORDER BY lk.orderSequence ASC")
    List<LessonKeynote> findByRelatedZodiac(@Param("zodiac") String zodiac);
    
    // Get maximum order sequence for a lesson (for auto-incrementing)
    @Query("SELECT COALESCE(MAX(lk.orderSequence), 0) FROM LessonKeynote lk WHERE lk.lessonId = :lessonId")
    Integer findMaxOrderSequenceByLessonId(@Param("lessonId") Long lessonId);
    
    // Count keynotes by lesson
    Long countByLessonId(Long lessonId);
    
    // Search keynotes by title or content
    @Query("SELECT lk FROM LessonKeynote lk WHERE " +
           "(LOWER(lk.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(lk.content) LIKE LOWER(CONCAT('%', :query, '%'))) " +
           "ORDER BY lk.orderSequence ASC")
    List<LessonKeynote> searchKeynotes(@Param("query") String query);
}
