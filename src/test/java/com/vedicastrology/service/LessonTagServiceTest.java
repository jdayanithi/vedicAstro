package com.vedicastrology.service;

import com.vedicastrology.dto.LessonTagDTO;
import com.vedicastrology.entity.Lesson;
import com.vedicastrology.entity.LessonTag;
import com.vedicastrology.entity.Tag;
import com.vedicastrology.repository.LessonRepository;
import com.vedicastrology.repository.LessonTagRepository;
import com.vedicastrology.repository.TagRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LessonTagServiceTest {

    @Mock
    private LessonTagRepository lessonTagRepository;

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private TagRepository tagRepository;

    @InjectMocks
    private LessonTagService lessonTagService;

    private Lesson testLesson;
    private Tag testTag;
    private LessonTag testLessonTag;
    private LessonTagDTO testLessonTagDTO;

    @BeforeEach
    void setUp() {
        // Setup test lesson
        testLesson = new Lesson();
        testLesson.setLessonId(1L);
        testLesson.setTitle("Test Lesson");

        // Setup test tag
        testTag = new Tag();
        testTag.setTagId(1L);
        testTag.setTagName("Test Tag");

        // Setup test lesson tag
        testLessonTag = new LessonTag();
        testLessonTag.setLessonTagId(1L);
        testLessonTag.setLesson(testLesson);
        testLessonTag.setTag(testTag);
        testLessonTag.setRelevanceScore(5);

        // Setup test DTO
        testLessonTagDTO = new LessonTagDTO();
        testLessonTagDTO.setLessonTagId(1L);
        testLessonTagDTO.setLessonId(1L);
        testLessonTagDTO.setTagId(1L);
        testLessonTagDTO.setTagName("Test Tag");
        testLessonTagDTO.setRelevanceScore(5);
    }

    @Test
    void getAllLessonTags_Success() {
        // Arrange
        List<LessonTag> lessonTags = Arrays.asList(testLessonTag);
        when(lessonTagRepository.findAll()).thenReturn(lessonTags);

        // Act
        List<LessonTagDTO> result = lessonTagService.getAllLessonTags();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Tag", result.get(0).getTagName());
        assertEquals(5, result.get(0).getRelevanceScore());
        verify(lessonTagRepository).findAll();
    }

    @Test
    void getTagsByLessonId_Success() {
        // Arrange
        List<LessonTag> lessonTags = Arrays.asList(testLessonTag);
        when(lessonTagRepository.findByLesson_LessonId(1L)).thenReturn(lessonTags);

        // Act
        List<LessonTagDTO> result = lessonTagService.getTagsByLessonId(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).getLessonId());
        assertEquals(1L, result.get(0).getTagId());
        assertEquals("Test Tag", result.get(0).getTagName());
        verify(lessonTagRepository).findByLesson_LessonId(1L);
    }

    @Test
    void getLessonsByTagId_Success() {
        // Arrange
        List<LessonTag> lessonTags = Arrays.asList(testLessonTag);
        when(lessonTagRepository.findByTag_TagId(1L)).thenReturn(lessonTags);

        // Act
        List<LessonTagDTO> result = lessonTagService.getLessonsByTagId(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).getLessonId());
        assertEquals(1L, result.get(0).getTagId());
        verify(lessonTagRepository).findByTag_TagId(1L);
    }

    @Test
    void getLessonTag_Success() {
        // Arrange
        when(lessonTagRepository.findById(1L)).thenReturn(Optional.of(testLessonTag));

        // Act
        LessonTagDTO result = lessonTagService.getLessonTag(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getLessonTagId());
        assertEquals(1L, result.getLessonId());
        assertEquals(1L, result.getTagId());
        assertEquals("Test Tag", result.getTagName());
        assertEquals(5, result.getRelevanceScore());
        verify(lessonTagRepository).findById(1L);
    }

    @Test
    void getLessonTag_NotFound_ReturnsNull() {
        // Arrange
        when(lessonTagRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        LessonTagDTO result = lessonTagService.getLessonTag(99L);

        // Assert
        assertNull(result);
        verify(lessonTagRepository).findById(99L);
    }

    @Test
    void createLessonTag_Success() {
        // Arrange
        LessonTagDTO inputDTO = new LessonTagDTO();
        inputDTO.setLessonId(1L);
        inputDTO.setTagId(1L);
        inputDTO.setRelevanceScore(8);

        when(lessonTagRepository.existsByLesson_LessonIdAndTag_TagId(1L, 1L)).thenReturn(false);
        when(lessonRepository.findById(1L)).thenReturn(Optional.of(testLesson));
        when(tagRepository.findById(1L)).thenReturn(Optional.of(testTag));
        when(lessonTagRepository.save(any(LessonTag.class))).thenReturn(testLessonTag);

        // Act
        LessonTagDTO result = lessonTagService.createLessonTag(inputDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Test Tag", result.getTagName());
        verify(lessonTagRepository).existsByLesson_LessonIdAndTag_TagId(1L, 1L);
        verify(lessonRepository).findById(1L);
        verify(tagRepository).findById(1L);
        verify(lessonTagRepository).save(argThat(lessonTag -> 
            lessonTag.getLesson().equals(testLesson) &&
            lessonTag.getTag().equals(testTag) &&
            lessonTag.getRelevanceScore() == 8
        ));
    }

    @Test
    void createLessonTag_DefaultRelevanceScore() {
        // Arrange
        LessonTagDTO inputDTO = new LessonTagDTO();
        inputDTO.setLessonId(1L);
        inputDTO.setTagId(1L);
        // relevanceScore is null, should default to 1

        when(lessonTagRepository.existsByLesson_LessonIdAndTag_TagId(1L, 1L)).thenReturn(false);
        when(lessonRepository.findById(1L)).thenReturn(Optional.of(testLesson));
        when(tagRepository.findById(1L)).thenReturn(Optional.of(testTag));
        when(lessonTagRepository.save(any(LessonTag.class))).thenReturn(testLessonTag);

        // Act
        LessonTagDTO result = lessonTagService.createLessonTag(inputDTO);

        // Assert
        assertNotNull(result);
        verify(lessonTagRepository).save(argThat(lessonTag -> 
            lessonTag.getRelevanceScore() == 1 // Should default to 1
        ));
    }

    @Test
    void createLessonTag_AlreadyExists_ThrowsException() {
        // Arrange
        LessonTagDTO inputDTO = new LessonTagDTO();
        inputDTO.setLessonId(1L);
        inputDTO.setTagId(1L);

        when(lessonTagRepository.existsByLesson_LessonIdAndTag_TagId(1L, 1L)).thenReturn(true);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> 
            lessonTagService.createLessonTag(inputDTO)
        );
        assertEquals("LessonTag already exists for this lesson and tag", exception.getMessage());
        verify(lessonTagRepository).existsByLesson_LessonIdAndTag_TagId(1L, 1L);
        verify(lessonTagRepository, never()).save(any(LessonTag.class));
    }

    @Test
    void createLessonTag_LessonNotFound_ThrowsException() {
        // Arrange
        LessonTagDTO inputDTO = new LessonTagDTO();
        inputDTO.setLessonId(99L);
        inputDTO.setTagId(1L);

        when(lessonTagRepository.existsByLesson_LessonIdAndTag_TagId(99L, 1L)).thenReturn(false);
        when(lessonRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> 
            lessonTagService.createLessonTag(inputDTO)
        );
        verify(lessonRepository).findById(99L);
        verify(lessonTagRepository, never()).save(any(LessonTag.class));
    }

    @Test
    void createLessonTag_TagNotFound_ThrowsException() {
        // Arrange
        LessonTagDTO inputDTO = new LessonTagDTO();
        inputDTO.setLessonId(1L);
        inputDTO.setTagId(99L);

        when(lessonTagRepository.existsByLesson_LessonIdAndTag_TagId(1L, 99L)).thenReturn(false);
        when(lessonRepository.findById(1L)).thenReturn(Optional.of(testLesson));
        when(tagRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> 
            lessonTagService.createLessonTag(inputDTO)
        );
        verify(lessonRepository).findById(1L);
        verify(tagRepository).findById(99L);
        verify(lessonTagRepository, never()).save(any(LessonTag.class));
    }

    @Test
    void updateLessonTag_Success() {
        // Arrange
        LessonTagDTO updateDTO = new LessonTagDTO();
        updateDTO.setTagId(2L);
        updateDTO.setRelevanceScore(10);

        Tag newTag = new Tag();
        newTag.setTagId(2L);
        newTag.setTagName("Updated Tag");

        LessonTag updatedLessonTag = new LessonTag();
        updatedLessonTag.setLessonTagId(1L);
        updatedLessonTag.setLesson(testLesson);
        updatedLessonTag.setTag(newTag);
        updatedLessonTag.setRelevanceScore(10);

        when(lessonTagRepository.findById(1L)).thenReturn(Optional.of(testLessonTag));
        when(tagRepository.findById(2L)).thenReturn(Optional.of(newTag));
        when(lessonTagRepository.save(any(LessonTag.class))).thenReturn(updatedLessonTag);

        // Act
        LessonTagDTO result = lessonTagService.updateLessonTag(1L, updateDTO);

        // Assert
        assertNotNull(result);
        assertEquals(2L, result.getTagId());
        assertEquals(10, result.getRelevanceScore());
        verify(lessonTagRepository).findById(1L);
        verify(tagRepository).findById(2L);
        verify(lessonTagRepository).save(any(LessonTag.class));
    }

    @Test
    void updateLessonTag_OnlyRelevanceScore() {
        // Arrange
        LessonTagDTO updateDTO = new LessonTagDTO();
        updateDTO.setRelevanceScore(7);
        // tagId is null, should not update tag

        when(lessonTagRepository.findById(1L)).thenReturn(Optional.of(testLessonTag));
        when(lessonTagRepository.save(any(LessonTag.class))).thenReturn(testLessonTag);

        // Act
        LessonTagDTO result = lessonTagService.updateLessonTag(1L, updateDTO);

        // Assert
        assertNotNull(result);
        verify(lessonTagRepository).findById(1L);
        verify(tagRepository, never()).findById(anyLong());
        verify(lessonTagRepository).save(argThat(lessonTag -> 
            lessonTag.getRelevanceScore() == 7
        ));
    }

    @Test
    void updateLessonTag_NotFound_ThrowsException() {
        // Arrange
        LessonTagDTO updateDTO = new LessonTagDTO();
        updateDTO.setRelevanceScore(5);

        when(lessonTagRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> 
            lessonTagService.updateLessonTag(99L, updateDTO)
        );
        verify(lessonTagRepository).findById(99L);
        verify(lessonTagRepository, never()).save(any(LessonTag.class));
    }

    @Test
    void deleteLessonTag_Success() {
        // Act
        lessonTagService.deleteLessonTag(1L);

        // Assert
        verify(lessonTagRepository).deleteById(1L);
    }

    @Test
    void deleteByLessonIdAndTagId_Success() {
        // Act
        lessonTagService.deleteByLessonIdAndTagId(1L, 1L);

        // Assert
        verify(lessonTagRepository).deleteByLesson_LessonIdAndTag_TagId(1L, 1L);
    }

    @Test
    void toDTO_Success() {
        // This test verifies the private toDTO method indirectly through getLessonTag
        when(lessonTagRepository.findById(1L)).thenReturn(Optional.of(testLessonTag));

        // Act
        LessonTagDTO result = lessonTagService.getLessonTag(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getLessonTagId());
        assertEquals(1L, result.getLessonId());
        assertEquals(1L, result.getTagId());
        assertEquals("Test Tag", result.getTagName());
        assertEquals(5, result.getRelevanceScore());
    }
}
