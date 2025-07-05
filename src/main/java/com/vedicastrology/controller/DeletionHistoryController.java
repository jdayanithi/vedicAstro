package com.vedicastrology.controller;

import com.vedicastrology.dto.DeletionHistoryDTO;
import com.vedicastrology.entity.DeletionHistory;
import com.vedicastrology.service.DeletionHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/secure/deletion-history")
public class DeletionHistoryController {
    
    @Autowired
    private DeletionHistoryService deletionHistoryService;
    
    @PostMapping("/get-by-table")
    public List<DeletionHistoryDTO> getHistoryByTable(@RequestBody Map<String, String> request) {
        String tableName = request.get("tableName");
        List<DeletionHistory> history = deletionHistoryService.getHistoryByTable(tableName);
        return history.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    
    @PostMapping("/get-by-user")
    public List<DeletionHistoryDTO> getHistoryByUser(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        List<DeletionHistory> history = deletionHistoryService.getHistoryByUser(userId);
        return history.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    
    @PostMapping("/get-by-record")
    public List<DeletionHistoryDTO> getHistoryForRecord(@RequestBody Map<String, Object> request) {
        String tableName = request.get("tableName").toString();
        Long recordId = Long.valueOf(request.get("recordId").toString());
        List<DeletionHistory> history = deletionHistoryService.getHistoryForRecord(tableName, recordId);
        return history.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    
    @PostMapping("/get-by-date-range")
    public List<DeletionHistoryDTO> getHistoryByDateRange(@RequestBody Map<String, String> request) {
        LocalDateTime startDate = LocalDateTime.parse(request.get("startDate"));
        LocalDateTime endDate = LocalDateTime.parse(request.get("endDate"));
        List<DeletionHistory> history = deletionHistoryService.getHistoryByDateRange(startDate, endDate);
        return history.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    
    @PostMapping("/get-paginated")
    public Page<DeletionHistoryDTO> getHistoryPaginated(@RequestBody Map<String, Object> request) {
        int page = (Integer) request.getOrDefault("page", 0);
        int size = (Integer) request.getOrDefault("size", 10);
        String tableName = (String) request.get("tableName");
        
        Pageable pageable = PageRequest.of(page, size);
        Page<DeletionHistory> historyPage;
        
        if (tableName != null && !tableName.isEmpty()) {
            historyPage = deletionHistoryService.getHistoryByTablePaginated(tableName, pageable);
        } else {
            // Return all if no table specified - implement in service if needed
            historyPage = deletionHistoryService.getHistoryByTablePaginated("", pageable);
        }
        
        return historyPage.map(this::convertToDTO);
    }
    
    @PostMapping("/get-stats")
    public Map<String, Object> getDeletionStats(@RequestBody(required = false) Map<String, Object> request) {
        // Get deletion statistics
        Long totalDeletions = deletionHistoryService.getDeletionCountByTable("");
        
        // You can add more statistics here
        return Map.of(
            "totalDeletions", totalDeletions,
            "userDeletions", deletionHistoryService.getDeletionCountByTable("users"),
            "courseDeletions", deletionHistoryService.getDeletionCountByTable("courses"),
            "lessonDeletions", deletionHistoryService.getDeletionCountByTable("lessons"),
            "topicDeletions", deletionHistoryService.getDeletionCountByTable("topics"),
            "lessonTagDeletions", deletionHistoryService.getDeletionCountByTable("lesson_tags"),
            "lessonKeynoteDeletions", deletionHistoryService.getDeletionCountByTable("lesson_keynotes")
        );
    }
    
    private DeletionHistoryDTO convertToDTO(DeletionHistory entity) {
        return new DeletionHistoryDTO(
            entity.getId(),
            entity.getTableName(),
            entity.getRecordId(),
            entity.getRecordData(),
            entity.getDeletedBy(),
            entity.getDeletedByName(),
            entity.getDeletionTimestamp(),
            entity.getDeletionReason(),
            entity.getIpAddress(),
            entity.getUserAgent()
        );
    }
}
