package com.vedicastrology.service;

import com.vedicastrology.dto.KeynoteTagDTO;
import com.vedicastrology.entity.KeynoteTag;
import com.vedicastrology.entity.LessonKeynote;
import com.vedicastrology.entity.Tag;
import com.vedicastrology.repository.KeynoteTagRepository;
import com.vedicastrology.repository.LessonKeynoteRepository;
import com.vedicastrology.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class KeynoteTagService {
    
    @Autowired
    private KeynoteTagRepository keynoteTagRepository;
    
    @Autowired
    private LessonKeynoteRepository lessonKeynoteRepository;
    
    @Autowired
    private TagRepository tagRepository;
    
    // Get all keynote tags
    public List<KeynoteTagDTO> getAllKeynoteTags() {
        return keynoteTagRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get keynote tag by ID
    public KeynoteTagDTO getKeynoteTagById(Long keynoteTagId) {
        KeynoteTag keynoteTag = keynoteTagRepository.findById(keynoteTagId)
                .orElseThrow(() -> new RuntimeException("KeynoteTag not found with ID: " + keynoteTagId));
        return convertToDTO(keynoteTag);
    }
    
    // Get tags by keynote ID
    public List<KeynoteTagDTO> getTagsByKeynoteId(Long keynoteId) {
        return keynoteTagRepository.findByKeynote_KeynoteId(keynoteId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get keynotes by tag ID
    public List<KeynoteTagDTO> getKeynotesByTagId(Long tagId) {
        return keynoteTagRepository.findByTag_TagId(tagId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get keynote tags by lesson ID
    public List<KeynoteTagDTO> getKeynoteTagsByLessonId(Long lessonId) {
        return keynoteTagRepository.findByLessonId(lessonId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get tags by keynote ID with minimum relevance score
    public List<KeynoteTagDTO> getTagsByKeynoteIdWithMinRelevance(Long keynoteId, Integer minScore) {
        return keynoteTagRepository.findByKeynoteIdWithMinRelevance(keynoteId, minScore).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get keynotes by tag ID with minimum relevance score
    public List<KeynoteTagDTO> getKeynotesByTagIdWithMinRelevance(Long tagId, Integer minScore) {
        return keynoteTagRepository.findByTagIdWithMinRelevance(tagId, minScore).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get top tags by relevance for a keynote
    public List<KeynoteTagDTO> getTopTagsByKeynoteId(Long keynoteId) {
        return keynoteTagRepository.findByKeynoteIdOrderByRelevanceDesc(keynoteId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Create keynote tag association
    public KeynoteTagDTO createKeynoteTag(KeynoteTagDTO keynoteTagDTO) {
        // Validate that keynote exists
        LessonKeynote keynote = lessonKeynoteRepository.findById(keynoteTagDTO.getKeynoteId())
                .orElseThrow(() -> new RuntimeException("Keynote not found with ID: " + keynoteTagDTO.getKeynoteId()));
        
        // Validate that tag exists
        Tag tag = tagRepository.findById(keynoteTagDTO.getTagId())
                .orElseThrow(() -> new RuntimeException("Tag not found with ID: " + keynoteTagDTO.getTagId()));
        
        // Check if association already exists
        if (keynoteTagRepository.existsByKeynote_KeynoteIdAndTag_TagId(
                keynoteTagDTO.getKeynoteId(), keynoteTagDTO.getTagId())) {
            throw new RuntimeException("KeynoteTag association already exists for keynote " + 
                    keynoteTagDTO.getKeynoteId() + " and tag " + keynoteTagDTO.getTagId());
        }
        
        KeynoteTag keynoteTag = new KeynoteTag();
        keynoteTag.setKeynote(keynote);
        keynoteTag.setTag(tag);
        keynoteTag.setRelevanceScore(keynoteTagDTO.getRelevanceScore() != null ? 
                keynoteTagDTO.getRelevanceScore() : 1);
        
        KeynoteTag savedKeynoteTag = keynoteTagRepository.save(keynoteTag);
        return convertToDTO(savedKeynoteTag);
    }
    
    // Update keynote tag
    public KeynoteTagDTO updateKeynoteTag(Long keynoteTagId, KeynoteTagDTO keynoteTagDTO) {
        KeynoteTag existingKeynoteTag = keynoteTagRepository.findById(keynoteTagId)
                .orElseThrow(() -> new RuntimeException("KeynoteTag not found with ID: " + keynoteTagId));
        
        // Only update relevance score (keynote and tag associations should not be changed)
        if (keynoteTagDTO.getRelevanceScore() != null) {
            existingKeynoteTag.setRelevanceScore(keynoteTagDTO.getRelevanceScore());
        }
        
        KeynoteTag savedKeynoteTag = keynoteTagRepository.save(existingKeynoteTag);
        return convertToDTO(savedKeynoteTag);
    }
    
    // Delete keynote tag by ID
    public void deleteKeynoteTag(Long keynoteTagId) {
        if (!keynoteTagRepository.existsById(keynoteTagId)) {
            throw new RuntimeException("KeynoteTag not found with ID: " + keynoteTagId);
        }
        keynoteTagRepository.deleteById(keynoteTagId);
    }
    
    // Delete keynote tag by keynote and tag IDs
    public void deleteKeynoteTagByKeynoteAndTag(Long keynoteId, Long tagId) {
        if (!keynoteTagRepository.existsByKeynote_KeynoteIdAndTag_TagId(keynoteId, tagId)) {
            throw new RuntimeException("KeynoteTag association not found for keynote " + 
                    keynoteId + " and tag " + tagId);
        }
        keynoteTagRepository.deleteByKeynote_KeynoteIdAndTag_TagId(keynoteId, tagId);
    }
    
    // Helper method to convert entity to DTO
    private KeynoteTagDTO convertToDTO(KeynoteTag keynoteTag) {
        KeynoteTagDTO dto = new KeynoteTagDTO();
        dto.setKeynoteTagId(keynoteTag.getKeynoteTagId());
        dto.setKeynoteId(keynoteTag.getKeynote().getKeynoteId());
        dto.setTagId(keynoteTag.getTag().getTagId());
        dto.setRelevanceScore(keynoteTag.getRelevanceScore());
        dto.setCreatedAt(keynoteTag.getCreatedAt());
        
        // Set optional fields for enriched responses
        dto.setKeynoteTitle(keynoteTag.getKeynote().getTitle());
        dto.setTagName(keynoteTag.getTag().getTagName());
        dto.setTagCategory(keynoteTag.getTag().getTagCategory());
        
        return dto;
    }
}
