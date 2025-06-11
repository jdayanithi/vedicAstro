package com.vedicastrology.service;

import com.vedicastrology.dto.LessonDTO;
import com.vedicastrology.entity.ContentType;
import com.vedicastrology.entity.Lesson;
import com.vedicastrology.entity.Topic;
import com.vedicastrology.repository.LessonRepository;
import com.vedicastrology.repository.TopicRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private TopicRepository topicRepository;

    public List<LessonDTO> getAllLessonsByTopicId(Long topicId) {
        List<Lesson> lessons = lessonRepository.findByTopic_TopicIdOrderByOrderNumberAsc(topicId);
        return lessons.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public LessonDTO getLessonById(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new EntityNotFoundException("Lesson not found with id: " + lessonId));
        return convertToDTO(lesson);
    }

    @Transactional
    public LessonDTO createLesson(LessonDTO lessonDTO) {
        Topic topic = topicRepository.findById(lessonDTO.getTopicId())
                .orElseThrow(() -> new EntityNotFoundException("Topic not found with id: " + lessonDTO.getTopicId()));

        Lesson lesson = new Lesson();
        lesson.setTopic(topic);
        lesson.setTitle(lessonDTO.getTitle());
        lesson.setDescription(lessonDTO.getDescription());
        lesson.setContentType(ContentType.valueOf(lessonDTO.getContentType()));
        lesson.setContentUrl(lessonDTO.getContentUrl());
        lesson.setDurationMinutes(lessonDTO.getDurationMinutes());
        lesson.setOrderNumber(getNextOrderNumber(topic.getTopicId()));
        lesson.setIsFree(lessonDTO.getIsFree() != null ? lessonDTO.getIsFree() : false);

        Lesson savedLesson = lessonRepository.save(lesson);
        return convertToDTO(savedLesson);
    }

    @Transactional
    public LessonDTO updateLesson(Long lessonId, LessonDTO lessonDTO) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new EntityNotFoundException("Lesson not found with id: " + lessonId));

        // If order number is changing, adjust other lessons' order numbers
        if (!lesson.getOrderNumber().equals(lessonDTO.getOrderNumber())) {
            reorderLessons(lesson.getTopic().getTopicId(), lesson.getOrderNumber(), lessonDTO.getOrderNumber());
        }

        lesson.setTitle(lessonDTO.getTitle());
        lesson.setDescription(lessonDTO.getDescription());
        lesson.setContentType(ContentType.valueOf(lessonDTO.getContentType()));
        lesson.setContentUrl(lessonDTO.getContentUrl());
        lesson.setDurationMinutes(lessonDTO.getDurationMinutes());
        lesson.setOrderNumber(lessonDTO.getOrderNumber());
        lesson.setIsFree(lessonDTO.getIsFree() != null ? lessonDTO.getIsFree() : false);

        Lesson updatedLesson = lessonRepository.save(lesson);
        return convertToDTO(updatedLesson);
    }

    @Transactional
    public void deleteLesson(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new EntityNotFoundException("Lesson not found with id: " + lessonId));
        
        Long topicId = lesson.getTopic().getTopicId();
        Integer orderNumber = lesson.getOrderNumber();
        
        lessonRepository.delete(lesson);
        
        // Adjust order numbers of remaining lessons
        List<Lesson> lessonsToUpdate = lessonRepository
                .findByTopic_TopicIdAndOrderNumberGreaterThanOrderByOrderNumberAsc(topicId, orderNumber);
        
        for (Lesson lessonToUpdate : lessonsToUpdate) {
            lessonToUpdate.setOrderNumber(lessonToUpdate.getOrderNumber() - 1);
            lessonRepository.save(lessonToUpdate);
        }
    }

    private Integer getNextOrderNumber(Long topicId) {
        List<Lesson> lessons = lessonRepository.findByTopic_TopicIdOrderByOrderNumberAsc(topicId);
        return lessons.isEmpty() ? 1 : lessons.get(lessons.size() - 1).getOrderNumber() + 1;
    }

    private void reorderLessons(Long topicId, int oldOrder, int newOrder) {
        if (oldOrder == newOrder) return;

        List<Lesson> allLessons = lessonRepository.findByTopic_TopicIdOrderByOrderNumberAsc(topicId);
        
        if (oldOrder < newOrder) {
            // Moving down: shift lessons up
            for (Lesson lesson : allLessons) {
                int currentOrder = lesson.getOrderNumber();
                if (currentOrder > oldOrder && currentOrder <= newOrder) {
                    lesson.setOrderNumber(currentOrder - 1);
                    lessonRepository.save(lesson);
                }
            }
        } else {
            // Moving up: shift lessons down
            for (Lesson lesson : allLessons) {
                int currentOrder = lesson.getOrderNumber();
                if (currentOrder >= newOrder && currentOrder < oldOrder) {
                    lesson.setOrderNumber(currentOrder + 1);
                    lessonRepository.save(lesson);
                }
            }
        }
    }

    private LessonDTO convertToDTO(Lesson lesson) {
        LessonDTO dto = new LessonDTO();
        dto.setLessonId(lesson.getLessonId());
        dto.setTopicId(lesson.getTopic().getTopicId());
        dto.setTitle(lesson.getTitle());
        dto.setDescription(lesson.getDescription());
        dto.setContentType(lesson.getContentType() != null ? lesson.getContentType().name() : null);
        dto.setContentUrl(lesson.getContentUrl());
        dto.setDurationMinutes(lesson.getDurationMinutes());
        dto.setOrderNumber(lesson.getOrderNumber());
        dto.setIsFree(lesson.getIsFree());
        dto.setCreatedAt(lesson.getCreatedAt());
        dto.setUpdatedAt(lesson.getUpdatedAt());
        return dto;
    }
}
