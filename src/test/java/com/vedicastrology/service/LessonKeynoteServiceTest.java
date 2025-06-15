package com.vedicastrology.service;

import com.vedicastrology.dto.LessonKeynoteDTO;
import com.vedicastrology.entity.KeynoteContentType;
import com.vedicastrology.entity.Lesson;
import com.vedicastrology.entity.LessonKeynote;
import com.vedicastrology.repository.LessonKeynoteRepository;
import com.vedicastrology.repository.LessonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LessonKeynoteServiceTest {

    @Mock
    private LessonKeynoteRepository lessonKeynoteRepository;

    @Mock
    private LessonRepository lessonRepository;

    @InjectMocks
    private LessonKeynoteService lessonKeynoteService;

    private Lesson testLesson;
    private LessonKeynote testKeynote;
    private LessonKeynoteDTO testKeynoteDTO;

    @BeforeEach
    void setUp() {
        // Setup test lesson
        testLesson = new Lesson();
        testLesson.setLessonId(1L);
        testLesson.setTitle("Test Lesson");
        testLesson.setDescription("Test Lesson Description");

        // Setup test keynote
        testKeynote = new LessonKeynote();
        testKeynote.setKeynoteId(1L);
        testKeynote.setLessonId(1L);
        testKeynote.setTitle("Test Keynote");
        testKeynote.setContent("Test keynote content");        testKeynote.setContentType(KeynoteContentType.text);
        testKeynote.setOrderSequence(1);
        testKeynote.setIsImportant(true);
        testKeynote.setHasVisualAid(false);
        testKeynote.setVisualAidUrl(null);
        testKeynote.setRelatedPlanet("Mars");
        testKeynote.setRelatedZodiac("Aries");
        testKeynote.setCreatedAt(LocalDateTime.now());
        testKeynote.setUpdatedAt(LocalDateTime.now());
        testKeynote.setLesson(testLesson);

        // Setup test DTO
        testKeynoteDTO = new LessonKeynoteDTO();
        testKeynoteDTO.setKeynoteId(1L);
        testKeynoteDTO.setLessonId(1L);
        testKeynoteDTO.setTitle("Test Keynote");
        testKeynoteDTO.setContent("Test keynote content");
        testKeynoteDTO.setContentType(KeynoteContentType.text);
        testKeynoteDTO.setOrderSequence(1);
        testKeynoteDTO.setIsImportant(true);
        testKeynoteDTO.setHasVisualAid(false);
        testKeynoteDTO.setVisualAidUrl(null);
        testKeynoteDTO.setRelatedPlanet("Mars");
        testKeynoteDTO.setRelatedZodiac("Aries");
        testKeynoteDTO.setCreatedAt(LocalDateTime.now());
        testKeynoteDTO.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    void createKeynote_Success() {
        // Arrange
        LessonKeynoteDTO inputDTO = new LessonKeynoteDTO();
        inputDTO.setLessonId(1L);
        inputDTO.setTitle("New Keynote");
        inputDTO.setContent("New keynote content");        inputDTO.setContentType(KeynoteContentType.bullet_points);
        inputDTO.setIsImportant(false);
        inputDTO.setHasVisualAid(true);
        inputDTO.setVisualAidUrl("https://example.com/visual.png");
        inputDTO.setRelatedPlanet("Venus");
        inputDTO.setRelatedZodiac("Taurus");

        when(lessonRepository.existsById(1L)).thenReturn(true);
        when(lessonKeynoteRepository.findMaxOrderSequenceByLessonId(1L)).thenReturn(2);
        when(lessonKeynoteRepository.save(any(LessonKeynote.class))).thenReturn(testKeynote);

        // Act
        LessonKeynoteDTO result = lessonKeynoteService.createKeynote(inputDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Test Keynote", result.getTitle());
        verify(lessonRepository).existsById(1L);
        verify(lessonKeynoteRepository).save(argThat(keynote -> 
            keynote.getTitle().equals("New Keynote") &&
            keynote.getLessonId().equals(1L) &&
            keynote.getContentType() == KeynoteContentType.bullet_points &&
            keynote.getOrderSequence() == 3 && // Should be max + 1
            keynote.getHasVisualAid() == true &&
            keynote.getRelatedPlanet().equals("Venus")
        ));
    }

    @Test
    void createKeynote_LessonNotFound_ThrowsException() {
        // Arrange
        LessonKeynoteDTO inputDTO = new LessonKeynoteDTO();
        inputDTO.setLessonId(99L);
        inputDTO.setTitle("New Keynote");

        when(lessonRepository.existsById(99L)).thenReturn(false);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> 
            lessonKeynoteService.createKeynote(inputDTO)
        );
        assertEquals("Lesson not found with ID: 99", exception.getMessage());
        verify(lessonRepository).existsById(99L);
        verify(lessonKeynoteRepository, never()).save(any(LessonKeynote.class));
    }

    @Test
    void createKeynote_AutoAssignOrderSequence() {
        // Arrange
        LessonKeynoteDTO inputDTO = new LessonKeynoteDTO();
        inputDTO.setLessonId(1L);
        inputDTO.setTitle("First Keynote");
        inputDTO.setContent("First keynote content");        inputDTO.setContentType(KeynoteContentType.text);
        // orderSequence is null, should be auto-assigned

        when(lessonRepository.existsById(1L)).thenReturn(true);
        when(lessonKeynoteRepository.findMaxOrderSequenceByLessonId(1L)).thenReturn(0); // No existing keynotes
        when(lessonKeynoteRepository.save(any(LessonKeynote.class))).thenReturn(testKeynote);

        // Act
        LessonKeynoteDTO result = lessonKeynoteService.createKeynote(inputDTO);

        // Assert
        assertNotNull(result);
        verify(lessonKeynoteRepository).save(argThat(keynote -> 
            keynote.getOrderSequence() == 1 // Should be 0 + 1
        ));
    }

    @Test
    void getKeynoteById_Success() {
        // Arrange
        when(lessonKeynoteRepository.findById(1L)).thenReturn(Optional.of(testKeynote));

        // Act
        LessonKeynoteDTO result = lessonKeynoteService.getKeynoteById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getKeynoteId());
        assertEquals(1L, result.getLessonId());
        assertEquals("Test Keynote", result.getTitle());
        assertEquals("Test keynote content", result.getContent());
        assertEquals(KeynoteContentType.text, result.getContentType());
        assertEquals(1, result.getOrderSequence());
        assertTrue(result.getIsImportant());
        assertFalse(result.getHasVisualAid());
        assertEquals("Mars", result.getRelatedPlanet());
        assertEquals("Aries", result.getRelatedZodiac());
        verify(lessonKeynoteRepository).findById(1L);
    }

    @Test
    void getKeynoteById_NotFound_ThrowsException() {
        // Arrange
        when(lessonKeynoteRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> 
            lessonKeynoteService.getKeynoteById(99L)
        );
        assertEquals("Keynote not found with ID: 99", exception.getMessage());
        verify(lessonKeynoteRepository).findById(99L);
    }

    @Test
    void getAllKeynotes_Success() {
        // Arrange
        List<LessonKeynote> keynotes = Arrays.asList(testKeynote);
        when(lessonKeynoteRepository.findAll()).thenReturn(keynotes);

        // Act
        List<LessonKeynoteDTO> result = lessonKeynoteService.getAllKeynotes();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Keynote", result.get(0).getTitle());
        verify(lessonKeynoteRepository).findAll();
    }

    @Test
    void getKeynotesByLessonId_Success() {
        // Arrange
        List<LessonKeynote> keynotes = Arrays.asList(testKeynote);
        when(lessonKeynoteRepository.findByLessonIdOrderByOrderSequence(1L)).thenReturn(keynotes);

        // Act
        List<LessonKeynoteDTO> result = lessonKeynoteService.getKeynotesByLessonId(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Keynote", result.get(0).getTitle());
        assertEquals(1L, result.get(0).getLessonId());
        verify(lessonKeynoteRepository).findByLessonIdOrderByOrderSequence(1L);
    }

    @Test
    void getImportantKeynotesByLessonId_Success() {
        // Arrange
        List<LessonKeynote> importantKeynotes = Arrays.asList(testKeynote);
        when(lessonKeynoteRepository.findImportantKeynotesByLessonId(1L)).thenReturn(importantKeynotes);

        // Act
        List<LessonKeynoteDTO> result = lessonKeynoteService.getImportantKeynotesByLessonId(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertTrue(result.get(0).getIsImportant());
        verify(lessonKeynoteRepository).findImportantKeynotesByLessonId(1L);
    }

    @Test
    void getKeynotesByContentType_Success() {
        // Arrange
        List<LessonKeynote> keynotes = Arrays.asList(testKeynote);
        when(lessonKeynoteRepository.findByLessonIdAndContentType(1L, "text")).thenReturn(keynotes);

        // Act
        List<LessonKeynoteDTO> result = lessonKeynoteService.getKeynotesByContentType(1L, "text");

        // Assert        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(KeynoteContentType.text, result.get(0).getContentType());
        verify(lessonKeynoteRepository).findByLessonIdAndContentType(1L, "text");
    }

    @Test
    void getKeynotesWithVisualAids_Success() {
        // Arrange
        LessonKeynote keynoteWithVisual = new LessonKeynote();
        keynoteWithVisual.setKeynoteId(2L);
        keynoteWithVisual.setLessonId(1L);
        keynoteWithVisual.setTitle("Visual Keynote");
        keynoteWithVisual.setContent("Keynote with visual aid");
        keynoteWithVisual.setContentType(KeynoteContentType.bullet_points);
        keynoteWithVisual.setHasVisualAid(true);
        keynoteWithVisual.setVisualAidUrl("https://example.com/visual.png");

        List<LessonKeynote> keynotesWithVisuals = Arrays.asList(keynoteWithVisual);
        when(lessonKeynoteRepository.findKeynotesWithVisualAidsByLessonId(1L)).thenReturn(keynotesWithVisuals);

        // Act
        List<LessonKeynoteDTO> result = lessonKeynoteService.getKeynotesWithVisualAids(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertTrue(result.get(0).getHasVisualAid());
        assertNotNull(result.get(0).getVisualAidUrl());
        verify(lessonKeynoteRepository).findKeynotesWithVisualAidsByLessonId(1L);
    }

    @Test
    void getKeynotesByPlanet_Success() {
        // Arrange
        List<LessonKeynote> keynotes = Arrays.asList(testKeynote);
        when(lessonKeynoteRepository.findByRelatedPlanet("Mars")).thenReturn(keynotes);

        // Act
        List<LessonKeynoteDTO> result = lessonKeynoteService.getKeynotesByPlanet("Mars");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Mars", result.get(0).getRelatedPlanet());
        verify(lessonKeynoteRepository).findByRelatedPlanet("Mars");
    }

    @Test
    void getKeynotesByZodiac_Success() {
        // Arrange
        List<LessonKeynote> keynotes = Arrays.asList(testKeynote);
        when(lessonKeynoteRepository.findByRelatedZodiac("Aries")).thenReturn(keynotes);

        // Act
        List<LessonKeynoteDTO> result = lessonKeynoteService.getKeynotesByZodiac("Aries");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Aries", result.get(0).getRelatedZodiac());
        verify(lessonKeynoteRepository).findByRelatedZodiac("Aries");
    }

    @Test
    void updateKeynote_Success() {
        // Arrange
        LessonKeynoteDTO updateDTO = new LessonKeynoteDTO();
        updateDTO.setLessonId(1L);
        updateDTO.setTitle("Updated Keynote");
        updateDTO.setContent("Updated content");        updateDTO.setContentType(KeynoteContentType.quote);
        updateDTO.setOrderSequence(2);
        updateDTO.setIsImportant(false);
        updateDTO.setHasVisualAid(true);
        updateDTO.setVisualAidUrl("https://example.com/updated.png");
        updateDTO.setRelatedPlanet("Jupiter");
        updateDTO.setRelatedZodiac("Sagittarius");

        LessonKeynote updatedKeynote = new LessonKeynote();
        updatedKeynote.setKeynoteId(1L);
        updatedKeynote.setLessonId(1L);
        updatedKeynote.setTitle("Updated Keynote");
        updatedKeynote.setContent("Updated content");
        updatedKeynote.setContentType(KeynoteContentType.quote);
        updatedKeynote.setOrderSequence(2);
        updatedKeynote.setIsImportant(false);
        updatedKeynote.setHasVisualAid(true);
        updatedKeynote.setVisualAidUrl("https://example.com/updated.png");
        updatedKeynote.setRelatedPlanet("Jupiter");
        updatedKeynote.setRelatedZodiac("Sagittarius");

        when(lessonKeynoteRepository.findById(1L)).thenReturn(Optional.of(testKeynote));
        when(lessonRepository.existsById(1L)).thenReturn(true);
        when(lessonKeynoteRepository.save(any(LessonKeynote.class))).thenReturn(updatedKeynote);

        // Act
        LessonKeynoteDTO result = lessonKeynoteService.updateKeynote(1L, updateDTO);

        // Assert
        assertNotNull(result);        assertEquals("Updated Keynote", result.getTitle());
        assertEquals("Updated content", result.getContent());
        assertEquals(KeynoteContentType.quote, result.getContentType());
        assertEquals(2, result.getOrderSequence());
        assertFalse(result.getIsImportant());
        assertTrue(result.getHasVisualAid());
        assertEquals("Jupiter", result.getRelatedPlanet());
        assertEquals("Sagittarius", result.getRelatedZodiac());
        verify(lessonKeynoteRepository).findById(1L);
        verify(lessonKeynoteRepository).save(any(LessonKeynote.class));
    }

    @Test
    void updateKeynote_NotFound_ThrowsException() {
        // Arrange
        LessonKeynoteDTO updateDTO = new LessonKeynoteDTO();
        updateDTO.setTitle("Updated Keynote");

        when(lessonKeynoteRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> 
            lessonKeynoteService.updateKeynote(99L, updateDTO)
        );
        assertEquals("Keynote not found with ID: 99", exception.getMessage());
        verify(lessonKeynoteRepository).findById(99L);
    }

    @Test
    void updateKeynote_LessonNotFound_ThrowsException() {
        // Arrange
        LessonKeynoteDTO updateDTO = new LessonKeynoteDTO();
        updateDTO.setLessonId(99L);
        updateDTO.setTitle("Updated Keynote");

        when(lessonKeynoteRepository.findById(1L)).thenReturn(Optional.of(testKeynote));
        when(lessonRepository.existsById(99L)).thenReturn(false);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> 
            lessonKeynoteService.updateKeynote(1L, updateDTO)
        );
        assertEquals("Lesson not found with ID: 99", exception.getMessage());
        verify(lessonRepository).existsById(99L);
    }

    @Test
    void deleteKeynote_Success() {
        // Arrange
        when(lessonKeynoteRepository.existsById(1L)).thenReturn(true);

        // Act
        lessonKeynoteService.deleteKeynote(1L);

        // Assert
        verify(lessonKeynoteRepository).existsById(1L);
        verify(lessonKeynoteRepository).deleteById(1L);
    }

    @Test
    void deleteKeynote_NotFound_ThrowsException() {
        // Arrange
        when(lessonKeynoteRepository.existsById(99L)).thenReturn(false);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> 
            lessonKeynoteService.deleteKeynote(99L)
        );
        assertEquals("Keynote not found with ID: 99", exception.getMessage());
        verify(lessonKeynoteRepository).existsById(99L);
        verify(lessonKeynoteRepository, never()).deleteById(anyLong());
    }

    @Test
    void searchKeynotes_Success() {
        // Arrange
        List<LessonKeynote> searchResults = Arrays.asList(testKeynote);
        when(lessonKeynoteRepository.searchKeynotes("test")).thenReturn(searchResults);

        // Act
        List<LessonKeynoteDTO> result = lessonKeynoteService.searchKeynotes("test");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Keynote", result.get(0).getTitle());
        verify(lessonKeynoteRepository).searchKeynotes("test");
    }

    @Test
    void reorderKeynotes_Success() {
        // Arrange
        List<Long> keynoteIds = Arrays.asList(2L, 1L, 3L); // New order
        
        LessonKeynote keynote1 = new LessonKeynote();
        keynote1.setKeynoteId(1L);
        keynote1.setOrderSequence(1);
        
        LessonKeynote keynote2 = new LessonKeynote();        keynote2.setKeynoteId(2L);
        keynote2.setOrderSequence(2);
        
        LessonKeynote keynote3 = new LessonKeynote();
        keynote3.setKeynoteId(3L);
        keynote3.setOrderSequence(3);

        when(lessonKeynoteRepository.findByLessonIdOrderByOrderSequence(1L))
            .thenReturn(Arrays.asList(keynote1, keynote2, keynote3)) // Original order
            .thenReturn(Arrays.asList(keynote2, keynote1, keynote3)); // After reorder call

        // Act
        List<LessonKeynoteDTO> result = lessonKeynoteService.reorderKeynotes(1L, keynoteIds);        
        
        // Assert
        assertNotNull(result);
        assertEquals(3, result.size());
        verify(lessonKeynoteRepository, times(2)).findByLessonIdOrderByOrderSequence(1L); // Called twice: once in reorderKeynotes, once in getKeynotesByLessonId
        verify(lessonKeynoteRepository, times(3)).save(any(LessonKeynote.class));
    }

    @Test
    void getKeynotesPaginated_WithFilters_Success() {
        // Arrange
        List<LessonKeynote> keynotes = Arrays.asList(testKeynote);
        when(lessonKeynoteRepository.findByLessonIdOrderByOrderSequence(1L)).thenReturn(keynotes);

        // Act
        Page<LessonKeynoteDTO> result = lessonKeynoteService.getKeynotesPaginated(0, 10, 1L, null, null, null);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(1, result.getContent().size());
        assertEquals("Test Keynote", result.getContent().get(0).getTitle());
    }

    @Test
    void getKeynotesPaginated_WithSearch_Success() {
        // Arrange
        List<LessonKeynote> searchResults = Arrays.asList(testKeynote);
        when(lessonKeynoteRepository.searchKeynotes("test")).thenReturn(searchResults);

        // Act
        Page<LessonKeynoteDTO> result = lessonKeynoteService.getKeynotesPaginated(0, 10, null, null, null, "test");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(1, result.getContent().size());
        verify(lessonKeynoteRepository).searchKeynotes("test");
    }

    @Test
    void convertToDTO_WithLessonInfo_Success() {
        // This test verifies the private convertToDTO method indirectly through getKeynoteById
        when(lessonKeynoteRepository.findById(1L)).thenReturn(Optional.of(testKeynote));

        // Act
        LessonKeynoteDTO result = lessonKeynoteService.getKeynoteById(1L);

        // Assert
        assertNotNull(result);        assertEquals(1L, result.getKeynoteId());
        assertEquals(1L, result.getLessonId());
        assertEquals("Test Keynote", result.getTitle());
        assertEquals("Test keynote content", result.getContent());
        assertEquals(KeynoteContentType.text, result.getContentType());
        assertEquals(1, result.getOrderSequence());
        assertTrue(result.getIsImportant());
        assertFalse(result.getHasVisualAid());
        assertEquals("Mars", result.getRelatedPlanet());
        assertEquals("Aries", result.getRelatedZodiac());
        assertNotNull(result.getCreatedAt());
        assertNotNull(result.getUpdatedAt());
    }
}
