package com.vedicastrology.controller;

import com.vedicastrology.dto.LessonDTO;
import com.vedicastrology.dto.LessonDetailDTO;
import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.IdRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.TopicIdRequest;
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

    @PostMapping("/get-all")
    public ResponseEntity<List<LessonDTO>> getAllLessons(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🔍 Fetching all lessons");
        List<LessonDTO> lessons = lessonService.getAllLessons();
        logger.info("✅ Fetched {} lessons", lessons.size());
        return ResponseEntity.ok(lessons);
    }

    @PostMapping("/get-by-topic")
    public ResponseEntity<List<LessonDTO>> getAllLessonsByTopic(@RequestBody TopicIdRequest request) {
        Long topicId = request.getTopicId();
        logger.info("🔍 Fetching lessons for topic ID: {}", topicId);
        List<LessonDTO> lessons = lessonService.getAllLessonsByTopicId(topicId);
        logger.info("✅ Fetched {} lessons for topic ID: {}", lessons.size(), topicId);
        return ResponseEntity.ok(lessons);
    }

    @PostMapping("/get-by-id")
    public ResponseEntity<LessonDTO> getLessonById(@RequestBody IdRequest request) {
        Long lessonId = request.getId();
        logger.info("🔍 Fetching lesson with ID: {}", lessonId);
        LessonDTO lesson = lessonService.getLessonById(lessonId);
        logger.info("✅ Fetched lesson: {}", lesson.getTitle());
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

    @PostMapping("/get-details")
    public ResponseEntity<LessonDetailDTO> getLessonDetails(@RequestBody IdRequest request) {
        Long lessonId = request.getId();
        logger.info("🔍 Fetching lesson details for ID: {}", lessonId);
        LessonDetailDTO lessonDetails = lessonService.getLessonDetails(lessonId);
        logger.info("✅ Fetched lesson details for: {}", lessonDetails.getTitle());
        return ResponseEntity.ok(lessonDetails);
    }
}
