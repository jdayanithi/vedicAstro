package com.vedicastrology.controller;

import com.vedicastrology.dto.KeynoteTagDTO;
import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.IdRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.KeynoteIdRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.TagIdRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.LessonIdRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.KeynoteTagRelevanceRequest;
import com.vedicastrology.dto.response.ErrorResponse;
import com.vedicastrology.dto.response.SuccessResponse;
import com.vedicastrology.service.KeynoteTagService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/secure/keynote-tags")
public class KeynoteTagController {
    
    private static final Logger logger = LoggerFactory.getLogger(KeynoteTagController.class);
    
    @Autowired
    private KeynoteTagService keynoteTagService;
    
    // Get all keynote tags
    @PostMapping("/get-all")
    public ResponseEntity<?> getAllKeynoteTags(@RequestBody(required = false) EmptyRequest request) {
        try {
            logger.info("🔍 Fetching all keynote tags");
            List<KeynoteTagDTO> keynoteTags = keynoteTagService.getAllKeynoteTags();
            logger.info("✅ Fetched {} keynote tags", keynoteTags.size());
            return ResponseEntity.ok(keynoteTags);
        } catch (Exception e) {
            logger.error("💥 Error fetching keynote tags: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynote tag by ID
    @PostMapping("/get-by-id")
    public ResponseEntity<?> getKeynoteTagById(@RequestBody IdRequest request) {
        Long keynoteTagId = request.getId();
        try {
            logger.info("🔍 Fetching keynote tag with ID: {}", keynoteTagId);
            KeynoteTagDTO keynoteTag = keynoteTagService.getKeynoteTagById(keynoteTagId);
            logger.info("✅ Fetched keynote tag: {}", keynoteTag.getKeynoteTagId());
            return ResponseEntity.ok(keynoteTag);
        } catch (Exception e) {
            logger.error("💥 Error fetching keynote tag {}: {}", keynoteTagId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Not Found", e.getMessage()));
        }
    }
    
    // Get tags by keynote ID
    @PostMapping("/get-by-keynote")
    public ResponseEntity<?> getTagsByKeynoteId(@RequestBody KeynoteIdRequest request) {
        Long keynoteId = request.getKeynoteId();
        try {
            logger.info("🔍 Fetching tags for keynote ID: {}", keynoteId);
            List<KeynoteTagDTO> tags = keynoteTagService.getTagsByKeynoteId(keynoteId);
            logger.info("✅ Fetched {} tags for keynote ID: {}", tags.size(), keynoteId);
            return ResponseEntity.ok(tags);
        } catch (Exception e) {
            logger.error("💥 Error fetching tags for keynote {}: {}", keynoteId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynotes by tag ID
    @PostMapping("/get-by-tag")
    public ResponseEntity<?> getKeynotesByTagId(@RequestBody TagIdRequest request) {
        Long tagId = request.getTagId();
        try {
            logger.info("🔍 Fetching keynotes for tag ID: {}", tagId);
            List<KeynoteTagDTO> keynotes = keynoteTagService.getKeynotesByTagId(tagId);
            logger.info("✅ Fetched {} keynotes for tag ID: {}", keynotes.size(), tagId);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            logger.error("💥 Error fetching keynotes for tag {}: {}", tagId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynote tags by lesson ID
    @PostMapping("/get-by-lesson")
    public ResponseEntity<?> getKeynoteTagsByLessonId(@RequestBody LessonIdRequest request) {
        Long lessonId = request.getLessonId();
        try {
            logger.info("🔍 Fetching keynote tags for lesson ID: {}", lessonId);
            List<KeynoteTagDTO> keynoteTags = keynoteTagService.getKeynoteTagsByLessonId(lessonId);
            logger.info("✅ Fetched {} keynote tags for lesson ID: {}", keynoteTags.size(), lessonId);
            return ResponseEntity.ok(keynoteTags);
        } catch (Exception e) {
            logger.error("💥 Error fetching keynote tags for lesson {}: {}", lessonId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get tags by keynote ID with minimum relevance score
    @PostMapping("/get-keynote-tags-with-relevance")
    public ResponseEntity<?> getTagsByKeynoteIdWithMinRelevance(@RequestBody KeynoteTagRelevanceRequest request) {
        Long keynoteId = request.getKeynoteId();
        Integer minScore = request.getMinScore();
        try {
            logger.info("🔍 Fetching tags for keynote ID: {} with min relevance: {}", keynoteId, minScore);
            List<KeynoteTagDTO> tags = keynoteTagService.getTagsByKeynoteIdWithMinRelevance(keynoteId, minScore);
            logger.info("✅ Fetched {} tags for keynote ID: {} with min relevance: {}", tags.size(), keynoteId, minScore);
            return ResponseEntity.ok(tags);
        } catch (Exception e) {
            logger.error("💥 Error fetching tags for keynote {} with relevance {}: {}", keynoteId, minScore, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynotes by tag ID with minimum relevance score
    @PostMapping("/get-tag-keynotes-with-relevance")
    public ResponseEntity<?> getKeynotesByTagIdWithMinRelevance(@RequestBody KeynoteTagRelevanceRequest request) {
        Long tagId = request.getTagId();
        Integer minScore = request.getMinScore();
        try {
            logger.info("🔍 Fetching keynotes for tag ID: {} with min relevance: {}", tagId, minScore);
            List<KeynoteTagDTO> keynotes = keynoteTagService.getKeynotesByTagIdWithMinRelevance(tagId, minScore);
            logger.info("✅ Fetched {} keynotes for tag ID: {} with min relevance: {}", keynotes.size(), tagId, minScore);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            logger.error("💥 Error fetching keynotes for tag {} with relevance {}: {}", tagId, minScore, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get top tags by relevance for a keynote
    @PostMapping("/get-top-tags")
    public ResponseEntity<?> getTopTagsByKeynoteId(@RequestBody KeynoteIdRequest request) {
        Long keynoteId = request.getKeynoteId();
        try {
            logger.info("🔍 Fetching top tags for keynote ID: {}", keynoteId);
            List<KeynoteTagDTO> topTags = keynoteTagService.getTopTagsByKeynoteId(keynoteId);
            logger.info("✅ Fetched {} top tags for keynote ID: {}", topTags.size(), keynoteId);
            return ResponseEntity.ok(topTags);
        } catch (Exception e) {
            logger.error("💥 Error fetching top tags for keynote {}: {}", keynoteId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Create keynote tag association
    @PostMapping
    public ResponseEntity<?> createKeynoteTag(@RequestBody KeynoteTagDTO keynoteTagDTO) {
        try {
            KeynoteTagDTO createdKeynoteTag = keynoteTagService.createKeynoteTag(keynoteTagDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdKeynoteTag);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Creation Failed", e.getMessage()));
        }
    }
    
    // Update keynote tag
    @PutMapping("/{keynoteTagId}")
    public ResponseEntity<?> updateKeynoteTag(
            @PathVariable Long keynoteTagId, 
            @RequestBody KeynoteTagDTO keynoteTagDTO) {
        try {
            KeynoteTagDTO updatedKeynoteTag = keynoteTagService.updateKeynoteTag(keynoteTagId, keynoteTagDTO);
            return ResponseEntity.ok(updatedKeynoteTag);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Update Failed", e.getMessage()));
        }
    }
    
    // Delete keynote tag by ID
    @DeleteMapping("/{keynoteTagId}")
    public ResponseEntity<?> deleteKeynoteTag(@PathVariable Long keynoteTagId) {
        try {
            keynoteTagService.deleteKeynoteTag(keynoteTagId);
            return ResponseEntity.ok(new SuccessResponse("KeynoteTag deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Deletion Failed", e.getMessage()));
        }
    }
    
    // Delete keynote tag by keynote and tag IDs
    @DeleteMapping("/keynote/{keynoteId}/tag/{tagId}")
    public ResponseEntity<?> deleteKeynoteTagByKeynoteAndTag(
            @PathVariable Long keynoteId, 
            @PathVariable Long tagId) {
        try {
            keynoteTagService.deleteKeynoteTagByKeynoteAndTag(keynoteId, tagId);
            return ResponseEntity.ok(new SuccessResponse("KeynoteTag association deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Deletion Failed", e.getMessage()));
        }    }
}
