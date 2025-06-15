package com.vedicastrology.service;

import com.vedicastrology.entity.Course;
import com.vedicastrology.repository.CourseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CourseServiceTest {

    @Mock
    private CourseRepository courseRepository;

    @InjectMocks
    private CourseService courseService;

    private Course testCourse;

    @BeforeEach
    void setUp() {
        testCourse = new Course();
        testCourse.setCourseId(1L);
        testCourse.setTitle("Test Course");
        testCourse.setDescription("Test Course Description");
        testCourse.setLoginId(1L);
        testCourse.setCategoryId(1L);
        testCourse.setPrice(new BigDecimal("99.99"));
        testCourse.setDurationHours(40);
        testCourse.setThumbnailUrl("https://example.com/thumbnail.jpg");
        testCourse.setIsPublished(true);
        testCourse.setCreatedAt(LocalDateTime.now());
        testCourse.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    void getAllCourses_Success() {
        // Arrange
        List<Course> courses = Arrays.asList(testCourse);
        when(courseRepository.findAll()).thenReturn(courses);

        // Act
        List<Course> result = courseService.getAllCourses();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Course", result.get(0).getTitle());
        assertEquals("Test Course Description", result.get(0).getDescription());
        verify(courseRepository).findAll();
    }

    @Test
    void getCourseById_Success() {
        // Arrange
        when(courseRepository.findById(1L)).thenReturn(Optional.of(testCourse));

        // Act
        Optional<Course> result = courseService.getCourseById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getCourseId());
        assertEquals("Test Course", result.get().getTitle());
        assertEquals(1L, result.get().getLoginId());
        assertEquals(1L, result.get().getCategoryId());
        assertEquals(new BigDecimal("99.99"), result.get().getPrice());
        assertEquals(40, result.get().getDurationHours());
        assertTrue(result.get().getIsPublished());
        verify(courseRepository).findById(1L);
    }

    @Test
    void getCourseById_NotFound() {
        // Arrange
        when(courseRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Optional<Course> result = courseService.getCourseById(99L);

        // Assert
        assertFalse(result.isPresent());
        verify(courseRepository).findById(99L);
    }

    @Test
    void createCourse_Success() {
        // Arrange
        Course newCourse = new Course();
        newCourse.setTitle("New Course");
        newCourse.setDescription("New Course Description");
        newCourse.setLoginId(2L);
        newCourse.setCategoryId(2L);
        newCourse.setPrice(new BigDecimal("149.99"));
        newCourse.setDurationHours(60);
        newCourse.setThumbnailUrl("https://example.com/new-thumbnail.jpg");
        newCourse.setIsPublished(false);

        when(courseRepository.save(any(Course.class))).thenReturn(testCourse);

        // Act
        Course result = courseService.createCourse(newCourse);

        // Assert
        assertNotNull(result);
        assertEquals("Test Course", result.getTitle()); // Mocked return
        verify(courseRepository).save(newCourse);
    }

    @Test
    void updateCourse_Success() {
        // Arrange
        Course updatedCourse = new Course();
        updatedCourse.setTitle("Updated Course");
        updatedCourse.setDescription("Updated Description");
        updatedCourse.setLoginId(3L);
        updatedCourse.setCategoryId(3L);
        updatedCourse.setPrice(new BigDecimal("199.99"));
        updatedCourse.setDurationHours(80);
        updatedCourse.setThumbnailUrl("https://example.com/updated-thumbnail.jpg");
        updatedCourse.setIsPublished(false);

        Course savedCourse = new Course();
        savedCourse.setCourseId(1L);
        savedCourse.setTitle("Updated Course");
        savedCourse.setDescription("Updated Description");
        savedCourse.setLoginId(3L);
        savedCourse.setCategoryId(3L);
        savedCourse.setPrice(new BigDecimal("199.99"));
        savedCourse.setDurationHours(80);
        savedCourse.setThumbnailUrl("https://example.com/updated-thumbnail.jpg");
        savedCourse.setIsPublished(false);

        when(courseRepository.findById(1L)).thenReturn(Optional.of(testCourse));
        when(courseRepository.save(any(Course.class))).thenReturn(savedCourse);

        // Act
        Course result = courseService.updateCourse(1L, updatedCourse);

        // Assert
        assertNotNull(result);
        assertEquals("Updated Course", result.getTitle());
        assertEquals("Updated Description", result.getDescription());
        assertEquals(3L, result.getLoginId());
        assertEquals(3L, result.getCategoryId());
        assertEquals(new BigDecimal("199.99"), result.getPrice());
        assertEquals(80, result.getDurationHours());
        assertEquals("https://example.com/updated-thumbnail.jpg", result.getThumbnailUrl());
        assertFalse(result.getIsPublished());
        verify(courseRepository).findById(1L);
        verify(courseRepository).save(any(Course.class));
    }

    @Test
    void updateCourse_NotFound_ThrowsException() {
        // Arrange
        Course updatedCourse = new Course();
        updatedCourse.setTitle("Updated Course");

        when(courseRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> 
            courseService.updateCourse(99L, updatedCourse)
        );
        assertEquals("Course not found", exception.getMessage());
        verify(courseRepository).findById(99L);
        verify(courseRepository, never()).save(any(Course.class));
    }

    @Test
    void deleteCourse_Success() {
        // Act
        courseService.deleteCourse(1L);

        // Assert
        verify(courseRepository).deleteById(1L);
    }

    @Test
    void updateCourse_PartialUpdate() {
        // Arrange - Test that existing course fields are properly updated
        Course partialUpdate = new Course();
        partialUpdate.setTitle("Partially Updated Title");
        partialUpdate.setPrice(new BigDecimal("299.99"));
        // Other fields not set, should preserve existing values

        Course existingCourse = new Course();
        existingCourse.setCourseId(1L);
        existingCourse.setTitle("Original Title");
        existingCourse.setDescription("Original Description");
        existingCourse.setLoginId(1L);
        existingCourse.setCategoryId(1L);
        existingCourse.setPrice(new BigDecimal("99.99"));
        existingCourse.setDurationHours(40);
        existingCourse.setThumbnailUrl("https://example.com/original.jpg");        existingCourse.setIsPublished(true);

        Course savedCourse = new Course();
        savedCourse.setCourseId(1L);
        savedCourse.setTitle("Partially Updated Title");
        savedCourse.setDescription("Original Description"); 
        savedCourse.setLoginId(1L); 
        savedCourse.setCategoryId(1L); 
        savedCourse.setPrice(new BigDecimal("299.99")); 
        savedCourse.setDurationHours(40); 
        savedCourse.setThumbnailUrl("https://example.com/original.jpg"); 
        savedCourse.setIsPublished(true); 
        
        when(courseRepository.findById(1L)).thenReturn(Optional.of(existingCourse));
        when(courseRepository.save(any(Course.class))).thenReturn(savedCourse);

        // Act
        Course result = courseService.updateCourse(1L, partialUpdate);

        // Assert
        assertNotNull(result);
        assertEquals("Partially Updated Title", result.getTitle());
        assertEquals("Original Description", result.getDescription());
        assertEquals(new BigDecimal("299.99"), result.getPrice());
        verify(courseRepository).findById(1L);
        verify(courseRepository).save(any(Course.class));
    }
}
