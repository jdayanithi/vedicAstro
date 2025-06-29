package com.vedicastrology.controller;

import com.vedicastrology.entity.Course;
import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.IdRequest;
import com.vedicastrology.service.CourseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/secure/courses")
public class CourseController {

    private static final Logger logger = LoggerFactory.getLogger(CourseController.class);

    @Autowired
    private CourseService courseService;

    @PostMapping("/get-all")
    public List<Course> getAllCourses(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🔍 Fetching all courses");
        try {
            List<Course> courses = courseService.getAllCourses();
            logger.info("✅ Successfully fetched {} courses", courses.size());
            return courses;
        } catch (Exception e) {
            logger.error("💥 Error fetching all courses: {}", e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping("/get-by-id")
    public ResponseEntity<Course> getCourseById(@RequestBody IdRequest request) {
        Long id = request.getId();
        logger.info("🔍 Fetching course with ID: {}", id);
        try {
            Optional<Course> course = courseService.getCourseById(id);
            if (course.isPresent()) {
                logger.info("✅ Successfully fetched course: {}", course.get().getTitle());
                return ResponseEntity.ok(course.get());
            } else {
                logger.warn("⚠️ Course with ID {} not found", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("💥 Error fetching course with ID {}: {}", id, e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        logger.info("📝 Creating new course: {}", course.getTitle());
        try {
            Course createdCourse = courseService.createCourse(course);
            logger.info("✅ Successfully created course with ID: {}", createdCourse.getCourseId());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCourse);
        } catch (Exception e) {
            logger.error("💥 Error creating course: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {
        logger.info("📝 Updating course with ID: {}", id);
        try {
            Course course = courseService.updateCourse(id, updatedCourse);
            logger.info("✅ Successfully updated course: {}", course.getTitle());
            return ResponseEntity.ok(course);
        } catch (RuntimeException e) {
            logger.error("💥 Error updating course {}: {}", id, e.getMessage(), e);
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        logger.info("🗑️ Deleting course with ID: {}", id);
        try {
            courseService.deleteCourse(id);
            logger.info("✅ Successfully deleted course with ID: {}", id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("💥 Error deleting course {}: {}", id, e.getMessage(), e);
            return ResponseEntity.notFound().build();
        }
    }
}
