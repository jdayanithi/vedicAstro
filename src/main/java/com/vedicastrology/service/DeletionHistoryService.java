package com.vedicastrology.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vedicastrology.entity.DeletionHistory;
import com.vedicastrology.repository.DeletionHistoryRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DeletionHistoryService {
    
    @Autowired
    private DeletionHistoryRepository deletionHistoryRepository;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired(required = false)
    private HttpServletRequest request;

    /**
     * Record a deletion in the history table
     */
    public void recordDeletion(String tableName, Long recordId, Object recordData, String deletionReason) {
        try {
            // Get current user information
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Long deletedBy = null;
            String deletedByName = "Unknown";
            
            if (authentication != null && authentication.getPrincipal() != null) {
                // Extract user ID from authentication (adjust based on your auth implementation)
                String principal = authentication.getName();
                try {
                    deletedBy = Long.parseLong(principal);
                } catch (NumberFormatException e) {
                    deletedByName = principal;
                }
            }
            
            // Convert record data to JSON
            String recordDataJson = null;
            if (recordData != null) {
                try {
                    recordDataJson = objectMapper.writeValueAsString(recordData);
                } catch (Exception e) {
                    recordDataJson = recordData.toString();
                }
            }
            
            // Create deletion history record
            DeletionHistory history = new DeletionHistory(tableName, recordId, recordDataJson, deletedBy, deletedByName);
            history.setDeletionReason(deletionReason);
            
            // Set request information if available
            if (request != null) {
                history.setIpAddress(getClientIpAddress(request));
                history.setUserAgent(request.getHeader("User-Agent"));
            }
            
            deletionHistoryRepository.save(history);
            
        } catch (Exception e) {
            // Log error but don't fail the deletion operation
            System.err.println("Failed to record deletion history: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * Get deletion history by table name
     */
    public List<DeletionHistory> getHistoryByTable(String tableName) {
        return deletionHistoryRepository.findByTableName(tableName);
    }
    
    /**
     * Get deletion history by user
     */
    public List<DeletionHistory> getHistoryByUser(Long userId) {
        return deletionHistoryRepository.findByDeletedBy(userId);
    }
    
    /**
     * Get deletion history for a specific record
     */
    public List<DeletionHistory> getHistoryForRecord(String tableName, Long recordId) {
        return deletionHistoryRepository.findByTableNameAndRecordId(tableName, recordId);
    }
    
    /**
     * Get deletion history within date range
     */
    public List<DeletionHistory> getHistoryByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return deletionHistoryRepository.findByDeletionTimestampBetween(startDate, endDate);
    }
    
    /**
     * Get paginated deletion history by table
     */
    public Page<DeletionHistory> getHistoryByTablePaginated(String tableName, Pageable pageable) {
        return deletionHistoryRepository.findByTableNameOrderByDeletionTimestampDesc(tableName, pageable);
    }
    
    /**
     * Get paginated deletion history by user
     */
    public Page<DeletionHistory> getHistoryByUserPaginated(Long userId, Pageable pageable) {
        return deletionHistoryRepository.findByDeletedByOrderByDeletionTimestampDesc(userId, pageable);
    }
    
    /**
     * Get deletion count by table
     */
    public Long getDeletionCountByTable(String tableName) {
        return deletionHistoryRepository.countByTableName(tableName);
    }
    
    /**
     * Get deletion count by user
     */
    public Long getDeletionCountByUser(Long userId) {
        return deletionHistoryRepository.countByDeletedBy(userId);
    }
    
    /**
     * Extract client IP address from request
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedForHeader = request.getHeader("X-Forwarded-For");
        if (xForwardedForHeader == null) {
            return request.getRemoteAddr();
        } else {
            return xForwardedForHeader.split(",")[0];
        }
    }
}
