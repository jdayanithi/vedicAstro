package com.vedicastrology.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class LessonDTO {
    private Long lessonId;
    private Long topicId;
    private String title;
    private String description;
    private String contentType;
    private String contentUrl;
    private Integer durationMinutes;
    private Integer orderNumber;
    private Boolean isFree;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
