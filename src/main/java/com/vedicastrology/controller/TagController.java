package com.vedicastrology.controller;

import com.vedicastrology.dto.TagDTO;
import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.dto.request.SecureRequestDTOs.SecureIdRequest;
import com.vedicastrology.dto.request.SecureRequestDTOs.SecureTextRequest;
import com.vedicastrology.dto.request.SecureRequestDTOs.SecureTagUpdateRequest;
import com.vedicastrology.security.InputSanitizationService;
import com.vedicastrology.service.TagService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/secure/tags")
@RequiredArgsConstructor
public class TagController {
    private static final Logger logger = LoggerFactory.getLogger(TagController.class);
    private final TagService tagService;
    
    @Autowired
    private InputSanitizationService inputSanitizationService;

    @PostMapping("/get-all")
    public List<TagDTO> getAllTags(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🔍 Fetching all tags");
        List<TagDTO> tags = tagService.getAllTags();
        logger.info("✅ Fetched {} tags", tags.size());
        return tags;
    }

    @PostMapping("/get-by-id")
    public ResponseEntity<?> getTagById(@Valid @RequestBody SecureIdRequest request) {
        Long id = request.getId();
        logger.info("🔍 Fetching tag with ID: {}", id);
        try {
            // Additional validation for ID
            if (id == null || id <= 0) {
                logger.warn("🚨 Invalid tag ID provided: {}", id);
                return ResponseEntity.badRequest().body("Invalid tag ID");
            }
            
            return tagService.getTagById(id)
                    .map(tag -> {
                        logger.info("✅ Fetched tag: {}", tag.getTagName());
                        return ResponseEntity.ok(tag);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in get tag by ID: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error fetching tag with ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to fetch tag");
        }
    }

    @PostMapping("/get-by-name")
    public ResponseEntity<?> getTagByName(@Valid @RequestBody SecureTextRequest request) {
        try {
            // Sanitize tag name input
            String sanitizedTagName = inputSanitizationService.sanitizeString(request.getText(), "tagName");
            
            logger.info("🔍 Fetching tag with name: {}", sanitizedTagName);
            return tagService.getTagByName(sanitizedTagName)
                    .map(tag -> {
                        logger.info("✅ Fetched tag: {}", tag.getTagName());
                        return ResponseEntity.ok(tag);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in get tag by name: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid tag name: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error fetching tag by name: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to fetch tag");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTag(@Valid @RequestBody TagDTO tagDTO) {
        try {
            // Sanitize tag name
            String sanitizedTagName = inputSanitizationService.sanitizeString(tagDTO.getTagName(), "tagName");
            tagDTO.setTagName(sanitizedTagName);
            
            TagDTO created = tagService.createTag(tagDTO);
            logger.info("✅ Created tag: {}", created.getTagName());
            return ResponseEntity.ok(created);
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in create tag: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid tag data: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error creating tag: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to create tag");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateTag(@Valid @RequestBody SecureTagUpdateRequest request) {
        Long id = request.getId();
        try {
            // Additional validation for ID
            if (id == null || id <= 0) {
                logger.warn("🚨 Invalid tag ID provided for update: {}", id);
                return ResponseEntity.badRequest().body("Invalid tag ID");
            }
            
            // Sanitize tag name
            String sanitizedTagName = inputSanitizationService.sanitizeString(request.getTagName(), "tagName");
            
            TagDTO tagDTO = new TagDTO();
            tagDTO.setTagName(sanitizedTagName);
            
            return tagService.updateTag(id, tagDTO)
                    .map(updated -> {
                        logger.info("✅ Updated tag: {}", updated.getTagName());
                        return ResponseEntity.ok(updated);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in update tag: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid tag data: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error updating tag {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to update tag");
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteTag(@Valid @RequestBody SecureIdRequest request) {
        Long id = request.getId();
        logger.info("🗑️ Deleting tag with ID: {}", id);
        try {
            // Additional validation for ID
            if (id == null || id <= 0) {
                logger.warn("🚨 Invalid tag ID provided for deletion: {}", id);
                return ResponseEntity.badRequest().body("Invalid tag ID");
            }
            
            if (tagService.deleteTag(id)) {
                logger.info("✅ Successfully deleted tag with ID: {}", id);
                return ResponseEntity.noContent().build();
            } else {
                logger.warn("⚠️ Tag with ID {} not found for deletion", id);
                return ResponseEntity.notFound().build();
            }
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in delete tag: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error deleting tag {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to delete tag");
        }
    }
}
