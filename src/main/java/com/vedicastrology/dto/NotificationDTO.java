package com.vedicastrology.dto;

import java.time.LocalDateTime;

public class NotificationDTO {
    private Long notificationId;
    private Long loginId;
    private String title;
    private String message;
    private Boolean isRead;
    private String notificationType;
    private LocalDateTime createdAt;

    // Getters and setters
    public Long getNotificationId() { return notificationId; }
    public void setNotificationId(Long notificationId) { this.notificationId = notificationId; }
    public Long getLoginId() { return loginId; }
    public void setLoginId(Long loginId) { this.loginId = loginId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }
    public String getNotificationType() { return notificationType; }
    public void setNotificationType(String notificationType) { this.notificationType = notificationType; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
