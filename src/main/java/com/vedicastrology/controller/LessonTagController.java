package com.vedicastrology.controller;

import com.vedicastrology.dto.LessonTagDTO;
import com.vedicastrology.service.LessonTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/secure/lesson-tags")
public class LessonTagController {
    @Autowired
    private LessonTagService lessonTagService;

    @GetMapping
    public List<LessonTagDTO> getAllLessonTags() {
        return lessonTagService.getAllLessonTags();
    }

    @GetMapping("/lesson/{lessonId}")
    public List<LessonTagDTO> getTagsByLessonId(@PathVariable Long lessonId) {
        return lessonTagService.getTagsByLessonId(lessonId);
    }

    @GetMapping("/tag/{tagId}")
    public List<LessonTagDTO> getLessonsByTagId(@PathVariable Long tagId) {
        return lessonTagService.getLessonsByTagId(tagId);
    }

    @GetMapping("/{lessonTagId}")
    public LessonTagDTO getLessonTag(@PathVariable Long lessonTagId) {
        return lessonTagService.getLessonTag(lessonTagId);
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
        lessonTagService.deleteByLessonIdAndTagId(lessonId, tagId);
        return ResponseEntity.ok().build();
    }
}
