package com.vedicastrology.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "keynote_tags", uniqueConstraints = @UniqueConstraint(columnNames = {"keynote_id", "tag_id"}))
@Data
public class KeynoteTag {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "keynote_tag_id")
    private Long keynoteTagId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keynote_id", nullable = false)
    private LessonKeynote keynote;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;
    
    @Column(name = "relevance_score", nullable = false)
    private Integer relevanceScore = 1;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
