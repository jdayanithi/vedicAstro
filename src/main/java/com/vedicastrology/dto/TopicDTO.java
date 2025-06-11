package com.vedicastrology.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TopicDTO {
    private Long topicId;
    private Long courseId;
    private String title;
    private String description;
    private Integer orderNumber;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
