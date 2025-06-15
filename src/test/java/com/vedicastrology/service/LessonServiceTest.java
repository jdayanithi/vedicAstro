package com.vedicastrology.service;

import com.vedicastrology.dto.LessonDTO;
import com.vedicastrology.entity.ContentType;
import com.vedicastrology.entity.Lesson;
import com.vedicastrology.entity.Topic;
import com.vedicastrology.repository.LessonRepository;
import com.vedicastrology.repository.TopicRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LessonServiceTest {

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private TopicRepository topicRepository;

    @InjectMocks
    private LessonService lessonService;

    private Topic testTopic;
    private Lesson testLesson;
    private LessonDTO testLessonDTO;

    @BeforeEach
    void setUp() {
        // Setup test topic
        testTopic = new Topic();
        testTopic.setTopicId(1L);
        testTopic.setTitle("Test Topic");
        testTopic.setDescription("Test Topic Description");

        // Setup test lesson
        testLesson = new Lesson();
        testLesson.setLessonId(1L);
        testLesson.setTopic(testTopic);
        testLesson.setTitle("Test Lesson");
        testLesson.setDescription("Test Lesson Description");
        testLesson.setContentType(ContentType.video);
        testLesson.setContentUrl("https://example.com/video.mp4");
        testLesson.setDurationMinutes(30);
        testLesson.setOrderNumber(1);
        testLesson.setIsFree(true);
        testLesson.setCreatedAt(LocalDateTime.now());
        testLesson.setUpdatedAt(LocalDateTime.now());

        // Setup test DTO
        testLessonDTO = new LessonDTO();
        testLessonDTO.setLessonId(1L);
        testLessonDTO.setTopicId(1L);
        testLessonDTO.setTitle("Test Lesson");
        testLessonDTO.setDescription("Test Lesson Description");
        testLessonDTO.setContentType("video");
        testLessonDTO.setContentUrl("https://example.com/video.mp4");
        testLessonDTO.setDurationMinutes(30);
        testLessonDTO.setOrderNumber(1);
        testLessonDTO.setIsFree(true);
        testLessonDTO.setCreatedAt(LocalDateTime.now());
        testLessonDTO.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    void getAllLessons_Success() {
        // Arrange
        List<Lesson> lessons = Arrays.asList(testLesson);
        when(lessonRepository.findAll()).thenReturn(lessons);

        // Act
        List<LessonDTO> result = lessonService.getAllLessons();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Lesson", result.get(0).getTitle());
        assertEquals("video", result.get(0).getContentType());
        verify(lessonRepository).findAll();
    }

    @Test
    void getAllLessonsByTopicId_Success() {
        // Arrange
        List<Lesson> lessons = Arrays.asList(testLesson);
        when(lessonRepository.findByTopic_TopicIdOrderByOrderNumberAsc(1L)).thenReturn(lessons);

        // Act
        List<LessonDTO> result = lessonService.getAllLessonsByTopicId(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Lesson", result.get(0).getTitle());
        assertEquals(1L, result.get(0).getTopicId());
        verify(lessonRepository).findByTopic_TopicIdOrderByOrderNumberAsc(1L);
    }

    @Test
    void getLessonById_Success() {
        // Arrange
        when(lessonRepository.findById(1L)).thenReturn(Optional.of(testLesson));

        // Act
        LessonDTO result = lessonService.getLessonById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getLessonId());
        assertEquals("Test Lesson", result.getTitle());
        assertEquals("Test Lesson Description", result.getDescription());
        assertEquals("video", result.getContentType());
        assertEquals("https://example.com/video.mp4", result.getContentUrl());
        assertEquals(30, result.getDurationMinutes());
        assertEquals(1, result.getOrderNumber());
        assertTrue(result.getIsFree());
        verify(lessonRepository).findById(1L);
    }

    @Test
    void getLessonById_NotFound_ThrowsException() {
        // Arrange
        when(lessonRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> 
            lessonService.getLessonById(99L)
        );
        assertEquals("Lesson not found with id: 99", exception.getMessage());
        verify(lessonRepository).findById(99L);
    }

    @Test
    void createLesson_Success() {
        // Arrange
        LessonDTO inputDTO = new LessonDTO();
        inputDTO.setTopicId(1L);
        inputDTO.setTitle("New Lesson");
        inputDTO.setDescription("New Lesson Description");
        inputDTO.setContentType("article");
        inputDTO.setContentUrl("https://example.com/article.html");
        inputDTO.setDurationMinutes(45);
        inputDTO.setIsFree(false);

        Lesson existingLesson = new Lesson();
        existingLesson.setOrderNumber(2);

        List<Lesson> existingLessons = Arrays.asList(existingLesson);

        when(topicRepository.findById(1L)).thenReturn(Optional.of(testTopic));
        when(lessonRepository.findByTopic_TopicIdOrderByOrderNumberAsc(1L)).thenReturn(existingLessons);
        when(lessonRepository.save(any(Lesson.class))).thenReturn(testLesson);

        // Act
        LessonDTO result = lessonService.createLesson(inputDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Test Lesson", result.getTitle());
        verify(topicRepository).findById(1L);
        verify(lessonRepository).save(argThat(lesson -> 
            lesson.getTitle().equals("New Lesson") &&
            lesson.getTopic().equals(testTopic) &&
            lesson.getContentType() == ContentType.article &&
            lesson.getOrderNumber() == 3 // Should be next order number
        ));
    }

    @Test
    void createLesson_FirstLesson_OrderNumberOne() {
        // Arrange
        LessonDTO inputDTO = new LessonDTO();
        inputDTO.setTopicId(1L);
        inputDTO.setTitle("First Lesson");
        inputDTO.setDescription("First Lesson Description");
        inputDTO.setContentType("video");
        inputDTO.setContentUrl("https://example.com/video.mp4");
        inputDTO.setDurationMinutes(30);
        inputDTO.setIsFree(true);

        when(topicRepository.findById(1L)).thenReturn(Optional.of(testTopic));
        when(lessonRepository.findByTopic_TopicIdOrderByOrderNumberAsc(1L)).thenReturn(Arrays.asList()); // Empty list
        when(lessonRepository.save(any(Lesson.class))).thenReturn(testLesson);

        // Act
        LessonDTO result = lessonService.createLesson(inputDTO);

        // Assert
        assertNotNull(result);
        verify(lessonRepository).save(argThat(lesson -> 
            lesson.getOrderNumber() == 1 // Should be 1 for first lesson
        ));
    }

    @Test
    void createLesson_TopicNotFound_ThrowsException() {
        // Arrange
        LessonDTO inputDTO = new LessonDTO();
        inputDTO.setTopicId(99L);
        inputDTO.setTitle("New Lesson");

        when(topicRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> 
            lessonService.createLesson(inputDTO)
        );
        assertEquals("Topic not found with id: 99", exception.getMessage());
        verify(topicRepository).findById(99L);
        verify(lessonRepository, never()).save(any(Lesson.class));
    }

    @Test
    void createLesson_DefaultIsFreeToFalse() {
        // Arrange
        LessonDTO inputDTO = new LessonDTO();
        inputDTO.setTopicId(1L);
        inputDTO.setTitle("Paid Lesson");
        inputDTO.setDescription("Paid Lesson Description");
        inputDTO.setContentType("quiz");
        inputDTO.setContentUrl("https://example.com/quiz");
        inputDTO.setDurationMinutes(15);
        // isFree is null, should default to false

        when(topicRepository.findById(1L)).thenReturn(Optional.of(testTopic));
        when(lessonRepository.findByTopic_TopicIdOrderByOrderNumberAsc(1L)).thenReturn(Arrays.asList());
        when(lessonRepository.save(any(Lesson.class))).thenReturn(testLesson);        // Act
        LessonDTO result = lessonService.createLesson(inputDTO);

        // Assert
        assertNotNull(result);
        verify(lessonRepository).save(argThat(lesson -> 
            lesson.getIsFree() == false
        ));
    }

    @Test
    void updateLesson_Success() {
        // Arrange
        LessonDTO updateDTO = new LessonDTO();
        updateDTO.setTitle("Updated Lesson");
        updateDTO.setDescription("Updated Description");
        updateDTO.setContentType("exercise");
        updateDTO.setContentUrl("https://example.com/exercise");
        updateDTO.setDurationMinutes(60);
        updateDTO.setOrderNumber(2); // Changed order
        updateDTO.setIsFree(false);

        Lesson updatedLesson = new Lesson();
        updatedLesson.setLessonId(1L);
        updatedLesson.setTopic(testTopic);
        updatedLesson.setTitle("Updated Lesson");
        updatedLesson.setDescription("Updated Description");
        updatedLesson.setContentType(ContentType.exercise);
        updatedLesson.setContentUrl("https://example.com/exercise");
        updatedLesson.setDurationMinutes(60);
        updatedLesson.setOrderNumber(2);
        updatedLesson.setIsFree(false);

        when(lessonRepository.findById(1L)).thenReturn(Optional.of(testLesson));
        when(lessonRepository.findByTopic_TopicIdOrderByOrderNumberAsc(1L)).thenReturn(Arrays.asList(testLesson));
        when(lessonRepository.save(any(Lesson.class))).thenReturn(updatedLesson);

        // Act
        LessonDTO result = lessonService.updateLesson(1L, updateDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Updated Lesson", result.getTitle());
        assertEquals("Updated Description", result.getDescription());
        assertEquals("exercise", result.getContentType());
        assertEquals(60, result.getDurationMinutes());
        assertEquals(2, result.getOrderNumber());
        assertFalse(result.getIsFree());
        verify(lessonRepository).findById(1L);
        verify(lessonRepository).save(any(Lesson.class));
    }

    @Test
    void updateLesson_NotFound_ThrowsException() {
        // Arrange
        LessonDTO updateDTO = new LessonDTO();
        updateDTO.setTitle("Updated Lesson");

        when(lessonRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> 
            lessonService.updateLesson(99L, updateDTO)
        );
        assertEquals("Lesson not found with id: 99", exception.getMessage());
        verify(lessonRepository).findById(99L);
    }

    @Test
    void deleteLesson_Success() {
        // Arrange
        Lesson lesson1 = new Lesson();
        lesson1.setLessonId(1L);
        lesson1.setTopic(testTopic);
        lesson1.setOrderNumber(1);

        Lesson lesson2 = new Lesson();
        lesson2.setLessonId(2L);
        lesson2.setTopic(testTopic);
        lesson2.setOrderNumber(2);

        Lesson lesson3 = new Lesson();
        lesson3.setLessonId(3L);
        lesson3.setTopic(testTopic);
        lesson3.setOrderNumber(3);

        List<Lesson> laterLessons = Arrays.asList(lesson2, lesson3);

        when(lessonRepository.findById(1L)).thenReturn(Optional.of(lesson1));
        when(lessonRepository.findByTopic_TopicIdAndOrderNumberGreaterThanOrderByOrderNumberAsc(1L, 1))
            .thenReturn(laterLessons);

        // Act
        lessonService.deleteLesson(1L);

        // Assert
        verify(lessonRepository).findById(1L);
        verify(lessonRepository).delete(lesson1);
        verify(lessonRepository).findByTopic_TopicIdAndOrderNumberGreaterThanOrderByOrderNumberAsc(1L, 1);
        // Verify that later lessons have their order numbers decremented
        verify(lessonRepository, times(2)).save(any(Lesson.class));
    }

    @Test
    void deleteLesson_NotFound_ThrowsException() {
        // Arrange
        when(lessonRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> 
            lessonService.deleteLesson(99L)
        );
        assertEquals("Lesson not found with id: 99", exception.getMessage());
        verify(lessonRepository).findById(99L);
        verify(lessonRepository, never()).delete(any(Lesson.class));
    }

    @Test
    void getNextOrderNumber_EmptyList_ReturnsOne() {
        // This test verifies the private method indirectly through createLesson
        LessonDTO inputDTO = new LessonDTO();
        inputDTO.setTopicId(1L);
        inputDTO.setTitle("First Lesson");
        inputDTO.setContentType("video");
        inputDTO.setDurationMinutes(30);

        when(topicRepository.findById(1L)).thenReturn(Optional.of(testTopic));
        when(lessonRepository.findByTopic_TopicIdOrderByOrderNumberAsc(1L)).thenReturn(Arrays.asList());
        when(lessonRepository.save(any(Lesson.class))).thenReturn(testLesson);

        // Act
        lessonService.createLesson(inputDTO);

        // Assert
        verify(lessonRepository).save(argThat(lesson -> 
            lesson.getOrderNumber() == 1
        ));
    }

    @Test
    void getNextOrderNumber_WithExistingLessons_ReturnsCorrectOrder() {
        // This test verifies the private method indirectly through createLesson
        LessonDTO inputDTO = new LessonDTO();
        inputDTO.setTopicId(1L);
        inputDTO.setTitle("New Lesson");
        inputDTO.setContentType("video");
        inputDTO.setDurationMinutes(30);

        Lesson existingLesson1 = new Lesson();
        existingLesson1.setOrderNumber(1);
        Lesson existingLesson2 = new Lesson();
        existingLesson2.setOrderNumber(2);

        List<Lesson> existingLessons = Arrays.asList(existingLesson1, existingLesson2);

        when(topicRepository.findById(1L)).thenReturn(Optional.of(testTopic));
        when(lessonRepository.findByTopic_TopicIdOrderByOrderNumberAsc(1L)).thenReturn(existingLessons);
        when(lessonRepository.save(any(Lesson.class))).thenReturn(testLesson);

        // Act
        lessonService.createLesson(inputDTO);

        // Assert
        verify(lessonRepository).save(argThat(lesson -> 
            lesson.getOrderNumber() == 3 // Should be last order + 1
        ));
    }

    @Test
    void convertToDTO_Success() {
        // This test verifies the private convertToDTO method indirectly through getLessonById
        when(lessonRepository.findById(1L)).thenReturn(Optional.of(testLesson));

        // Act
        LessonDTO result = lessonService.getLessonById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getLessonId());
        assertEquals(1L, result.getTopicId());
        assertEquals("Test Lesson", result.getTitle());
        assertEquals("Test Lesson Description", result.getDescription());
        assertEquals("video", result.getContentType());
        assertEquals("https://example.com/video.mp4", result.getContentUrl());
        assertEquals(30, result.getDurationMinutes());
        assertEquals(1, result.getOrderNumber());
        assertTrue(result.getIsFree());
        assertNotNull(result.getCreatedAt());
        assertNotNull(result.getUpdatedAt());
    }
}
