package com.vedicastrology.service;

import com.vedicastrology.dto.*;
import com.vedicastrology.entity.*;
import com.vedicastrology.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private DeletionHistoryService deletionHistoryService;

    @Autowired
    private LessonKeynoteRepository lessonKeynoteRepository;    @Autowired
    private LessonTagRepository lessonTagRepository;

    public List<TopicDTO> getAllTopics() {
        List<Topic> topics = topicRepository.findAll();
        return topics.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<TopicDTO> getAllTopicsByCourseId(Long courseId) {
        List<Topic> topics = topicRepository.findByCourse_CourseIdOrderByOrderNumberAsc(courseId);
        return topics.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TopicDTO getTopicById(Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new EntityNotFoundException("Topic not found with id: " + topicId));
        return convertToDTO(topic);
    }    @Transactional
    public TopicDTO createTopic(TopicDTO topicDTO) {
        Course course = courseRepository.findById(topicDTO.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found with id: " + topicDTO.getCourseId()));

        Topic topic = new Topic();
        topic.setCourse(course);
        topic.setTitle(topicDTO.getTitle());
        topic.setDescription(topicDTO.getDescription());
        topic.setOrderNumber(getNextOrderNumber(course.getCourseId()));
        
        // Ensure creation date is set (as a safeguard alongside @PrePersist)
        if (topic.getCreatedAt() == null) {
            topic.setCreatedAt(LocalDateTime.now());
        }
        if (topic.getUpdatedAt() == null) {
            topic.setUpdatedAt(LocalDateTime.now());
        }

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
        
        // Record the deletion in history before deleting
        deletionHistoryService.recordDeletion("topics", topicId, topic, "Topic deleted");
        
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

    public TopicDetailDTO getTopicDetails(Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new EntityNotFoundException("Topic not found with ID: " + topicId));

        // Get all lessons for this topic
        List<Lesson> lessons = lessonRepository.findByTopic_TopicIdOrderByOrderNumberAsc(topicId);

        // Convert lessons to detailed DTOs with keynotes and tags
        List<LessonDetailDTO> lessonDetails = lessons.stream()
                .map(this::convertToLessonDetailDTO)
                .collect(Collectors.toList());

        return new TopicDetailDTO(
                topic.getTopicId(),
                topic.getTitle(),
                topic.getDescription(),
                topic.getCourse().getCourseId(),
                topic.getOrderNumber(),
                topic.getStatusFlag(), // Using statusFlag instead of isPublished
                topic.getCreatedAt(),
                topic.getUpdatedAt(),
                lessonDetails
        );
    }    private LessonDetailDTO convertToLessonDetailDTO(Lesson lesson) {
        // Get keynotes for this lesson
        List<LessonKeynote> keynotes = lessonKeynoteRepository.findByLessonIdOrderByOrderSequence(lesson.getLessonId());
        List<LessonKeynoteDTO> keynoteDetails = keynotes.stream()
                .map(this::convertToKeynoteDTO)
                .collect(Collectors.toList());

        // Get tags for this lesson
        List<LessonTag> lessonTags = lessonTagRepository.findByLesson_LessonId(lesson.getLessonId());
        List<TagDTO> tagDetails = lessonTags.stream()
                .map(lessonTag -> {
                    Tag tag = lessonTag.getTag();
                    return tag != null ? convertToTagDTO(tag) : null;
                })
                .filter(tag -> tag != null)
                .collect(Collectors.toList());

        return new LessonDetailDTO(
                lesson.getLessonId(),
                lesson.getTitle(),
                lesson.getDescription(),
                lesson.getContentUrl(), // Using contentUrl as content
                lesson.getTopic().getTopicId(),
                lesson.getOrderNumber(),
                lesson.getIsFree(),
                lesson.getDurationMinutes(),
                lesson.getContentUrl(), // Using contentUrl as videoUrl 
                null, // audioUrl not available in entity
                null, // documentUrl not available in entity
                lesson.getStatusFlag(), // Using statusFlag instead of isPublished
                lesson.getCreatedAt(),
                lesson.getUpdatedAt(),
                keynoteDetails,
                tagDetails
        );
    }    private LessonKeynoteDTO convertToKeynoteDTO(LessonKeynote keynote) {
        LessonKeynoteDTO dto = new LessonKeynoteDTO();
        dto.setKeynoteId(keynote.getKeynoteId());
        dto.setLessonId(keynote.getLessonId());
        dto.setTitle(keynote.getTitle());
        dto.setContent(keynote.getContent());
        dto.setContentType(keynote.getContentType());
        dto.setOrderSequence(keynote.getOrderSequence());
        dto.setIsImportant(keynote.getIsImportant());
        dto.setHasVisualAid(keynote.getHasVisualAid());
        dto.setVisualAidUrl(keynote.getVisualAidUrl());
        dto.setRelatedPlanet(keynote.getRelatedPlanet());
        dto.setRelatedZodiac(keynote.getRelatedZodiac());
        dto.setCreatedAt(keynote.getCreatedAt());
        dto.setUpdatedAt(keynote.getUpdatedAt());
        return dto;
    }    private TagDTO convertToTagDTO(Tag tag) {
        TagDTO dto = new TagDTO();
        dto.setTagId(tag.getTagId());
        dto.setTagName(tag.getTagName());
        dto.setTagCategory(tag.getTagCategory());
        dto.setDescription(tag.getDescription());
        dto.setCreatedByUserId(tag.getCreatedByUserId());
        dto.setStatusFlag(tag.getStatusFlag());
        dto.setCreatedAt(tag.getCreatedAt());
        return dto;
    }
}
