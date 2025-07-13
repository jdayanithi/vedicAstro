package com.vedicastrology.controller;

import com.vedicastrology.dto.LessonDTO;
import com.vedicastrology.dto.LessonDetailDTO;
import com.vedicastrology.dto.LessonSummaryDTO;
import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.dto.request.SecureRequestDTOs.SecureIdRequest;
import com.vedicastrology.dto.request.SecureRequestDTOs.SecureLessonUpdateRequest;
import com.vedicastrology.security.InputSanitizationService;
import com.vedicastrology.service.LessonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/secure/lessons")
public class LessonController {

    private static final Logger logger = LoggerFactory.getLogger(LessonController.class);

    @Autowired
    private LessonService lessonService;
    
    @Autowired
    private InputSanitizationService inputSanitizationService;

    @PostMapping("/get-all")
    public ResponseEntity<List<LessonDTO>> getAllLessons(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🔍 Fetching all lessons");
        List<LessonDTO> lessons = lessonService.getAllLessons();
        logger.info("✅ Fetched {} lessons", lessons.size());
        return ResponseEntity.ok(lessons);
    }

    @PostMapping("/get-by-topic")
    public ResponseEntity<?> getAllLessonsByTopic(@Valid @RequestBody SecureIdRequest request) {
        Long topicId = request.getId();
        logger.info("🔍 Fetching lesson summaries for topic ID: {}", topicId);
        try {
            // Additional validation for ID
            if (topicId == null || topicId <= 0) {
                logger.warn("🚨 Invalid topic ID provided: {}", topicId);
                return ResponseEntity.badRequest().body("Invalid topic ID");
            }
            
            // Use optimized method that excludes description for better performance
            List<LessonSummaryDTO> lessons = lessonService.getLessonSummariesByTopicId(topicId);
            logger.info("✅ Fetched {} lesson summaries for topic ID: {}", lessons.size(), topicId);
            return ResponseEntity.ok(lessons);
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in get lessons by topic: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error fetching lessons for topic {}: {}", topicId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to fetch lessons");
        }
    }

    @PostMapping("/get-by-id")
    public ResponseEntity<?> getLessonById(@Valid @RequestBody SecureIdRequest request) {
        Long lessonId = request.getId();
        logger.info("🔍 Fetching lesson with ID: {}", lessonId);
        try {
            // Additional validation for ID
            if (lessonId == null || lessonId <= 0) {
                logger.warn("🚨 Invalid lesson ID provided: {}", lessonId);
                return ResponseEntity.badRequest().body("Invalid lesson ID");
            }
            
            LessonDTO lesson = lessonService.getLessonById(lessonId);
            logger.info("✅ Fetched lesson: {}", lesson.getTitle());
            return ResponseEntity.ok(lesson);
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in get lesson by ID: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error fetching lesson with ID {}: {}", lessonId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to fetch lesson");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createLesson(@Valid @RequestBody LessonDTO lessonDTO) {
        try {
            // Sanitize lesson input fields - use course content sanitization for Tamil text support
            if (lessonDTO.getTitle() != null) {
                String sanitizedTitle = inputSanitizationService.sanitizeCourseContent(lessonDTO.getTitle(), "lessonTitle");
                lessonDTO.setTitle(sanitizedTitle);
            }
            if (lessonDTO.getDescription() != null) {
                String sanitizedDescription = inputSanitizationService.sanitizeCourseContent(lessonDTO.getDescription(), "lessonDescription");
                lessonDTO.setDescription(sanitizedDescription);
            }
            
            LessonDTO createdLesson = lessonService.createLesson(lessonDTO);
            logger.info("✅ Created lesson: {}", createdLesson.getTitle());
            return new ResponseEntity<>(createdLesson, HttpStatus.CREATED);
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in create lesson: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid lesson data: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error creating lesson: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to create lesson");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateLesson(@Valid @RequestBody SecureLessonUpdateRequest request) {
        Long lessonId = request.getId();
        try {
            // Additional validation for ID
            if (lessonId == null || lessonId <= 0) {
                logger.warn("🚨 Invalid lesson ID provided for update: {}", lessonId);
                return ResponseEntity.badRequest().body("Invalid lesson ID");
            }
            
            // Get existing lesson first to preserve fields not being updated
            LessonDTO existingLesson = lessonService.getLessonById(lessonId);
            if (existingLesson == null) {
                logger.warn("🚨 Lesson not found with ID: {}", lessonId);
                return ResponseEntity.notFound().build();
            }
            
            // Sanitize lesson input fields - use course content sanitization for Tamil text support
            LessonDTO lessonDTO = new LessonDTO();
            
            // Copy all existing fields first
            lessonDTO.setLessonId(existingLesson.getLessonId());
            lessonDTO.setTopicId(existingLesson.getTopicId());
            lessonDTO.setContentType(existingLesson.getContentType());
            lessonDTO.setContentUrl(existingLesson.getContentUrl());
            lessonDTO.setDurationMinutes(existingLesson.getDurationMinutes());
            lessonDTO.setOrderNumber(existingLesson.getOrderNumber());
            lessonDTO.setIsFree(existingLesson.getIsFree());
            
            // Update only the fields that are provided
            if (request.getTitle() != null) {
                String sanitizedTitle = inputSanitizationService.sanitizeCourseContent(request.getTitle(), "lessonTitle");
                lessonDTO.setTitle(sanitizedTitle);
            } else {
                lessonDTO.setTitle(existingLesson.getTitle());
            }
            
            if (request.getDescription() != null) {
                String sanitizedDescription = inputSanitizationService.sanitizeCourseContent(request.getDescription(), "lessonDescription");
                lessonDTO.setDescription(sanitizedDescription);
            } else {
                lessonDTO.setDescription(existingLesson.getDescription());
            }
            
            // Update topic ID if provided
            if (request.getTopicId() != null) {
                lessonDTO.setTopicId(request.getTopicId());
            }
            
            // Update order index if provided
            if (request.getOrderIndex() != null) {
                lessonDTO.setOrderNumber(request.getOrderIndex());
            }
            
            LessonDTO updatedLesson = lessonService.updateLesson(lessonId, lessonDTO);
            logger.info("✅ Updated lesson: {}", updatedLesson.getTitle());
            return ResponseEntity.ok(updatedLesson);
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in update lesson: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid lesson data: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error updating lesson {}: {}", lessonId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to update lesson");
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteLesson(@Valid @RequestBody SecureIdRequest request) {
        Long lessonId = request.getId();
        logger.info("🗑️ Deleting lesson with ID: {}", lessonId);
        try {
            // Additional validation for ID
            if (lessonId == null || lessonId <= 0) {
                logger.warn("🚨 Invalid lesson ID provided for deletion: {}", lessonId);
                return ResponseEntity.badRequest().body("Invalid lesson ID");
            }
            
            lessonService.deleteLesson(lessonId);
            logger.info("✅ Successfully deleted lesson with ID: {}", lessonId);
            return ResponseEntity.noContent().build();
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in delete lesson: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error deleting lesson {}: {}", lessonId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to delete lesson");
        }
    }

    @PostMapping("/get-details")
    public ResponseEntity<?> getLessonDetails(@Valid @RequestBody SecureIdRequest request) {
        Long lessonId = request.getId();
        logger.info("🔍 Fetching lesson details for ID: {}", lessonId);
        try {
            // Additional validation for ID
            if (lessonId == null || lessonId <= 0) {
                logger.warn("🚨 Invalid lesson ID provided: {}", lessonId);
                return ResponseEntity.badRequest().body("Invalid lesson ID");
            }
            
            LessonDetailDTO lessonDetails = lessonService.getLessonDetails(lessonId);
            logger.info("✅ Fetched lesson details for: {}", lessonDetails.getTitle());
            return ResponseEntity.ok(lessonDetails);
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in get lesson details: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error fetching lesson details for ID {}: {}", lessonId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to fetch lesson details");
        }
    }
}
