package com.vedicastrology.service;

import com.vedicastrology.entity.*;
import com.vedicastrology.repository.ImageLibraryRepository;
import com.vedicastrology.repository.LessonRepository;
import com.vedicastrology.repository.TopicRepository;
import com.vedicastrology.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ImageLibraryServiceImpl implements ImageLibraryService {
    
    private final ImageLibraryRepository imageLibraryRepository;
    private final LessonRepository lessonRepository;
    private final TopicRepository topicRepository;
    private final CourseRepository courseRepository;
    
    @Value("${app.image.upload.dir:uploads/images}")
    private String uploadDirectory;
    
    @Value("${app.image.max.size:10485760}") // 10MB default
    private Long maxFileSize;
    
    @Value("${app.image.allowed.types:image/jpeg,image/png,image/gif,image/webp}")
    private String allowedMimeTypes;
    
    @Value("${app.image.max.width:4000}")
    private Integer maxWidth;
    
    @Value("${app.image.max.height:4000}")
    private Integer maxHeight;
    
    @Override
    public ImageLibrary save(ImageLibrary imageLibrary) {
        return imageLibraryRepository.save(imageLibrary);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<ImageLibrary> findById(Long id) {
        return imageLibraryRepository.findById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<ImageLibrary> findAll(Pageable pageable) {
        return imageLibraryRepository.findAll(pageable);
    }
    
    @Override
    public void deleteById(Long id) {
        Optional<ImageLibrary> imageOpt = findById(id);
        if (imageOpt.isPresent()) {
            ImageLibrary image = imageOpt.get();
            // Delete physical file
            deleteImageFile(image.getFilePath());
            // Delete database record
            imageLibraryRepository.deleteById(id);
            log.info("Deleted image: {} (ID: {})", image.getFileName(), id);
        }
    }
    
    @Override
    public void softDeleteById(Long id) {
        Optional<ImageLibrary> imageOpt = findById(id);
        if (imageOpt.isPresent()) {
            ImageLibrary image = imageOpt.get();
            image.setStatusFlag(false);
            image.setUpdatedAt(LocalDateTime.now());
            save(image);
            log.info("Soft deleted image: {} (ID: {})", image.getFileName(), id);
        }
    }
    
    @Override
    public ImageLibrary uploadImage(MultipartFile file, String title, String description,
                                  String altText, String tags, ImageCategory category,
                                  Long lessonId, Long topicId, Long courseId, 
                                  String uploadedBy) throws IOException {
        
        // Validate file
        if (!isValidImageFile(file)) {
            throw new IllegalArgumentException("Invalid image file type");
        }
        
        if (!isFileSizeValid(file)) {
            throw new IllegalArgumentException("File size exceeds maximum allowed size");
        }
        
        validateImageDimensions(file);
        
        // Create directory structure
        String directoryPath = createDirectoryPath(category, lessonId, topicId, courseId);
        Path uploadPath = Paths.get(uploadDirectory, directoryPath);
        Files.createDirectories(uploadPath);
        
        // Generate unique filename
        String uniqueFileName = generateUniqueFileName(file.getOriginalFilename());
        Path filePath = uploadPath.resolve(uniqueFileName);
        
        // Save file
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        // Get image dimensions
        BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
        Integer width = bufferedImage != null ? bufferedImage.getWidth() : null;
        Integer height = bufferedImage != null ? bufferedImage.getHeight() : null;
        
        // Create ImageLibrary entity
        ImageLibrary imageLibrary = new ImageLibrary();
        imageLibrary.setFileName(uniqueFileName);
        imageLibrary.setOriginalName(file.getOriginalFilename());
        imageLibrary.setFilePath(directoryPath + "/" + uniqueFileName);
        imageLibrary.setFileSize(file.getSize());
        imageLibrary.setMimeType(file.getContentType());
        imageLibrary.setWidth(width);
        imageLibrary.setHeight(height);
        imageLibrary.setTitle(title);
        imageLibrary.setDescription(description);
        imageLibrary.setAltText(altText);
        imageLibrary.setTags(tags);
        imageLibrary.setCategory(category);
        imageLibrary.setUploadedBy(uploadedBy);
        
        // Set associations
        if (lessonId != null) {
            lessonRepository.findById(lessonId)
                .ifPresent(imageLibrary::setLesson);
        }
        if (topicId != null) {
            topicRepository.findById(topicId)
                .ifPresent(imageLibrary::setTopic);
        }
        if (courseId != null) {
            courseRepository.findById(courseId)
                .ifPresent(imageLibrary::setCourse);
        }
        
        ImageLibrary savedImage = save(imageLibrary);
        log.info("Successfully uploaded image: {} (ID: {})", uniqueFileName, savedImage.getImageId());
        
        return savedImage;
    }
    
    @Override
    public ImageLibrary uploadImageWithPath(MultipartFile file, String customPath, String title,
                                          String description, String altText, String tags,
                                          ImageCategory category, Long lessonId, Long topicId,
                                          Long courseId, String uploadedBy) throws IOException {
        
        // Validate file
        if (!isValidImageFile(file)) {
            throw new IllegalArgumentException("Invalid image file type");
        }
        
        Path uploadPath = Paths.get(uploadDirectory, customPath);
        Files.createDirectories(uploadPath);
        
        String uniqueFileName = generateUniqueFileName(file.getOriginalFilename());
        Path filePath = uploadPath.resolve(uniqueFileName);
        
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        // Get image dimensions
        BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
        Integer width = bufferedImage != null ? bufferedImage.getWidth() : null;
        Integer height = bufferedImage != null ? bufferedImage.getHeight() : null;
        
        ImageLibrary imageLibrary = new ImageLibrary();
        imageLibrary.setFileName(uniqueFileName);
        imageLibrary.setOriginalName(file.getOriginalFilename());
        imageLibrary.setFilePath(customPath + "/" + uniqueFileName);
        imageLibrary.setFileSize(file.getSize());
        imageLibrary.setMimeType(file.getContentType());
        imageLibrary.setWidth(width);
        imageLibrary.setHeight(height);
        imageLibrary.setTitle(title);
        imageLibrary.setDescription(description);
        imageLibrary.setAltText(altText);
        imageLibrary.setTags(tags);
        imageLibrary.setCategory(category);
        imageLibrary.setUploadedBy(uploadedBy);
        
        return save(imageLibrary);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<ImageLibrary> searchImages(String searchTerm, Pageable pageable) {
        return imageLibraryRepository.searchImages(searchTerm, pageable);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<ImageLibrary> findByCategory(ImageCategory category, Pageable pageable) {
        return imageLibraryRepository.findByCategoryAndStatusFlagTrue(category, pageable);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ImageLibrary> findByLesson(Long lessonId) {
        return imageLibraryRepository.findByLessonLessonIdAndStatusFlagTrue(lessonId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ImageLibrary> findByTopic(Long topicId) {
        return imageLibraryRepository.findByTopicTopicIdAndStatusFlagTrue(topicId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ImageLibrary> findByCourse(Long courseId) {
        return imageLibraryRepository.findByCourseCourseIdAndStatusFlagTrue(courseId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<ImageLibrary> findWithFilters(ImageCategory category, Long lessonId, Long topicId,
                                            Long courseId, String searchTerm, Pageable pageable) {
        return imageLibraryRepository.findWithFilters(category, lessonId, topicId, courseId, searchTerm, pageable);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ImageLibrary> findFeaturedImages() {
        return imageLibraryRepository.findByIsFeaturedTrueAndStatusFlagTrueOrderByUploadDateDesc();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ImageLibrary> findRecentlyUploaded(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return imageLibraryRepository.findRecentlyUploaded(pageable);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ImageLibrary> findOrphanedImages() {
        return imageLibraryRepository.findOrphanedImages();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Long getTotalFileSize() {
        return imageLibraryRepository.getTotalFileSize();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Object[]> getImageStatistics() {
        return imageLibraryRepository.countByCategory();
    }
    
    @Override
    public byte[] getImageFile(Long imageId) throws IOException {
        Optional<ImageLibrary> imageOpt = findById(imageId);
        if (imageOpt.isPresent()) {
            ImageLibrary image = imageOpt.get();
            Path filePath = Paths.get(uploadDirectory, image.getFilePath());
            return Files.readAllBytes(filePath);
        }
        throw new IOException("Image not found");
    }
    
    @Override
    public String getImageUrl(Long imageId) {
        Optional<ImageLibrary> imageOpt = findById(imageId);
        if (imageOpt.isPresent()) {
            // ImageLibrary image = imageOpt.get();
            return "/api/images/" + imageId + "/view";
        }
        return null;
    }
    
    @Override
    public boolean deleteImageFile(String filePath) {
        try {
            Path path = Paths.get(uploadDirectory, filePath);
            return Files.deleteIfExists(path);
        } catch (IOException e) {
            log.error("Failed to delete image file: {}", filePath, e);
            return false;
        }
    }
    
    @Override
    public String generateUniqueFileName(String originalFileName) {
        String timestamp = String.valueOf(System.currentTimeMillis());
        String randomId = UUID.randomUUID().toString().substring(0, 8);
        String extension = "";
        
        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        
        return timestamp + "_" + randomId + extension;
    }
    
    @Override
    public String createDirectoryPath(ImageCategory category, Long lessonId, Long topicId, Long courseId) {
        StringBuilder path = new StringBuilder();
        
        if (category != null) {
            path.append(category.name().toLowerCase()).append("/");
        }
        
        if (courseId != null) {
            path.append("course_").append(courseId).append("/");
        }
        
        if (topicId != null) {
            path.append("topic_").append(topicId).append("/");
        }
        
        if (lessonId != null) {
            path.append("lesson_").append(lessonId).append("/");
        }
        
        if (path.length() == 0) {
            path.append("general/");
        }
        
        return path.toString();
    }
    
    @Override
    public boolean isValidImageFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return false;
        }
        
        String contentType = file.getContentType();
        if (contentType == null) {
            return false;
        }
        
        List<String> allowedTypes = Arrays.asList(allowedMimeTypes.split(","));
        return allowedTypes.contains(contentType.trim());
    }
    
    @Override
    public boolean isFileSizeValid(MultipartFile file) {
        return file != null && file.getSize() <= maxFileSize;
    }
    
    @Override
    public void validateImageDimensions(MultipartFile file) throws IOException {
        BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
        if (bufferedImage != null) {
            int width = bufferedImage.getWidth();
            int height = bufferedImage.getHeight();
            
            if (width > maxWidth || height > maxHeight) {
                throw new IllegalArgumentException(
                    String.format("Image dimensions (%dx%d) exceed maximum allowed size (%dx%d)",
                        width, height, maxWidth, maxHeight));
            }
        }
    }
    
    @Override
    public List<ImageLibrary> uploadMultipleImages(List<MultipartFile> files, ImageCategory category,
                                                 Long lessonId, Long topicId, Long courseId,
                                                 String uploadedBy) throws IOException {
        List<ImageLibrary> uploadedImages = new ArrayList<>();
        
        for (MultipartFile file : files) {
            try {
                ImageLibrary uploaded = uploadImage(file, null, null, null, null, 
                    category, lessonId, topicId, courseId, uploadedBy);
                uploadedImages.add(uploaded);
            } catch (Exception e) {
                log.error("Failed to upload file: {}", file.getOriginalFilename(), e);
                // Continue with other files
            }
        }
        
        return uploadedImages;
    }
    
    @Override
    public void deleteMultipleImages(List<Long> imageIds) {
        for (Long imageId : imageIds) {
            try {
                deleteById(imageId);
            } catch (Exception e) {
                log.error("Failed to delete image ID: {}", imageId, e);
            }
        }
    }
    
    @Override
    public void updateImageAssociations(Long imageId, Long lessonId, Long topicId, Long courseId) {
        Optional<ImageLibrary> imageOpt = findById(imageId);
        if (imageOpt.isPresent()) {
            ImageLibrary image = imageOpt.get();
            
            // Clear existing associations
            image.setLesson(null);
            image.setTopic(null);
            image.setCourse(null);
            
            // Set new associations
            if (lessonId != null) {
                lessonRepository.findById(lessonId).ifPresent(image::setLesson);
            }
            if (topicId != null) {
                topicRepository.findById(topicId).ifPresent(image::setTopic);
            }
            if (courseId != null) {
                courseRepository.findById(courseId).ifPresent(image::setCourse);
            }
            
            save(image);
        }
    }
}
