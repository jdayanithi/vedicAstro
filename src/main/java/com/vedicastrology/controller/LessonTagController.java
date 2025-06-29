package com.vedicastrology.controller;

import com.vedicastrology.dto.LessonTagDTO;
import com.vedicastrology.dto.request.CommonRequestDTOs.*;
import com.vedicastrology.service.LessonTagService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/secure/lesson-tags")
public class LessonTagController {
    
    private static final Logger logger = LoggerFactory.getLogger(LessonTagController.class);
    
    @Autowired
    private LessonTagService lessonTagService;

    @PostMapping("/get-all")
    public List<LessonTagDTO> getAllLessonTags(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🔍 Fetching all lesson tags");
        List<LessonTagDTO> lessonTags = lessonTagService.getAllLessonTags();
        logger.info("✅ Fetched {} lesson tags", lessonTags.size());
        return lessonTags;
    }

    @PostMapping("/get-by-lesson")
    public List<LessonTagDTO> getTagsByLessonId(@RequestBody LessonIdRequest request) {
        Long lessonId = request.getLessonId();
        logger.info("🔍 Fetching tags for lesson ID: {}", lessonId);
        List<LessonTagDTO> tags = lessonTagService.getTagsByLessonId(lessonId);
        logger.info("✅ Fetched {} tags for lesson ID: {}", tags.size(), lessonId);
        return tags;
    }

    @PostMapping("/get-by-tag")
    public List<LessonTagDTO> getLessonsByTagId(@RequestBody TagIdRequest request) {
        Long tagId = request.getTagId();
        logger.info("🔍 Fetching lessons for tag ID: {}", tagId);
        List<LessonTagDTO> lessons = lessonTagService.getLessonsByTagId(tagId);
        logger.info("✅ Fetched {} lessons for tag ID: {}", lessons.size(), tagId);
        return lessons;
    }

    @PostMapping("/get-by-id")
    public LessonTagDTO getLessonTag(@RequestBody IdRequest request) {
        Long lessonTagId = request.getId();
        logger.info("🔍 Fetching lesson tag with ID: {}", lessonTagId);
        LessonTagDTO lessonTag = lessonTagService.getLessonTag(lessonTagId);
        logger.info("✅ Fetched lesson tag: {}", lessonTag);
        return lessonTag;
    }

    @PostMapping
    public LessonTagDTO createLessonTag(@RequestBody LessonTagDTO dto) {
        return lessonTagService.createLessonTag(dto);
    }

    @PutMapping("/{lessonTagId}")
    public LessonTagDTO updateLessonTag(@PathVariable Long lessonTagId, @RequestBody LessonTagDTO dto) {
        return lessonTagService.updateLessonTag(lessonTagId, dto);
    }

    @DeleteMapping("/{lessonTagId}")
    public ResponseEntity<?> deleteLessonTag(@PathVariable Long lessonTagId) {
        lessonTagService.deleteLessonTag(lessonTagId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/lesson/{lessonId}/tag/{tagId}")
    public ResponseEntity<?> deleteByLessonIdAndTagId(@PathVariable Long lessonId, @PathVariable Long tagId) {
        logger.info("🗑️ Deleting lesson tag for lesson ID: {} and tag ID: {}", lessonId, tagId);
        lessonTagService.deleteByLessonIdAndTagId(lessonId, tagId);
        logger.info("✅ Deleted lesson tag for lesson ID: {} and tag ID: {}", lessonId, tagId);
        return ResponseEntity.ok().build();
    }
}
