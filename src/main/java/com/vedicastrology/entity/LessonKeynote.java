package com.vedicastrology.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "lesson_keynotes")
@Data
public class LessonKeynote {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "keynote_id")
    private Long keynoteId;
    
    @Column(name = "lesson_id", nullable = false)
    private Long lessonId;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "content_type", nullable = false)
    private KeynoteContentType contentType = KeynoteContentType.text;
    
    @Column(name = "order_sequence", nullable = false)
    private Integer orderSequence;
    
    @Column(name = "is_important", nullable = false)
    private Boolean isImportant = false;
    
    @Column(name = "has_visual_aid", nullable = false)
    private Boolean hasVisualAid = false;
    
    @Column(name = "visual_aid_url")
    private String visualAidUrl;
    
    @Column(name = "related_planet", length = 20)
    private String relatedPlanet;
    
    @Column(name = "related_zodiac", length = 20)
    private String relatedZodiac;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Relationship with Lesson entity
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", insertable = false, updatable = false)
    private Lesson lesson;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
