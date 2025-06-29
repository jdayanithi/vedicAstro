package com.vedicastrology.controller;

import com.vedicastrology.dto.TagDTO;
import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.IdRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.TagNameRequest;
import com.vedicastrology.service.TagService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/secure/tags")
@RequiredArgsConstructor
public class TagController {
    private static final Logger logger = LoggerFactory.getLogger(TagController.class);
    private final TagService tagService;

    @PostMapping("/get-all")
    public List<TagDTO> getAllTags(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🔍 Fetching all tags");
        List<TagDTO> tags = tagService.getAllTags();
        logger.info("✅ Fetched {} tags", tags.size());
        return tags;
    }

    @PostMapping("/get-by-id")
    public ResponseEntity<TagDTO> getTagById(@RequestBody IdRequest request) {
        Long id = request.getId();
        logger.info("🔍 Fetching tag with ID: {}", id);
        return tagService.getTagById(id)
                .map(tag -> {
                    logger.info("✅ Fetched tag: {}", tag.getTagName());
                    return ResponseEntity.ok(tag);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/get-by-name")
    public ResponseEntity<TagDTO> getTagByName(@RequestBody TagNameRequest request) {
        String tagName = request.getTagName();
        logger.info("🔍 Fetching tag with name: {}", tagName);
        return tagService.getTagByName(tagName)
                .map(tag -> {
                    logger.info("✅ Fetched tag: {}", tag.getTagName());
                    return ResponseEntity.ok(tag);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TagDTO> createTag(@RequestBody TagDTO tagDTO) {
        TagDTO created = tagService.createTag(tagDTO);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TagDTO> updateTag(@PathVariable Long id, @RequestBody TagDTO tagDTO) {
        return tagService.updateTag(id, tagDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        if (tagService.deleteTag(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
