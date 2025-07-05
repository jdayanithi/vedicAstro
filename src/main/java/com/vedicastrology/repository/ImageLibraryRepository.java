package com.vedicastrology.repository;

import com.vedicastrology.entity.ImageLibrary;
import com.vedicastrology.entity.ImageCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageLibraryRepository extends JpaRepository<ImageLibrary, Long> {
    
    // Find by lesson
    List<ImageLibrary> findByLessonLessonIdAndStatusFlagTrue(Long lessonId);
    
    // Find by topic
    List<ImageLibrary> findByTopicTopicIdAndStatusFlagTrue(Long topicId);
    
    // Find by course
    List<ImageLibrary> findByCourseCourseIdAndStatusFlagTrue(Long courseId);
    
    // Find by category
    Page<ImageLibrary> findByCategoryAndStatusFlagTrue(ImageCategory category, Pageable pageable);
    
    // Find featured images
    List<ImageLibrary> findByIsFeaturedTrueAndStatusFlagTrueOrderByUploadDateDesc();
    
    // Find public images
    Page<ImageLibrary> findByIsPublicTrueAndStatusFlagTrue(Pageable pageable);
    
    // Search by filename or title
    @Query("SELECT i FROM ImageLibrary i WHERE " +
           "(LOWER(i.fileName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(i.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(i.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(i.tags) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND " +
           "i.statusFlag = true")
    Page<ImageLibrary> searchImages(@Param("searchTerm") String searchTerm, Pageable pageable);
    
    // Find by file extension
    @Query("SELECT i FROM ImageLibrary i WHERE " +
           "LOWER(i.fileName) LIKE LOWER(CONCAT('%.', :extension)) AND " +
           "i.statusFlag = true")
    List<ImageLibrary> findByFileExtension(@Param("extension") String extension);
    
    // Find by uploaded user
    Page<ImageLibrary> findByUploadedByAndStatusFlagTrue(String uploadedBy, Pageable pageable);
    
    // Find by mime type
    List<ImageLibrary> findByMimeTypeContainingAndStatusFlagTrue(String mimeType);
    
    // Find orphaned images (not associated with any lesson, topic, or course)
    @Query("SELECT i FROM ImageLibrary i WHERE " +
           "i.lesson IS NULL AND i.topic IS NULL AND i.course IS NULL AND " +
           "i.statusFlag = true")
    List<ImageLibrary> findOrphanedImages();
    
    // Get total file size for statistics
    @Query("SELECT COALESCE(SUM(i.fileSize), 0) FROM ImageLibrary i WHERE i.statusFlag = true")
    Long getTotalFileSize();
    
    // Count by category
    @Query("SELECT i.category, COUNT(i) FROM ImageLibrary i WHERE i.statusFlag = true GROUP BY i.category")
    List<Object[]> countByCategory();
    
    // Find recently uploaded
    @Query("SELECT i FROM ImageLibrary i WHERE i.statusFlag = true ORDER BY i.uploadDate DESC")
    List<ImageLibrary> findRecentlyUploaded(Pageable pageable);
    
    // Check if filename exists
    boolean existsByFileNameAndStatusFlagTrue(String fileName);
    
    // Advanced search with filters
    @Query("SELECT i FROM ImageLibrary i WHERE " +
           "(:category IS NULL OR i.category = :category) AND " +
           "(:lessonId IS NULL OR i.lesson.lessonId = :lessonId) AND " +
           "(:topicId IS NULL OR i.topic.topicId = :topicId) AND " +
           "(:courseId IS NULL OR i.course.courseId = :courseId) AND " +
           "(:searchTerm IS NULL OR " +
           " LOWER(i.fileName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           " LOWER(i.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           " LOWER(i.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           " LOWER(i.tags) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND " +
           "i.statusFlag = true")
    Page<ImageLibrary> findWithFilters(@Param("category") ImageCategory category,
                                      @Param("lessonId") Long lessonId,
                                      @Param("topicId") Long topicId,
                                      @Param("courseId") Long courseId,
                                      @Param("searchTerm") String searchTerm,
                                      Pageable pageable);
}
