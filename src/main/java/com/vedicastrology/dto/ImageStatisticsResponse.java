package com.vedicastrology.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageStatisticsResponse {
    private Long totalFileSize;
    private List<Object[]> categoryStatistics;
    private Integer totalImages;
    private String totalFileSizeFormatted;
    
    public String getFormattedFileSize() {
        if (totalFileSize == null) return "0 B";
        
        long size = totalFileSize;
        if (size < 1024) return size + " B";
        if (size < 1024 * 1024) return String.format("%.2f KB", size / 1024.0);
        if (size < 1024 * 1024 * 1024) return String.format("%.2f MB", size / (1024.0 * 1024.0));
        return String.format("%.2f GB", size / (1024.0 * 1024.0 * 1024.0));
    }
}
