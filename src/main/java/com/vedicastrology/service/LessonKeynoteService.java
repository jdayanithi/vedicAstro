package com.vedicastrology.service;

import com.vedicastrology.dto.LessonKeynoteDTO;
import com.vedicastrology.entity.LessonKeynote;
import com.vedicastrology.repository.LessonKeynoteRepository;
import com.vedicastrology.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class LessonKeynoteService {
    
    @Autowired
    private LessonKeynoteRepository lessonKeynoteRepository;
    
    @Autowired
    private LessonRepository lessonRepository;
    
    // Create a new keynote
    public LessonKeynoteDTO createKeynote(LessonKeynoteDTO keynoteDTO) {
        // Validate lesson exists
        if (!lessonRepository.existsById(keynoteDTO.getLessonId())) {
            throw new RuntimeException("Lesson not found with ID: " + keynoteDTO.getLessonId());
        }
        
        LessonKeynote keynote = convertToEntity(keynoteDTO);
        
        // Auto-assign order sequence if not provided
        if (keynote.getOrderSequence() == null) {
            Integer maxOrder = lessonKeynoteRepository.findMaxOrderSequenceByLessonId(keynote.getLessonId());
            keynote.setOrderSequence(maxOrder + 1);
        }
        
        LessonKeynote savedKeynote = lessonKeynoteRepository.save(keynote);
        return convertToDTO(savedKeynote);
    }
    
    // Get keynote by ID
    public LessonKeynoteDTO getKeynoteById(Long keynoteId) {
        Optional<LessonKeynote> keynote = lessonKeynoteRepository.findById(keynoteId);
        if (keynote.isPresent()) {
            return convertToDTO(keynote.get());
        }
        throw new RuntimeException("Keynote not found with ID: " + keynoteId);
    }
    
    // Get all keynotes
    public List<LessonKeynoteDTO> getAllKeynotes() {
        List<LessonKeynote> keynotes = lessonKeynoteRepository.findAll();
        return keynotes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get keynotes by lesson ID
    public List<LessonKeynoteDTO> getKeynotesByLessonId(Long lessonId) {
        List<LessonKeynote> keynotes = lessonKeynoteRepository.findByLessonIdOrderByOrderSequence(lessonId);
        return keynotes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get important keynotes by lesson ID
    public List<LessonKeynoteDTO> getImportantKeynotesByLessonId(Long lessonId) {
        List<LessonKeynote> keynotes = lessonKeynoteRepository.findImportantKeynotesByLessonId(lessonId);
        return keynotes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get keynotes by content type
    public List<LessonKeynoteDTO> getKeynotesByContentType(Long lessonId, String contentType) {
        List<LessonKeynote> keynotes = lessonKeynoteRepository.findByLessonIdAndContentType(lessonId, contentType);
        return keynotes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get keynotes with visual aids
    public List<LessonKeynoteDTO> getKeynotesWithVisualAids(Long lessonId) {
        List<LessonKeynote> keynotes = lessonKeynoteRepository.findKeynotesWithVisualAidsByLessonId(lessonId);
        return keynotes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get keynotes by related planet
    public List<LessonKeynoteDTO> getKeynotesByPlanet(String planet) {
        List<LessonKeynote> keynotes = lessonKeynoteRepository.findByRelatedPlanet(planet);
        return keynotes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get keynotes by related zodiac
    public List<LessonKeynoteDTO> getKeynotesByZodiac(String zodiac) {
        List<LessonKeynote> keynotes = lessonKeynoteRepository.findByRelatedZodiac(zodiac);
        return keynotes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Update keynote
    public LessonKeynoteDTO updateKeynote(Long keynoteId, LessonKeynoteDTO keynoteDTO) {
        Optional<LessonKeynote> existingKeynoteOpt = lessonKeynoteRepository.findById(keynoteId);
        if (!existingKeynoteOpt.isPresent()) {
            throw new RuntimeException("Keynote not found with ID: " + keynoteId);
        }
        
        // Validate lesson exists if lesson ID is being changed
        if (keynoteDTO.getLessonId() != null && !lessonRepository.existsById(keynoteDTO.getLessonId())) {
            throw new RuntimeException("Lesson not found with ID: " + keynoteDTO.getLessonId());
        }
        
        LessonKeynote existingKeynote = existingKeynoteOpt.get();
        updateEntityFromDTO(existingKeynote, keynoteDTO);
        
        LessonKeynote savedKeynote = lessonKeynoteRepository.save(existingKeynote);
        return convertToDTO(savedKeynote);
    }
    
    // Delete keynote
    public void deleteKeynote(Long keynoteId) {
        if (!lessonKeynoteRepository.existsById(keynoteId)) {
            throw new RuntimeException("Keynote not found with ID: " + keynoteId);
        }
        lessonKeynoteRepository.deleteById(keynoteId);
    }
    
    // Search keynotes
    public List<LessonKeynoteDTO> searchKeynotes(String query) {
        List<LessonKeynote> keynotes = lessonKeynoteRepository.searchKeynotes(query);
        return keynotes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Reorder keynotes within a lesson
    public List<LessonKeynoteDTO> reorderKeynotes(Long lessonId, List<Long> keynoteIds) {
        // Validate all keynotes belong to the lesson
        List<LessonKeynote> keynotes = lessonKeynoteRepository.findByLessonIdOrderByOrderSequence(lessonId);
        
        if (keynotes.size() != keynoteIds.size()) {
            throw new RuntimeException("Keynote count mismatch for reordering");
        }
        
        // Update order sequence for each keynote
        for (int i = 0; i < keynoteIds.size(); i++) {
            Long keynoteId = keynoteIds.get(i);
            LessonKeynote keynote = keynotes.stream()
                    .filter(k -> k.getKeynoteId().equals(keynoteId))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Keynote not found: " + keynoteId));
            
            keynote.setOrderSequence(i + 1);
            lessonKeynoteRepository.save(keynote);
        }
        
        return getKeynotesByLessonId(lessonId);
    }
    
    // Paginated and filtered keynotes
    public Page<LessonKeynoteDTO> getKeynotesPaginated(int page, int size, Long lessonId, String contentType, Boolean importantOnly, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("orderSequence").ascending());
        List<LessonKeynote> filtered;
        if (search != null && !search.trim().isEmpty()) {
            filtered = lessonKeynoteRepository.searchKeynotes(search.trim());
        } else if (lessonId != null && contentType != null) {
            filtered = lessonKeynoteRepository.findByLessonIdAndContentType(lessonId, contentType);
        } else if (lessonId != null && importantOnly != null && importantOnly) {
            filtered = lessonKeynoteRepository.findImportantKeynotesByLessonId(lessonId);
        } else if (lessonId != null) {
            filtered = lessonKeynoteRepository.findByLessonIdOrderByOrderSequence(lessonId);
        } else {
            filtered = lessonKeynoteRepository.findAll(Sort.by("orderSequence").ascending());
        }
        // Further filter for importantOnly if needed
        if (importantOnly != null && importantOnly) {
            filtered = filtered.stream().filter(LessonKeynote::getIsImportant).collect(java.util.stream.Collectors.toList());
        }
        if (contentType != null && !contentType.isEmpty()) {
            filtered = filtered.stream().filter(k -> k.getContentType().name().equalsIgnoreCase(contentType)).collect(java.util.stream.Collectors.toList());
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), filtered.size());
        List<LessonKeynoteDTO> dtos = filtered.stream().map(this::convertToDTO).collect(java.util.stream.Collectors.toList());
        List<LessonKeynoteDTO> pageContent = dtos.subList(Math.min(start, dtos.size()), Math.min(end, dtos.size()));
        return new PageImpl<>(pageContent, pageable, dtos.size());
    }
    
    // Helper methods for conversion
    private LessonKeynoteDTO convertToDTO(LessonKeynote keynote) {
        LessonKeynoteDTO dto = new LessonKeynoteDTO();
        dto.setKeynoteId(keynote.getKeynoteId());
        dto.setLessonId(keynote.getLessonId());
        dto.setTitle(keynote.getTitle());
        dto.setContent(keynote.getContent());
        dto.setContentType(keynote.getContentType());
        dto.setOrderSequence(keynote.getOrderSequence());
        dto.setIsImportant(keynote.getIsImportant());
        dto.setHasVisualAid(keynote.getHasVisualAid());
        dto.setVisualAidUrl(keynote.getVisualAidUrl());
        dto.setRelatedPlanet(keynote.getRelatedPlanet());
        dto.setRelatedZodiac(keynote.getRelatedZodiac());
        dto.setCreatedAt(keynote.getCreatedAt());
        dto.setUpdatedAt(keynote.getUpdatedAt());
        
        // Enrich with lesson information if available
        if (keynote.getLesson() != null) {
            dto.setLessonTitle(keynote.getLesson().getTitle());
            if (keynote.getLesson().getTopic() != null) {
                dto.setTopicTitle(keynote.getLesson().getTopic().getTitle());
            }
        }
        
        return dto;
    }
    
    private LessonKeynote convertToEntity(LessonKeynoteDTO dto) {
        LessonKeynote keynote = new LessonKeynote();
        keynote.setLessonId(dto.getLessonId());
        keynote.setTitle(dto.getTitle());
        keynote.setContent(dto.getContent());
        keynote.setContentType(dto.getContentType());
        keynote.setOrderSequence(dto.getOrderSequence());
        keynote.setIsImportant(dto.getIsImportant() != null ? dto.getIsImportant() : false);
        keynote.setHasVisualAid(dto.getHasVisualAid() != null ? dto.getHasVisualAid() : false);
        keynote.setVisualAidUrl(dto.getVisualAidUrl());
        keynote.setRelatedPlanet(dto.getRelatedPlanet());
        keynote.setRelatedZodiac(dto.getRelatedZodiac());
        return keynote;
    }
    
    private void updateEntityFromDTO(LessonKeynote keynote, LessonKeynoteDTO dto) {
        if (dto.getLessonId() != null) keynote.setLessonId(dto.getLessonId());
        if (dto.getTitle() != null) keynote.setTitle(dto.getTitle());
        if (dto.getContent() != null) keynote.setContent(dto.getContent());
        if (dto.getContentType() != null) keynote.setContentType(dto.getContentType());
        if (dto.getOrderSequence() != null) keynote.setOrderSequence(dto.getOrderSequence());
        if (dto.getIsImportant() != null) keynote.setIsImportant(dto.getIsImportant());
        if (dto.getHasVisualAid() != null) keynote.setHasVisualAid(dto.getHasVisualAid());
        if (dto.getVisualAidUrl() != null) keynote.setVisualAidUrl(dto.getVisualAidUrl());
        if (dto.getRelatedPlanet() != null) keynote.setRelatedPlanet(dto.getRelatedPlanet());
        if (dto.getRelatedZodiac() != null) keynote.setRelatedZodiac(dto.getRelatedZodiac());
    }
}
