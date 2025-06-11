package com.vedicastrology.dto;

import com.vedicastrology.entity.KeynoteContentType;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class LessonKeynoteDTO {
    private Long keynoteId;
    private Long lessonId;
    private String title;
    private String content;
    private KeynoteContentType contentType;
    private Integer orderSequence;
    private Boolean isImportant;
    private Boolean hasVisualAid;
    private String visualAidUrl;
    private String relatedPlanet;
    private String relatedZodiac;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Optional lesson information for enriched responses
    private String lessonTitle;
    private String topicTitle;
}
