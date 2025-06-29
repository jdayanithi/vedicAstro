package com.vedicastrology.controller;

import com.vedicastrology.dto.TopicDTO;
import com.vedicastrology.dto.TopicDetailDTO;
import com.vedicastrology.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/secure/topics")
public class TopicController {

    @Autowired
    private TopicService topicService;

    @GetMapping
    public ResponseEntity<List<TopicDTO>> getAllTopics() {
        List<TopicDTO> topics = topicService.getAllTopics();
        return ResponseEntity.ok(topics);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<TopicDTO>> getAllTopicsByCourse(@PathVariable Long courseId) {
        List<TopicDTO> topics = topicService.getAllTopicsByCourseId(courseId);
        return ResponseEntity.ok(topics);
    }

    @GetMapping("/{topicId}")
    public ResponseEntity<TopicDTO> getTopicById(@PathVariable Long topicId) {
        TopicDTO topic = topicService.getTopicById(topicId);
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

    @GetMapping("/{topicId}/details")
    public ResponseEntity<TopicDetailDTO> getTopicDetails(@PathVariable Long topicId) {
        TopicDetailDTO topicDetails = topicService.getTopicDetails(topicId);
        return ResponseEntity.ok(topicDetails);
    }
}
