package com.vedicastrology.dto;

import java.time.LocalDateTime;

public class DeletionHistoryDTO {
    
    private Long id;
    private String tableName;
    private Long recordId;
    private String recordData;
    private Long deletedBy;
    private String deletedByName;
    private LocalDateTime deletionTimestamp;
    private String deletionReason;
    private String ipAddress;
    private String userAgent;

    // Constructors
    public DeletionHistoryDTO() {}

    public DeletionHistoryDTO(Long id, String tableName, Long recordId, String recordData, 
                             Long deletedBy, String deletedByName, LocalDateTime deletionTimestamp, 
                             String deletionReason, String ipAddress, String userAgent) {
        this.id = id;
        this.tableName = tableName;
        this.recordId = recordId;
        this.recordData = recordData;
        this.deletedBy = deletedBy;
        this.deletedByName = deletedByName;
        this.deletionTimestamp = deletionTimestamp;
        this.deletionReason = deletionReason;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public Long getRecordId() {
        return recordId;
    }

    public void setRecordId(Long recordId) {
        this.recordId = recordId;
    }

    public String getRecordData() {
        return recordData;
    }

    public void setRecordData(String recordData) {
        this.recordData = recordData;
    }

    public Long getDeletedBy() {
        return deletedBy;
    }

    public void setDeletedBy(Long deletedBy) {
        this.deletedBy = deletedBy;
    }

    public String getDeletedByName() {
        return deletedByName;
    }

    public void setDeletedByName(String deletedByName) {
        this.deletedByName = deletedByName;
    }

    public LocalDateTime getDeletionTimestamp() {
        return deletionTimestamp;
    }

    public void setDeletionTimestamp(LocalDateTime deletionTimestamp) {
        this.deletionTimestamp = deletionTimestamp;
    }

    public String getDeletionReason() {
        return deletionReason;
    }

    public void setDeletionReason(String deletionReason) {
        this.deletionReason = deletionReason;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }
}
