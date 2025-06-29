package com.vedicastrology.controller;

import com.vedicastrology.dto.TopicDTO;
import com.vedicastrology.dto.TopicDetailDTO;
import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.IdRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.CourseIdRequest;
import com.vedicastrology.service.TopicService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/secure/topics")
public class TopicController {

    private static final Logger logger = LoggerFactory.getLogger(TopicController.class);

    @Autowired
    private TopicService topicService;

    @PostMapping("/get-all")
    public ResponseEntity<List<TopicDTO>> getAllTopics(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🔍 Fetching all topics");
        List<TopicDTO> topics = topicService.getAllTopics();
        logger.info("✅ Fetched {} topics", topics.size());
        return ResponseEntity.ok(topics);
    }

    @PostMapping("/get-by-course")
    public ResponseEntity<List<TopicDTO>> getAllTopicsByCourse(@RequestBody CourseIdRequest request) {
        Long courseId = request.getCourseId();
        logger.info("🔍 Fetching topics for course ID: {}", courseId);
        List<TopicDTO> topics = topicService.getAllTopicsByCourseId(courseId);
        logger.info("✅ Fetched {} topics for course ID: {}", topics.size(), courseId);
        return ResponseEntity.ok(topics);
    }

    @PostMapping("/get-by-id")
    public ResponseEntity<TopicDTO> getTopicById(@RequestBody IdRequest request) {
        Long topicId = request.getId();
        logger.info("🔍 Fetching topic with ID: {}", topicId);
        TopicDTO topic = topicService.getTopicById(topicId);
        logger.info("✅ Fetched topic: {}", topic.getTitle());
        return ResponseEntity.ok(topic);
    }

    @PostMapping
    public ResponseEntity<TopicDTO> createTopic(@Valid @RequestBody TopicDTO topicDTO) {
        TopicDTO createdTopic = topicService.createTopic(topicDTO);
        return new ResponseEntity<>(createdTopic, HttpStatus.CREATED);
    }

    @PutMapping("/{topicId}")
    public ResponseEntity<TopicDTO> updateTopic(
            @PathVariable Long topicId,
            @Valid @RequestBody TopicDTO topicDTO) {
        TopicDTO updatedTopic = topicService.updateTopic(topicId, topicDTO);
        return ResponseEntity.ok(updatedTopic);
    }

    @DeleteMapping("/{topicId}")
    public ResponseEntity<Void> deleteTopic(@PathVariable Long topicId) {
        topicService.deleteTopic(topicId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/get-details")
    public ResponseEntity<TopicDetailDTO> getTopicDetails(@RequestBody IdRequest request) {
        Long topicId = request.getId();
        logger.info("🔍 Fetching topic details for ID: {}", topicId);
        TopicDetailDTO topicDetails = topicService.getTopicDetails(topicId);
        logger.info("✅ Fetched topic details for: {}", topicDetails.getTitle());
        return ResponseEntity.ok(topicDetails);
    }
}
