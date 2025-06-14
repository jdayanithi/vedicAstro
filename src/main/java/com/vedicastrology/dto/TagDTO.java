package com.vedicastrology.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TagDTO {
    private Long tagId;
    private String tagName;
    private String tagCategory;
    private String description;
    private Integer createdByUserId;
    private Boolean statusFlag;
    private LocalDateTime createdAt;
}
