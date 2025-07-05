package com.vedicastrology.service;


import com.vedicastrology.entity.Course;
import com.vedicastrology.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Long courseId) {
        return courseRepository.findById(courseId);
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }    public Course updateCourse(Long courseId, Course updatedCourse) {
        return courseRepository.findById(courseId).map(course -> {
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
        }).orElseThrow(() -> new RuntimeException("Course not found"));
    }

    public void deleteCourse(Long courseId) {
        courseRepository.deleteById(courseId);
    }
}
