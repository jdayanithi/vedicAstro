package com.vedicastrology.service;

import com.vedicastrology.dto.TopicDTO;
import com.vedicastrology.entity.Course;
import com.vedicastrology.entity.Topic;
import com.vedicastrology.repository.CourseRepository;
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
class TopicServiceTest {

    @Mock
    private TopicRepository topicRepository;

    @Mock
    private CourseRepository courseRepository;

    @InjectMocks
    private TopicService topicService;

    private Course testCourse;
    private Topic testTopic;
    private TopicDTO testTopicDTO;

    @BeforeEach
    void setUp() {
        // Setup test course
        testCourse = new Course();
        testCourse.setCourseId(1L);
        testCourse.setTitle("Test Course");
        testCourse.setDescription("Test Course Description");

        // Setup test topic
        testTopic = new Topic();
        testTopic.setTopicId(1L);
        testTopic.setCourse(testCourse);
        testTopic.setTitle("Test Topic");
        testTopic.setDescription("Test Topic Description");
        testTopic.setOrderNumber(1);
        testTopic.setCreatedAt(LocalDateTime.now());
        testTopic.setUpdatedAt(LocalDateTime.now());

        // Setup test DTO
        testTopicDTO = new TopicDTO();
        testTopicDTO.setTopicId(1L);
        testTopicDTO.setCourseId(1L);
        testTopicDTO.setTitle("Test Topic");
        testTopicDTO.setDescription("Test Topic Description");
        testTopicDTO.setOrderNumber(1);
        testTopicDTO.setCreatedAt(LocalDateTime.now());
        testTopicDTO.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    void getAllTopics_Success() {
        // Arrange
        List<Topic> topics = Arrays.asList(testTopic);
        when(topicRepository.findAll()).thenReturn(topics);

        // Act
        List<TopicDTO> result = topicService.getAllTopics();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Topic", result.get(0).getTitle());
        assertEquals(1L, result.get(0).getCourseId());
        verify(topicRepository).findAll();
    }

    @Test
    void getAllTopicsByCourseId_Success() {
        // Arrange
        List<Topic> topics = Arrays.asList(testTopic);
        when(topicRepository.findByCourse_CourseIdOrderByOrderNumberAsc(1L)).thenReturn(topics);

        // Act
        List<TopicDTO> result = topicService.getAllTopicsByCourseId(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Topic", result.get(0).getTitle());
        assertEquals(1L, result.get(0).getCourseId());
        verify(topicRepository).findByCourse_CourseIdOrderByOrderNumberAsc(1L);
    }

    @Test
    void getTopicById_Success() {
        // Arrange
        when(topicRepository.findById(1L)).thenReturn(Optional.of(testTopic));

        // Act
        TopicDTO result = topicService.getTopicById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getTopicId());
        assertEquals(1L, result.getCourseId());
        assertEquals("Test Topic", result.getTitle());
        assertEquals("Test Topic Description", result.getDescription());
        assertEquals(1, result.getOrderNumber());
        verify(topicRepository).findById(1L);
    }

    @Test
    void getTopicById_NotFound_ThrowsException() {
        // Arrange
        when(topicRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> 
            topicService.getTopicById(99L)
        );
        assertEquals("Topic not found with id: 99", exception.getMessage());
        verify(topicRepository).findById(99L);
    }

    @Test
    void createTopic_Success() {
        // Arrange
        TopicDTO inputDTO = new TopicDTO();
        inputDTO.setCourseId(1L);
        inputDTO.setTitle("New Topic");
        inputDTO.setDescription("New Topic Description");

        Topic existingTopic = new Topic();
        existingTopic.setOrderNumber(2);
        List<Topic> existingTopics = Arrays.asList(existingTopic);

        when(courseRepository.findById(1L)).thenReturn(Optional.of(testCourse));
        when(topicRepository.findByCourse_CourseIdOrderByOrderNumberAsc(1L)).thenReturn(existingTopics);
        when(topicRepository.save(any(Topic.class))).thenReturn(testTopic);

        // Act
        TopicDTO result = topicService.createTopic(inputDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Test Topic", result.getTitle());
        verify(courseRepository).findById(1L);
        verify(topicRepository).save(argThat(topic -> 
            topic.getTitle().equals("New Topic") &&
            topic.getCourse().equals(testCourse) &&
            topic.getOrderNumber() == 3 // Should be next order number
        ));
    }

    @Test
    void createTopic_FirstTopic_OrderNumberOne() {
        // Arrange
        TopicDTO inputDTO = new TopicDTO();
        inputDTO.setCourseId(1L);
        inputDTO.setTitle("First Topic");
        inputDTO.setDescription("First Topic Description");

        when(courseRepository.findById(1L)).thenReturn(Optional.of(testCourse));
        when(topicRepository.findByCourse_CourseIdOrderByOrderNumberAsc(1L)).thenReturn(Arrays.asList()); // Empty list
        when(topicRepository.save(any(Topic.class))).thenReturn(testTopic);

        // Act
        TopicDTO result = topicService.createTopic(inputDTO);

        // Assert
        assertNotNull(result);
        verify(topicRepository).save(argThat(topic -> 
            topic.getOrderNumber() == 1 // Should be 1 for first topic
        ));
    }

    @Test
    void createTopic_CourseNotFound_ThrowsException() {
        // Arrange
        TopicDTO inputDTO = new TopicDTO();
        inputDTO.setCourseId(99L);
        inputDTO.setTitle("New Topic");

        when(courseRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> 
            topicService.createTopic(inputDTO)
        );
        assertEquals("Course not found with id: 99", exception.getMessage());
        verify(courseRepository).findById(99L);
        verify(topicRepository, never()).save(any(Topic.class));
    }

    @Test
    void updateTopic_Success() {
        // Arrange
        TopicDTO updateDTO = new TopicDTO();
        updateDTO.setTitle("Updated Topic");
        updateDTO.setDescription("Updated Description");
        updateDTO.setOrderNumber(2); // Changed order

        Topic updatedTopic = new Topic();
        updatedTopic.setTopicId(1L);
        updatedTopic.setCourse(testCourse);
        updatedTopic.setTitle("Updated Topic");
        updatedTopic.setDescription("Updated Description");
        updatedTopic.setOrderNumber(2);

        when(topicRepository.findById(1L)).thenReturn(Optional.of(testTopic));
        when(topicRepository.findByCourse_CourseIdOrderByOrderNumberAsc(1L)).thenReturn(Arrays.asList(testTopic));
        when(topicRepository.save(any(Topic.class))).thenReturn(updatedTopic);

        // Act
        TopicDTO result = topicService.updateTopic(1L, updateDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Updated Topic", result.getTitle());
        assertEquals("Updated Description", result.getDescription());
        assertEquals(2, result.getOrderNumber());
        verify(topicRepository).findById(1L);
        verify(topicRepository).save(any(Topic.class));
    }

    @Test
    void updateTopic_NotFound_ThrowsException() {
        // Arrange
        TopicDTO updateDTO = new TopicDTO();
        updateDTO.setTitle("Updated Topic");

        when(topicRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> 
            topicService.updateTopic(99L, updateDTO)
        );
        assertEquals("Topic not found with id: 99", exception.getMessage());
        verify(topicRepository).findById(99L);
    }

    @Test
    void deleteTopic_Success() {
        // Arrange
        Topic topic1 = new Topic();
        topic1.setTopicId(1L);
        topic1.setCourse(testCourse);
        topic1.setOrderNumber(1);

        Topic topic2 = new Topic();
        topic2.setTopicId(2L);
        topic2.setCourse(testCourse);
        topic2.setOrderNumber(2);

        Topic topic3 = new Topic();
        topic3.setTopicId(3L);
        topic3.setCourse(testCourse);
        topic3.setOrderNumber(3);

        List<Topic> laterTopics = Arrays.asList(topic2, topic3);

        when(topicRepository.findById(1L)).thenReturn(Optional.of(topic1));
        when(topicRepository.findByCourse_CourseIdAndOrderNumberGreaterThanOrderByOrderNumberAsc(1L, 1))
            .thenReturn(laterTopics);

        // Act
        topicService.deleteTopic(1L);

        // Assert
        verify(topicRepository).findById(1L);
        verify(topicRepository).findByCourse_CourseIdAndOrderNumberGreaterThanOrderByOrderNumberAsc(1L, 1);
        verify(topicRepository).deleteById(1L);
        // Verify that later topics have their order numbers decremented
        verify(topicRepository, times(2)).save(any(Topic.class));
    }

    @Test
    void deleteTopic_NotFound_ThrowsException() {
        // Arrange
        when(topicRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> 
            topicService.deleteTopic(99L)
        );
        assertEquals("Topic not found with id: 99", exception.getMessage());
        verify(topicRepository).findById(99L);
        verify(topicRepository, never()).deleteById(anyLong());
    }

    @Test
    void getNextOrderNumber_EmptyList_ReturnsOne() {
        // This test verifies the private method indirectly through createTopic
        TopicDTO inputDTO = new TopicDTO();
        inputDTO.setCourseId(1L);
        inputDTO.setTitle("First Topic");
        inputDTO.setDescription("First Topic Description");

        when(courseRepository.findById(1L)).thenReturn(Optional.of(testCourse));
        when(topicRepository.findByCourse_CourseIdOrderByOrderNumberAsc(1L)).thenReturn(Arrays.asList());
        when(topicRepository.save(any(Topic.class))).thenReturn(testTopic);

        // Act
        TopicDTO result = topicService.createTopic(inputDTO);

        // Assert
        assertNotNull(result);
        verify(topicRepository).save(argThat(topic -> 
            topic.getOrderNumber() == 1
        ));
    }

    @Test
    void getNextOrderNumber_WithExistingTopics_ReturnsCorrectOrder() {
        // This test verifies the private method indirectly through createTopic
        TopicDTO inputDTO = new TopicDTO();
        inputDTO.setCourseId(1L);
        inputDTO.setTitle("New Topic");
        inputDTO.setDescription("New Topic Description");

        Topic existingTopic1 = new Topic();
        existingTopic1.setOrderNumber(1);
        Topic existingTopic2 = new Topic();
        existingTopic2.setOrderNumber(2);

        List<Topic> existingTopics = Arrays.asList(existingTopic1, existingTopic2);

        when(courseRepository.findById(1L)).thenReturn(Optional.of(testCourse));
        when(topicRepository.findByCourse_CourseIdOrderByOrderNumberAsc(1L)).thenReturn(existingTopics);
        when(topicRepository.save(any(Topic.class))).thenReturn(testTopic);

        // Act
        TopicDTO result = topicService.createTopic(inputDTO);

        // Assert
        assertNotNull(result);
        verify(topicRepository).save(argThat(topic -> 
            topic.getOrderNumber() == 3 // Should be last order + 1
        ));
    }

    @Test
    void reorderTopics_MovingDown_Success() {
        // This test verifies the private method indirectly through updateTopic
        TopicDTO updateDTO = new TopicDTO();
        updateDTO.setTitle("Test Topic");
        updateDTO.setDescription("Test Topic Description");
        updateDTO.setOrderNumber(3); // Moving from 1 to 3

        Topic topic1 = new Topic();
        topic1.setOrderNumber(1);
        Topic topic2 = new Topic();
        topic2.setOrderNumber(2);
        Topic topic3 = new Topic();
        topic3.setOrderNumber(3);

        List<Topic> courseTopics = Arrays.asList(topic1, topic2, topic3);

        when(topicRepository.findById(1L)).thenReturn(Optional.of(testTopic));
        when(topicRepository.findByCourse_CourseIdOrderByOrderNumberAsc(1L)).thenReturn(courseTopics);
        when(topicRepository.save(any(Topic.class))).thenReturn(testTopic);

        // Act
        TopicDTO result = topicService.updateTopic(1L, updateDTO);

        // Assert
        assertNotNull(result);
        // Should save multiple topics due to reordering
        verify(topicRepository, atLeastOnce()).save(any(Topic.class));
    }

    @Test
    void convertToDTO_Success() {
        // This test verifies the private convertToDTO method indirectly through getTopicById
        when(topicRepository.findById(1L)).thenReturn(Optional.of(testTopic));

        // Act
        TopicDTO result = topicService.getTopicById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getTopicId());
        assertEquals(1L, result.getCourseId());
        assertEquals("Test Topic", result.getTitle());
        assertEquals("Test Topic Description", result.getDescription());
        assertEquals(1, result.getOrderNumber());
        assertNotNull(result.getCreatedAt());
        assertNotNull(result.getUpdatedAt());
    }
}
