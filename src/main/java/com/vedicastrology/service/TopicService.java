package com.vedicastrology.service;

import com.vedicastrology.dto.TopicDTO;
import com.vedicastrology.entity.Course;
import com.vedicastrology.entity.Topic;
import com.vedicastrology.repository.CourseRepository;
import com.vedicastrology.repository.TopicRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private CourseRepository courseRepository;    public List<TopicDTO> getAllTopicsByCourseId(Long courseId) {
        List<Topic> topics = topicRepository.findByCourse_CourseIdOrderByOrderNumberAsc(courseId);
        return topics.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TopicDTO getTopicById(Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new EntityNotFoundException("Topic not found with id: " + topicId));
        return convertToDTO(topic);
    }

    @Transactional
    public TopicDTO createTopic(TopicDTO topicDTO) {
        Course course = courseRepository.findById(topicDTO.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found with id: " + topicDTO.getCourseId()));

        Topic topic = new Topic();
        topic.setCourse(course);
        topic.setTitle(topicDTO.getTitle());
        topic.setDescription(topicDTO.getDescription());
        topic.setOrderNumber(getNextOrderNumber(course.getCourseId()));

        Topic savedTopic = topicRepository.save(topic);
        return convertToDTO(savedTopic);
    }

    @Transactional
    public TopicDTO updateTopic(Long topicId, TopicDTO topicDTO) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new EntityNotFoundException("Topic not found with id: " + topicId));

        // If order number is changing, adjust other topics' order numbers
        if (!topic.getOrderNumber().equals(topicDTO.getOrderNumber())) {
            reorderTopics(topic.getCourse().getCourseId(), topic.getOrderNumber(), topicDTO.getOrderNumber());
        }

        topic.setTitle(topicDTO.getTitle());
        topic.setDescription(topicDTO.getDescription());
        topic.setOrderNumber(topicDTO.getOrderNumber());

        Topic updatedTopic = topicRepository.save(topic);
        return convertToDTO(updatedTopic);
    }

    @Transactional
    public void deleteTopic(Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new EntityNotFoundException("Topic not found with id: " + topicId));
          // Reorder remaining topics
        List<Topic> laterTopics = topicRepository.findByCourse_CourseIdAndOrderNumberGreaterThanOrderByOrderNumberAsc(
                topic.getCourse().getCourseId(), topic.getOrderNumber());
        
        for (Topic laterTopic : laterTopics) {
            laterTopic.setOrderNumber(laterTopic.getOrderNumber() - 1);
            topicRepository.save(laterTopic);
        }

        topicRepository.deleteById(topicId);
    }    private Integer getNextOrderNumber(Long courseId) {
        List<Topic> topics = topicRepository.findByCourse_CourseIdOrderByOrderNumberAsc(courseId);
        return topics.isEmpty() ? 1 : topics.get(topics.size() - 1).getOrderNumber() + 1;
    }    private void reorderTopics(Long courseId, int oldOrder, int newOrder) {
        List<Topic> topics = topicRepository.findByCourse_CourseIdOrderByOrderNumberAsc(courseId);
        if (oldOrder < newOrder) {
            topics.stream()
                    .filter(t -> t.getOrderNumber() > oldOrder && t.getOrderNumber() <= newOrder)
                    .forEach(t -> {
                        t.setOrderNumber(t.getOrderNumber() - 1);
                        topicRepository.save(t);
                    });
        } else {
            topics.stream()
                    .filter(t -> t.getOrderNumber() >= newOrder && t.getOrderNumber() < oldOrder)
                    .forEach(t -> {
                        t.setOrderNumber(t.getOrderNumber() + 1);
                        topicRepository.save(t);
                    });
        }
    }

    private TopicDTO convertToDTO(Topic topic) {
        TopicDTO dto = new TopicDTO();
        dto.setTopicId(topic.getTopicId());
        dto.setCourseId(topic.getCourse().getCourseId());
        dto.setTitle(topic.getTitle());
        dto.setDescription(topic.getDescription());
        dto.setOrderNumber(topic.getOrderNumber());
        dto.setCreatedAt(topic.getCreatedAt());
        dto.setUpdatedAt(topic.getUpdatedAt());
        return dto;
    }
}
