package com.vedicastrology.dto;

import lombok.Data;

@Data
public class LessonSummaryDTO {
    private Long lessonId;
    private Long topicId;
    private String title;
    private String contentType;
    private String contentUrl;
    private Integer durationMinutes;
    private Integer orderNumber;
    private Boolean isFree;
    // Note: description field excluded for performance optimization
}
