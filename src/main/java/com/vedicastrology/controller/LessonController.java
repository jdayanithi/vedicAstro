package com.vedicastrology.controller;

import com.vedicastrology.dto.LessonDTO;
import com.vedicastrology.dto.LessonDetailDTO;
import com.vedicastrology.service.LessonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/secure/lessons")
public class LessonController {

    private static final Logger logger = LoggerFactory.getLogger(LessonController.class);

    @Autowired
    private LessonService lessonService;

    @GetMapping
    public ResponseEntity<List<LessonDTO>> getAllLessons() {
        List<LessonDTO> lessons = lessonService.getAllLessons();
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/topic/{topicId}")
    public ResponseEntity<List<LessonDTO>> getAllLessonsByTopic(@PathVariable Long topicId) {
        List<LessonDTO> lessons = lessonService.getAllLessonsByTopicId(topicId);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/{lessonId}")
    public ResponseEntity<LessonDTO> getLessonById(@PathVariable Long lessonId) {
        LessonDTO lesson = lessonService.getLessonById(lessonId);
        return ResponseEntity.ok(lesson);
    }

    @PostMapping
    public ResponseEntity<LessonDTO> createLesson(@Valid @RequestBody LessonDTO lessonDTO) {
        LessonDTO createdLesson = lessonService.createLesson(lessonDTO);
        return new ResponseEntity<>(createdLesson, HttpStatus.CREATED);
    }

    @PutMapping("/{lessonId}")
    public ResponseEntity<LessonDTO> updateLesson(
            @PathVariable Long lessonId,
            @Valid @RequestBody LessonDTO lessonDTO) {
        LessonDTO updatedLesson = lessonService.updateLesson(lessonId, lessonDTO);
        return ResponseEntity.ok(updatedLesson);
    }

    @DeleteMapping("/{lessonId}")
    public ResponseEntity<Void> deleteLesson(@PathVariable Long lessonId) {
        lessonService.deleteLesson(lessonId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{lessonId}/details")
    public ResponseEntity<LessonDetailDTO> getLessonDetails(@PathVariable Long lessonId) {
        LessonDetailDTO lessonDetails = lessonService.getLessonDetails(lessonId);
        return ResponseEntity.ok(lessonDetails);
    }
}
