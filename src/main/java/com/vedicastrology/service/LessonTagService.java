package com.vedicastrology.service;

import com.vedicastrology.dto.LessonTagDTO;
import com.vedicastrology.entity.Lesson;
import com.vedicastrology.entity.LessonTag;
import com.vedicastrology.entity.Tag;
import com.vedicastrology.repository.LessonRepository;
import com.vedicastrology.repository.LessonTagRepository;
import com.vedicastrology.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonTagService {
    @Autowired
    private LessonTagRepository lessonTagRepository;
    @Autowired
    private LessonRepository lessonRepository;
    @Autowired
    private TagRepository tagRepository;

    public List<LessonTagDTO> getAllLessonTags() {
        return lessonTagRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<LessonTagDTO> getTagsByLessonId(Long lessonId) {
        return lessonTagRepository.findByLesson_LessonId(lessonId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<LessonTagDTO> getLessonsByTagId(Long tagId) {
        return lessonTagRepository.findByTag_TagId(tagId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public LessonTagDTO getLessonTag(Long lessonTagId) {
        return lessonTagRepository.findById(lessonTagId).map(this::toDTO).orElse(null);
    }

    @Transactional
    public LessonTagDTO createLessonTag(LessonTagDTO dto) {
        if (lessonTagRepository.existsByLesson_LessonIdAndTag_TagId(dto.getLessonId(), dto.getTagId())) {
            throw new RuntimeException("LessonTag already exists for this lesson and tag");
        }
        Lesson lesson = lessonRepository.findById(dto.getLessonId()).orElseThrow();
        Tag tag = tagRepository.findById(dto.getTagId()).orElseThrow();
        LessonTag lessonTag = new LessonTag();
        lessonTag.setLesson(lesson);
        lessonTag.setTag(tag);
        lessonTag.setRelevanceScore(dto.getRelevanceScore() != null ? dto.getRelevanceScore() : 1);
        lessonTag = lessonTagRepository.save(lessonTag);
        return toDTO(lessonTag);
    }    @Transactional
    public LessonTagDTO updateLessonTag(Long lessonTagId, LessonTagDTO dto) {
        LessonTag lessonTag = lessonTagRepository.findById(lessonTagId).orElseThrow();
        
        // Update tag if provided
        if (dto.getTagId() != null) {
            Tag tag = tagRepository.findById(dto.getTagId()).orElseThrow();
            lessonTag.setTag(tag);
        }
        
        // Update relevance score if provided
        if (dto.getRelevanceScore() != null) {
            lessonTag.setRelevanceScore(dto.getRelevanceScore());
        }
        
        lessonTag = lessonTagRepository.save(lessonTag);
        return toDTO(lessonTag);
    }

    @Transactional
    public void deleteLessonTag(Long lessonTagId) {
        lessonTagRepository.deleteById(lessonTagId);
    }

    @Transactional
    public void deleteByLessonIdAndTagId(Long lessonId, Long tagId) {
        lessonTagRepository.deleteByLesson_LessonIdAndTag_TagId(lessonId, tagId);
    }    private LessonTagDTO toDTO(LessonTag lessonTag) {
        LessonTagDTO dto = new LessonTagDTO();
        dto.setLessonTagId(lessonTag.getLessonTagId());
        dto.setLessonId(lessonTag.getLesson().getLessonId());
        dto.setTagId(lessonTag.getTag().getTagId());
        dto.setRelevanceScore(lessonTag.getRelevanceScore());
        dto.setTagName(lessonTag.getTag().getTagName());
        return dto;
    }
}
