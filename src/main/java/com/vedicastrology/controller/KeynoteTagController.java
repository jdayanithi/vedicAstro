package com.vedicastrology.controller;

import com.vedicastrology.dto.KeynoteTagDTO;
import com.vedicastrology.dto.response.ErrorResponse;
import com.vedicastrology.dto.response.SuccessResponse;
import com.vedicastrology.service.KeynoteTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/secure/keynote-tags")
public class KeynoteTagController {
    
    @Autowired
    private KeynoteTagService keynoteTagService;
    
    // Get all keynote tags
    @GetMapping
    public ResponseEntity<?> getAllKeynoteTags() {
        try {
            List<KeynoteTagDTO> keynoteTags = keynoteTagService.getAllKeynoteTags();
            return ResponseEntity.ok(keynoteTags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynote tag by ID
    @GetMapping("/{keynoteTagId}")
    public ResponseEntity<?> getKeynoteTagById(@PathVariable Long keynoteTagId) {
        try {
            KeynoteTagDTO keynoteTag = keynoteTagService.getKeynoteTagById(keynoteTagId);
            return ResponseEntity.ok(keynoteTag);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Not Found", e.getMessage()));
        }
    }
    
    // Get tags by keynote ID
    @GetMapping("/keynote/{keynoteId}")
    public ResponseEntity<?> getTagsByKeynoteId(@PathVariable Long keynoteId) {
        try {
            List<KeynoteTagDTO> tags = keynoteTagService.getTagsByKeynoteId(keynoteId);
            return ResponseEntity.ok(tags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynotes by tag ID
    @GetMapping("/tag/{tagId}")
    public ResponseEntity<?> getKeynotesByTagId(@PathVariable Long tagId) {
        try {
            List<KeynoteTagDTO> keynotes = keynoteTagService.getKeynotesByTagId(tagId);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynote tags by lesson ID
    @GetMapping("/lesson/{lessonId}")
    public ResponseEntity<?> getKeynoteTagsByLessonId(@PathVariable Long lessonId) {
        try {
            List<KeynoteTagDTO> keynoteTags = keynoteTagService.getKeynoteTagsByLessonId(lessonId);
            return ResponseEntity.ok(keynoteTags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get tags by keynote ID with minimum relevance score
    @GetMapping("/keynote/{keynoteId}/relevance/{minScore}")
    public ResponseEntity<?> getTagsByKeynoteIdWithMinRelevance(
            @PathVariable Long keynoteId, 
            @PathVariable Integer minScore) {
        try {
            List<KeynoteTagDTO> tags = keynoteTagService.getTagsByKeynoteIdWithMinRelevance(keynoteId, minScore);
            return ResponseEntity.ok(tags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get keynotes by tag ID with minimum relevance score
    @GetMapping("/tag/{tagId}/relevance/{minScore}")
    public ResponseEntity<?> getKeynotesByTagIdWithMinRelevance(
            @PathVariable Long tagId, 
            @PathVariable Integer minScore) {
        try {
            List<KeynoteTagDTO> keynotes = keynoteTagService.getKeynotesByTagIdWithMinRelevance(tagId, minScore);
            return ResponseEntity.ok(keynotes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Retrieval Failed", e.getMessage()));
        }
    }
    
    // Get top tags by relevance for a keynote
    @GetMapping("/keynote/{keynoteId}/top-tags")
    public ResponseEntity<?> getTopTagsByKeynoteId(@PathVariable Long keynoteId) {
        try {
            List<KeynoteTagDTO> topTags = keynoteTagService.getTopTagsByKeynoteId(keynoteId);
            return ResponseEntity.ok(topTags);
        } catch (Exception e) {
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
