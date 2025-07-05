package com.vedicastrology.controller;

import com.vedicastrology.entity.Course;
import com.vedicastrology.entity.DifficultyLevel;
import com.vedicastrology.dto.request.SecureRequestDTOs.SecureIdRequest;
import com.vedicastrology.dto.request.SecureRequestDTOs.SecureCourseRequest;
import com.vedicastrology.dto.request.SecureRequestDTOs.SecureCourseUpdateRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.security.InputSanitizationService;
import com.vedicastrology.service.CourseService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/secure/courses")
public class CourseController {

    private static final Logger logger = LoggerFactory.getLogger(CourseController.class);

    @Autowired
    private CourseService courseService;
    
    @Autowired
    private InputSanitizationService inputSanitizationService;

    @PostMapping("/get-all")
    public ResponseEntity<List<Course>> getAllCourses(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🔍 Fetching all courses");
        try {
            List<Course> courses = courseService.getAllCourses();
            logger.info("✅ Successfully fetched {} courses", courses.size());
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            logger.error("💥 Error fetching all courses: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/get-by-id")
    public ResponseEntity<?> getCourseById(@Valid @RequestBody SecureIdRequest request) {
        Long id = request.getId();
        logger.info("🔍 Fetching course with ID: {}", id);
        try {
            // Additional validation for ID
            if (id == null || id <= 0) {
                logger.warn("🚨 Invalid course ID provided: {}", id);
                return ResponseEntity.badRequest().body("Invalid course ID");
            }
            
            Optional<Course> course = courseService.getCourseById(id);
            if (course.isPresent()) {
                logger.info("✅ Successfully fetched course: {}", course.get().getTitle());
                return ResponseEntity.ok(course.get());
            } else {
                logger.warn("⚠️ Course with ID {} not found", id);
                return ResponseEntity.notFound().build();
            }
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in get course by ID: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error fetching course with ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to fetch course");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCourse(@Valid @RequestBody SecureCourseRequest request) {
        logger.info("📝 Creating new course: {}", request.getTitle());
        try {
            // Additional sanitization
            String sanitizedTitle = inputSanitizationService.sanitizeInput(request.getTitle(), "courseTitle");
            String sanitizedDescription = inputSanitizationService.sanitizeInput(request.getDescription(), "courseDescription");
            
            // Create course entity from secure request
            Course course = new Course();
            course.setTitle(sanitizedTitle);
            course.setDescription(sanitizedDescription);
            course.setCategoryId(request.getCategoryId());
            course.setDifficultyLevel(DifficultyLevel.fromString(request.getDifficultyLevel()));
            course.setPrice(request.getPrice() != null ? BigDecimal.valueOf(request.getPrice()) : null);
            course.setDurationHours(request.getDurationHours());
            
            Course createdCourse = courseService.createCourse(course);
            logger.info("✅ Successfully created course with ID: {}", createdCourse.getCourseId());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCourse);
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in create course: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid course data: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error creating course: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create course");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateCourse(@Valid @RequestBody SecureCourseUpdateRequest request) {
        logger.info("📝 Updating course with ID: {}", request.getId());
        try {
            // Additional validation for ID
            if (request.getId() == null || request.getId() <= 0) {
                logger.warn("🚨 Invalid course ID provided for update: {}", request.getId());
                return ResponseEntity.badRequest().body("Invalid course ID");
            }

            // Additional sanitization
            String sanitizedTitle = inputSanitizationService.sanitizeInput(request.getTitle(), "courseTitle");
            String sanitizedDescription = inputSanitizationService.sanitizeInput(request.getDescription(), "courseDescription");
            
            // Create course entity from secure request
            Course updatedCourse = new Course();
            updatedCourse.setTitle(sanitizedTitle);
            updatedCourse.setDescription(sanitizedDescription);
            updatedCourse.setCategoryId(request.getCategoryId());
            updatedCourse.setDifficultyLevel(DifficultyLevel.fromString(request.getDifficultyLevel()));
            updatedCourse.setPrice(request.getPrice() != null ? BigDecimal.valueOf(request.getPrice()) : null);
            updatedCourse.setDurationHours(request.getDurationHours());
            
            Course course = courseService.updateCourse(request.getId(), updatedCourse);
            logger.info("✅ Successfully updated course: {}", course.getTitle());
            return ResponseEntity.ok(course);
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in update course: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid course data: " + e.getMessage());
        } catch (RuntimeException e) {
            logger.error("💥 Error updating course {}: {}", request.getId(), e.getMessage(), e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("💥 Unexpected error updating course {}: {}", request.getId(), e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to update course");
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteCourse(@Valid @RequestBody SecureIdRequest request) {
        Long id = request.getId();
        logger.info("🗑️ Deleting course with ID: {}", id);
        try {
            // Additional validation for ID
            if (id == null || id <= 0) {
                logger.warn("🚨 Invalid course ID provided for deletion: {}", id);
                return ResponseEntity.badRequest().body("Invalid course ID");
            }
            
            courseService.deleteCourse(id);
            logger.info("✅ Successfully deleted course with ID: {}", id);
            return ResponseEntity.noContent().build();
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in delete course: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error deleting course {}: {}", id, e.getMessage(), e);
            return ResponseEntity.notFound().build();
        }
    }    // ...existing code...
}
