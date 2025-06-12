package com.vedicastrology.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class KeynoteTagDTO {
    private Long keynoteTagId;
    private Long keynoteId;
    private Long tagId;
    private Integer relevanceScore;
    private LocalDateTime createdAt;
    
    // Optional fields for enriched responses
    private String keynoteTitle;
    private String tagName;
    private String tagCategory;
}
