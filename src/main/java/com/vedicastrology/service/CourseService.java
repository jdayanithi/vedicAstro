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
    }

    public Course updateCourse(Long courseId, Course updatedCourse) {
        return courseRepository.findById(courseId).map(course -> {
            course.setTitle(updatedCourse.getTitle());
            course.setDescription(updatedCourse.getDescription());
            course.setLoginId(updatedCourse.getLoginId());
            course.setCategoryId(updatedCourse.getCategoryId());
            course.setDifficultyLevel(updatedCourse.getDifficultyLevel());
            course.setPrice(updatedCourse.getPrice());
            course.setDurationHours(updatedCourse.getDurationHours());
            course.setThumbnailUrl(updatedCourse.getThumbnailUrl());
            course.setIsPublished(updatedCourse.getIsPublished());
            return courseRepository.save(course);
        }).orElseThrow(() -> new RuntimeException("Course not found"));
    }

    public void deleteCourse(Long courseId) {
        courseRepository.deleteById(courseId);
    }
}
