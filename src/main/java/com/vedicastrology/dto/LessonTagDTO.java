package com.vedicastrology.dto;

public class LessonTagDTO {
    private Long lessonTagId;
    private Long lessonId;
    private Long tagId;
    private Integer relevanceScore;
    private String tagName;

    // Getters and setters
    public Long getLessonTagId() { return lessonTagId; }
    public void setLessonTagId(Long lessonTagId) { this.lessonTagId = lessonTagId; }
    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }
    public Long getTagId() { return tagId; }
    public void setTagId(Long tagId) { this.tagId = tagId; }
    public Integer getRelevanceScore() { return relevanceScore; }
    public void setRelevanceScore(Integer relevanceScore) { this.relevanceScore = relevanceScore; }
    public String getTagName() { return tagName; }
    public void setTagName(String tagName) { this.tagName = tagName; }
}
