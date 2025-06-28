package com.vedicastrology.dto;

import java.time.LocalDateTime;
import java.util.List;

public class LessonDetailDTO {
    private Long lessonId;
    private String title;
    private String description;
    private String content;
    private Long topicId;
    private Integer orderNumber;
    private Boolean isFree;
    private Integer durationMinutes;
    private String videoUrl;
    private String audioUrl;
    private String documentUrl;
    private Boolean isPublished;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<LessonKeynoteDTO> keynotes;
    private List<TagDTO> tags;

    // Constructors
    public LessonDetailDTO() {}

    public LessonDetailDTO(Long lessonId, String title, String description, String content, 
                          Long topicId, Integer orderNumber, Boolean isFree, Integer durationMinutes,
                          String videoUrl, String audioUrl, String documentUrl, Boolean isPublished,
                          LocalDateTime createdAt, LocalDateTime updatedAt, 
                          List<LessonKeynoteDTO> keynotes, List<TagDTO> tags) {
        this.lessonId = lessonId;
        this.title = title;
        this.description = description;
        this.content = content;
        this.topicId = topicId;
        this.orderNumber = orderNumber;
        this.isFree = isFree;
        this.durationMinutes = durationMinutes;
        this.videoUrl = videoUrl;
        this.audioUrl = audioUrl;
        this.documentUrl = documentUrl;
        this.isPublished = isPublished;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.keynotes = keynotes;
        this.tags = tags;
    }

    // Getters and Setters
    public Long getLessonId() {
        return lessonId;
    }

    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Boolean getIsFree() {
        return isFree;
    }

    public void setIsFree(Boolean isFree) {
        this.isFree = isFree;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getAudioUrl() {
        return audioUrl;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
    }

    public String getDocumentUrl() {
        return documentUrl;
    }

    public void setDocumentUrl(String documentUrl) {
        this.documentUrl = documentUrl;
    }

    public Boolean getIsPublished() {
        return isPublished;
    }

    public void setIsPublished(Boolean isPublished) {
        this.isPublished = isPublished;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<LessonKeynoteDTO> getKeynotes() {
        return keynotes;
    }

    public void setKeynotes(List<LessonKeynoteDTO> keynotes) {
        this.keynotes = keynotes;
    }

    public List<TagDTO> getTags() {
        return tags;
    }

    public void setTags(List<TagDTO> tags) {
        this.tags = tags;
    }
}
