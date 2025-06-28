package com.vedicastrology.service;

import com.vedicastrology.dto.*;
import com.vedicastrology.entity.*;
import com.vedicastrology.repository.*;
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

    @Autowired
    private LessonKeynoteRepository lessonKeynoteRepository;

    @Autowired
    private LessonTagRepository lessonTagRepository;

    @Autowired
    private TagRepository tagRepository;

    public List<LessonDTO> getAllLessonsByTopicId(Long topicId) {
        List<Lesson> lessons = lessonRepository.findByTopic_TopicIdOrderByOrderNumberAsc(topicId);
        return lessons.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<LessonDTO> getAllLessons() {
        List<Lesson> lessons = lessonRepository.findAll();
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

    public LessonDetailDTO getLessonDetails(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new EntityNotFoundException("Lesson not found with ID: " + lessonId));

        // Get keynotes for this lesson
        List<LessonKeynote> keynotes = lessonKeynoteRepository.findByLessonIdOrderByOrderSequence(lessonId);
        List<LessonKeynoteDTO> keynoteDetails = keynotes.stream()
                .map(this::convertToKeynoteDTO)
                .collect(Collectors.toList());

        // Get tags for this lesson
        List<LessonTag> lessonTags = lessonTagRepository.findByLesson_LessonId(lessonId);
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
    }

    private LessonKeynoteDTO convertToKeynoteDTO(LessonKeynote keynote) {
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
    }

    private TagDTO convertToTagDTO(Tag tag) {
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
