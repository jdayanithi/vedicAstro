package com.vedicastrology.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CourseDTO {
    private Long courseId;
    private String title;
    private String description;
    private Long loginId;
    private Long categoryId;
    private String difficultyLevel;
    private BigDecimal price;
    private Integer durationHours;
    private String thumbnailUrl;
    private Boolean isPublished;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
