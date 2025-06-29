package com.vedicastrology.service;


import com.vedicastrology.entity.Course;
import com.vedicastrology.repository.CourseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private static final Logger logger = LoggerFactory.getLogger(CourseService.class);

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        logger.info("🔍 Fetching all courses from database");
        try {
            List<Course> courses = courseRepository.findAll();
            logger.info("✅ Successfully retrieved {} courses", courses.size());
            return courses;
        } catch (Exception e) {
            logger.error("💥 Error fetching all courses: {}", e.getMessage(), e);
            throw e;
        }
    }

    public Optional<Course> getCourseById(Long courseId) {
        logger.info("🔍 Fetching course with ID: {}", courseId);
        try {
            Optional<Course> course = courseRepository.findById(courseId);
            if (course.isPresent()) {
                logger.info("✅ Successfully found course: {}", course.get().getTitle());
            } else {
                logger.warn("⚠️ Course with ID {} not found", courseId);
            }
            return course;
        } catch (Exception e) {
            logger.error("💥 Error fetching course {}: {}", courseId, e.getMessage(), e);
            throw e;
        }
    }

    public Course createCourse(Course course) {
        logger.info("📝 Creating new course: {}", course.getTitle());
        try {
            Course savedCourse = courseRepository.save(course);
            logger.info("✅ Successfully created course with ID: {}", savedCourse.getCourseId());
            return savedCourse;
        } catch (Exception e) {
            logger.error("💥 Error creating course: {}", e.getMessage(), e);
            throw e;
        }
    }    public Course updateCourse(Long courseId, Course updatedCourse) {
        logger.info("📝 Updating course with ID: {}", courseId);
        try {
            Course result = courseRepository.findById(courseId).map(course -> {
                if (updatedCourse.getTitle() != null) {
                    course.setTitle(updatedCourse.getTitle());
                }
                if (updatedCourse.getDescription() != null) {
                    course.setDescription(updatedCourse.getDescription());
                }
                if (updatedCourse.getLoginId() != null) {
                    course.setLoginId(updatedCourse.getLoginId());
                }
                if (updatedCourse.getCategoryId() != null) {
                    course.setCategoryId(updatedCourse.getCategoryId());
                }
                if (updatedCourse.getDifficultyLevel() != null) {
                    course.setDifficultyLevel(updatedCourse.getDifficultyLevel());
                }
                if (updatedCourse.getPrice() != null) {
                    course.setPrice(updatedCourse.getPrice());
                }
                if (updatedCourse.getDurationHours() != null) {
                    course.setDurationHours(updatedCourse.getDurationHours());
                }
                if (updatedCourse.getThumbnailUrl() != null) {
                    course.setThumbnailUrl(updatedCourse.getThumbnailUrl());
                }
                if (updatedCourse.getIsPublished() != null) {
                    course.setIsPublished(updatedCourse.getIsPublished());
                }
                return courseRepository.save(course);
            }).orElseThrow(() -> {
                logger.error("💥 Course with ID {} not found for update", courseId);
                return new RuntimeException("Course not found");
            });
            logger.info("✅ Successfully updated course: {}", result.getTitle());
            return result;
        } catch (Exception e) {
            logger.error("💥 Error updating course {}: {}", courseId, e.getMessage(), e);
            throw e;
        }
    }

    public void deleteCourse(Long courseId) {
        logger.info("🗑️ Deleting course with ID: {}", courseId);
        try {
            courseRepository.deleteById(courseId);
            logger.info("✅ Successfully deleted course with ID: {}", courseId);
        } catch (Exception e) {
            logger.error("💥 Error deleting course {}: {}", courseId, e.getMessage(), e);
            throw e;
        }
    }
}
