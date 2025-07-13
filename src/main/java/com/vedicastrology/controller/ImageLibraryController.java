package com.vedicastrology.controller;

import com.vedicastrology.entity.ImageLibrary;
import com.vedicastrology.entity.ImageCategory;
import com.vedicastrology.service.ImageLibraryService;
import com.vedicastrology.dto.ImageStatisticsResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/secure/images")
@RequiredArgsConstructor
@Slf4j
public class ImageLibraryController {
    
    private final ImageLibraryService imageLibraryService;
    
    // Get all images with pagination
    @PostMapping("/get-all")
    public ResponseEntity<Page<ImageLibrary>> getAllImages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "uploadDate") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<ImageLibrary> images = imageLibraryService.findAll(pageable);
        return ResponseEntity.ok(images);
    }
    
    // Get image by ID
    @GetMapping("/{id}")
    public ResponseEntity<ImageLibrary> getImageById(@PathVariable Long id) {
        Optional<ImageLibrary> image = imageLibraryService.findById(id);
        return image.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    // View image file
    @GetMapping("/{id}/view")
    public ResponseEntity<byte[]> viewImage(@PathVariable Long id) {
        try {
            Optional<ImageLibrary> imageOpt = imageLibraryService.findById(id);
            if (imageOpt.isPresent()) {
                ImageLibrary image = imageOpt.get();
                byte[] imageData = imageLibraryService.getImageFile(id);
                
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.parseMediaType(image.getMimeType()));
                headers.setContentLength(imageData.length);
                
                return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
            }
            return ResponseEntity.notFound().build();
        } catch (IOException e) {
            log.error("Error serving image file for ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Upload single image
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String altText,
            @RequestParam(required = false) String tags,
            @RequestParam(required = false) ImageCategory category,
            @RequestParam(required = false) Long lessonId,
            @RequestParam(required = false) Long topicId,
            @RequestParam(required = false) Long courseId) {
        
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }
            
            // Get authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String uploadedBy = "admin"; // Default fallback
            if (authentication != null && authentication.isAuthenticated() && 
                !authentication.getName().equals("anonymousUser")) {
                uploadedBy = authentication.getName(); // Use authenticated user ID
                log.info("🔍 Image upload by authenticated user: {}", uploadedBy);
            }
            
            ImageLibrary uploadedImage = imageLibraryService.uploadImage(
                file, title, description, altText, tags, category,
                lessonId, topicId, courseId, uploadedBy
            );
            
            return ResponseEntity.ok(uploadedImage);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            log.error("Error uploading image", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Failed to upload image");
        }
    }
    
    // Upload multiple images
    @PostMapping("/upload/multiple")
    public ResponseEntity<?> uploadMultipleImages(
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam(required = false) ImageCategory category,
            @RequestParam(required = false) Long lessonId,
            @RequestParam(required = false) Long topicId,
            @RequestParam(required = false) Long courseId) {
        
        try {
            // Get authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String uploadedBy = "admin"; // Default fallback
            if (authentication != null && authentication.isAuthenticated() && 
                !authentication.getName().equals("anonymousUser")) {
                uploadedBy = authentication.getName(); // Use authenticated user ID
                log.info("🔍 Multiple images upload by authenticated user: {}", uploadedBy);
            }
            
            List<ImageLibrary> uploadedImages = imageLibraryService.uploadMultipleImages(
                files, category, lessonId, topicId, courseId, uploadedBy
            );
            
            return ResponseEntity.ok(uploadedImages);
        } catch (IOException e) {
            log.error("Error uploading multiple images", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Failed to upload images");
        }
    }
    
    // Update image details
    @PutMapping("/{id}")
    public ResponseEntity<?> updateImage(
            @PathVariable Long id,
            @RequestBody ImageLibrary imageUpdate) {
        
        try {
            Optional<ImageLibrary> existingImageOpt = imageLibraryService.findById(id);
            if (!existingImageOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            ImageLibrary existingImage = existingImageOpt.get();
            
            // Update only allowed fields
            if (imageUpdate.getTitle() != null) {
                existingImage.setTitle(imageUpdate.getTitle());
            }
            if (imageUpdate.getDescription() != null) {
                existingImage.setDescription(imageUpdate.getDescription());
            }
            if (imageUpdate.getAltText() != null) {
                existingImage.setAltText(imageUpdate.getAltText());
            }
            if (imageUpdate.getTags() != null) {
                existingImage.setTags(imageUpdate.getTags());
            }
            if (imageUpdate.getCategory() != null) {
                existingImage.setCategory(imageUpdate.getCategory());
            }
            if (imageUpdate.getIsPublic() != null) {
                existingImage.setIsPublic(imageUpdate.getIsPublic());
            }
            if (imageUpdate.getIsFeatured() != null) {
                existingImage.setIsFeatured(imageUpdate.getIsFeatured());
            }
            
            ImageLibrary updatedImage = imageLibraryService.save(existingImage);
            return ResponseEntity.ok(updatedImage);
            
        } catch (Exception e) {
            log.error("Error updating image ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Failed to update image");
        }
    }
    
    // Update image associations
    @PutMapping("/{id}/associations")
    public ResponseEntity<?> updateImageAssociations(
            @PathVariable Long id,
            @RequestParam(required = false) Long lessonId,
            @RequestParam(required = false) Long topicId,
            @RequestParam(required = false) Long courseId) {
        
        try {
            imageLibraryService.updateImageAssociations(id, lessonId, topicId, courseId);
            return ResponseEntity.ok().body("Associations updated successfully");
        } catch (Exception e) {
            log.error("Error updating associations for image ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Failed to update associations");
        }
    }
    
    // Delete image (hard delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable Long id) {
        try {
            imageLibraryService.deleteById(id);
            return ResponseEntity.ok().body("Image deleted successfully");
        } catch (Exception e) {
            log.error("Error deleting image ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Failed to delete image");
        }
    }
    
    // Soft delete image
    @PutMapping("/{id}/disable")
    public ResponseEntity<?> disableImage(@PathVariable Long id) {
        try {
            imageLibraryService.softDeleteById(id);
            return ResponseEntity.ok().body("Image disabled successfully");
        } catch (Exception e) {
            log.error("Error disabling image ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Failed to disable image");
        }
    }
    
    // Delete multiple images
    @DeleteMapping("/bulk")
    public ResponseEntity<?> deleteMultipleImages(@RequestBody List<Long> imageIds) {
        try {
            imageLibraryService.deleteMultipleImages(imageIds);
            return ResponseEntity.ok().body("Images deleted successfully");
        } catch (Exception e) {
            log.error("Error deleting multiple images", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Failed to delete images");
        }
    }
    
    // Search images
    @PostMapping("/search")
    public ResponseEntity<Page<ImageLibrary>> searchImages(
            @RequestParam String searchTerm,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("uploadDate").descending());
        Page<ImageLibrary> images = imageLibraryService.searchImages(searchTerm, pageable);
        return ResponseEntity.ok(images);
    }
    
    // Filter images
    @PostMapping("/filter")
    public ResponseEntity<Page<ImageLibrary>> filterImages(
            @RequestParam(required = false) ImageCategory category,
            @RequestParam(required = false) Long lessonId,
            @RequestParam(required = false) Long topicId,
            @RequestParam(required = false) Long courseId,
            @RequestParam(required = false) String searchTerm,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("uploadDate").descending());
        Page<ImageLibrary> images = imageLibraryService.findWithFilters(
            category, lessonId, topicId, courseId, searchTerm, pageable);
        return ResponseEntity.ok(images);
    }
    
    // Get images by category
    @GetMapping("/category/{category}")
    public ResponseEntity<Page<ImageLibrary>> getImagesByCategory(
            @PathVariable ImageCategory category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("uploadDate").descending());
        Page<ImageLibrary> images = imageLibraryService.findByCategory(category, pageable);
        return ResponseEntity.ok(images);
    }
    
    // Get images by lesson
    @GetMapping("/lesson/{lessonId}")
    public ResponseEntity<List<ImageLibrary>> getImagesByLesson(@PathVariable Long lessonId) {
        List<ImageLibrary> images = imageLibraryService.findByLesson(lessonId);
        return ResponseEntity.ok(images);
    }
    
    // Get images by topic
    @GetMapping("/topic/{topicId}")
    public ResponseEntity<List<ImageLibrary>> getImagesByTopic(@PathVariable Long topicId) {
        List<ImageLibrary> images = imageLibraryService.findByTopic(topicId);
        return ResponseEntity.ok(images);
    }
    
    // Get images by course
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<ImageLibrary>> getImagesByCourse(@PathVariable Long courseId) {
        List<ImageLibrary> images = imageLibraryService.findByCourse(courseId);
        return ResponseEntity.ok(images);
    }
    
    // Get featured images
    @GetMapping("/featured")
    public ResponseEntity<List<ImageLibrary>> getFeaturedImages() {
        List<ImageLibrary> images = imageLibraryService.findFeaturedImages();
        return ResponseEntity.ok(images);
    }
    
    // Get recently uploaded images
    @GetMapping("/recent")
    public ResponseEntity<List<ImageLibrary>> getRecentImages(
            @RequestParam(defaultValue = "10") int limit) {
        List<ImageLibrary> images = imageLibraryService.findRecentlyUploaded(limit);
        return ResponseEntity.ok(images);
    }
    
    // Get orphaned images
    @GetMapping("/orphaned")
    public ResponseEntity<List<ImageLibrary>> getOrphanedImages() {
        List<ImageLibrary> images = imageLibraryService.findOrphanedImages();
        return ResponseEntity.ok(images);
    }
    
    // Get image statistics
    @GetMapping("/statistics")
    public ResponseEntity<ImageStatisticsResponse> getImageStatistics() {
        try {
            Long totalSize = imageLibraryService.getTotalFileSize();
            List<Object[]> categoryStats = imageLibraryService.getImageStatistics();
            
            ImageStatisticsResponse response = new ImageStatisticsResponse(
                totalSize, categoryStats, null, null);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error getting image statistics", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get all categories
    @GetMapping("/categories")
    public ResponseEntity<ImageCategory[]> getImageCategories() {
        return ResponseEntity.ok(ImageCategory.values());
    }
}
