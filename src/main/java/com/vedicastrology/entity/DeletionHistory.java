package com.vedicastrology.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "deletion_history")
public class DeletionHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "table_name", nullable = false)
    private String tableName;
    
    @Column(name = "record_id", nullable = false)
    private Long recordId;
    
    @Column(name = "record_data", columnDefinition = "TEXT")
    private String recordData; // JSON representation of the deleted record
    
    @Column(name = "deleted_by", nullable = false)
    private Long deletedBy; // User ID who performed the deletion
    
    @Column(name = "deleted_by_name")
    private String deletedByName; // User name for easier tracking
    
    @Column(name = "deletion_timestamp", nullable = false)
    private LocalDateTime deletionTimestamp;
    
    @Column(name = "deletion_reason")
    private String deletionReason;
    
    @Column(name = "ip_address")
    private String ipAddress;
    
    @Column(name = "user_agent")
    private String userAgent;

    // Constructors
    public DeletionHistory() {
        this.deletionTimestamp = LocalDateTime.now();
    }

    public DeletionHistory(String tableName, Long recordId, String recordData, Long deletedBy, String deletedByName) {
        this();
        this.tableName = tableName;
        this.recordId = recordId;
        this.recordData = recordData;
        this.deletedBy = deletedBy;
        this.deletedByName = deletedByName;
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
