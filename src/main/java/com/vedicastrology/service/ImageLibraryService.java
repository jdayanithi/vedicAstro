package com.vedicastrology.service;

import com.vedicastrology.entity.ImageLibrary;
import com.vedicastrology.entity.ImageCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ImageLibraryService {
    
    // CRUD Operations
    ImageLibrary save(ImageLibrary imageLibrary);
    Optional<ImageLibrary> findById(Long id);
    Page<ImageLibrary> findAll(Pageable pageable);
    void deleteById(Long id);
    void softDeleteById(Long id);
    
    // File Upload Operations
    ImageLibrary uploadImage(MultipartFile file, String title, String description, 
                           String altText, String tags, ImageCategory category,
                           Long lessonId, Long topicId, Long courseId, String uploadedBy) throws IOException;
    
    ImageLibrary uploadImageWithPath(MultipartFile file, String customPath, String title, 
                                   String description, String altText, String tags, 
                                   ImageCategory category, Long lessonId, Long topicId, 
                                   Long courseId, String uploadedBy) throws IOException;
    
    // Search and Filter Operations
    Page<ImageLibrary> searchImages(String searchTerm, Pageable pageable);
    Page<ImageLibrary> findByCategory(ImageCategory category, Pageable pageable);
    List<ImageLibrary> findByLesson(Long lessonId);
    List<ImageLibrary> findByTopic(Long topicId);
    List<ImageLibrary> findByCourse(Long courseId);
    Page<ImageLibrary> findWithFilters(ImageCategory category, Long lessonId, Long topicId, 
                                     Long courseId, String searchTerm, Pageable pageable);
    
    // Utility Operations
    List<ImageLibrary> findFeaturedImages();
    List<ImageLibrary> findRecentlyUploaded(int limit);
    List<ImageLibrary> findOrphanedImages();
    Long getTotalFileSize();
    List<Object[]> getImageStatistics();
    
    // File Operations
    byte[] getImageFile(Long imageId) throws IOException;
    String getImageUrl(Long imageId);
    boolean deleteImageFile(String filePath);
    String generateUniqueFileName(String originalFileName);
    String createDirectoryPath(ImageCategory category, Long lessonId, Long topicId, Long courseId);
    
    // Validation
    boolean isValidImageFile(MultipartFile file);
    boolean isFileSizeValid(MultipartFile file);
    void validateImageDimensions(MultipartFile file) throws IOException;
    
    // Batch Operations
    List<ImageLibrary> uploadMultipleImages(List<MultipartFile> files, ImageCategory category,
                                          Long lessonId, Long topicId, Long courseId, 
                                          String uploadedBy) throws IOException;
    void deleteMultipleImages(List<Long> imageIds);
    void updateImageAssociations(Long imageId, Long lessonId, Long topicId, Long courseId);
}
