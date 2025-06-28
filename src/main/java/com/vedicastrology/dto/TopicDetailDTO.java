package com.vedicastrology.dto;

import java.time.LocalDateTime;
import java.util.List;

public class TopicDetailDTO {
    private Long topicId;
    private String title;
    private String description;
    private Long courseId;
    private Integer orderNumber;
    private Boolean isPublished;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<LessonDetailDTO> lessons;

    // Constructors
    public TopicDetailDTO() {}

    public TopicDetailDTO(Long topicId, String title, String description, Long courseId, 
                         Integer orderNumber, Boolean isPublished, LocalDateTime createdAt, 
                         LocalDateTime updatedAt, List<LessonDetailDTO> lessons) {
        this.topicId = topicId;
        this.title = title;
        this.description = description;
        this.courseId = courseId;
        this.orderNumber = orderNumber;
        this.isPublished = isPublished;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.lessons = lessons;
    }

    // Getters and Setters
    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
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

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
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

    public List<LessonDetailDTO> getLessons() {
        return lessons;
    }

    public void setLessons(List<LessonDetailDTO> lessons) {
        this.lessons = lessons;
    }
}
