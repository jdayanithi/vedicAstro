package com.vedicastrology.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
@Data
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Long loginId;

    @Column
    private Long categoryId;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private DifficultyLevel difficultyLevel;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;    
    
    @Column
    private Integer durationHours;

    @Column(columnDefinition = "TEXT")
    private String thumbnailUrl;    @Column(nullable = false)
    private Boolean isPublished = false;

    @Column(name = "status_flag")
    private Boolean statusFlag = true;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
