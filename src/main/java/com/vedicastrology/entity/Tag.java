package com.vedicastrology.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "tags")
@Data
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long tagId;

    @Column(name = "tag_name", unique = true, nullable = false, length = 50)
    private String tagName;

    @Column(name = "tag_category", length = 50)
    private String tagCategory;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_by_user_id")
    private Integer createdByUserId;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
