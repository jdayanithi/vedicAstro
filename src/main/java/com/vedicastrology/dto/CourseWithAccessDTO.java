package com.vedicastrology.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CourseWithAccessDTO {
    // Course basic information
    private Long courseId;
    private String title;
    private String description;
    private Long loginId;
    private Long categoryId;
    private String categoryName;
    private String difficultyLevel;
    private BigDecimal price;
    private Integer durationHours;
    private String thumbnailUrl;
    private Boolean isPublished;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Payment and access information
    private Boolean hasAccess;
    private String paymentStatus; // null (no payment), pending, completed, failed, refunded
    private LocalDateTime paymentDate;
    private String transactionId;
    private BigDecimal paidAmount;
    private String paymentMethod;
    private String paymentProofUrl;
    private LocalDateTime expiryDate;
    
    // Course type classification
    private Boolean isFree;
    private Boolean isPaid;
    private Boolean isEnrolled; // User has made any payment (including pending)
    private Boolean canAccess; // User can actually access the course content

    // Constructors
    public CourseWithAccessDTO() {}

    // Getters and setters
    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Long getLoginId() { return loginId; }
    public void setLoginId(Long loginId) { this.loginId = loginId; }
    
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    
    public String getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public Integer getDurationHours() { return durationHours; }
    public void setDurationHours(Integer durationHours) { this.durationHours = durationHours; }
    
    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    
    public Boolean getIsPublished() { return isPublished; }
    public void setIsPublished(Boolean isPublished) { this.isPublished = isPublished; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public Boolean getHasAccess() { return hasAccess; }
    public void setHasAccess(Boolean hasAccess) { this.hasAccess = hasAccess; }
    
    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    
    public LocalDateTime getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }
    
    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    
    public BigDecimal getPaidAmount() { return paidAmount; }
    public void setPaidAmount(BigDecimal paidAmount) { this.paidAmount = paidAmount; }
    
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    
    public String getPaymentProofUrl() { return paymentProofUrl; }
    public void setPaymentProofUrl(String paymentProofUrl) { this.paymentProofUrl = paymentProofUrl; }
    
    public LocalDateTime getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDateTime expiryDate) { this.expiryDate = expiryDate; }
    
    public Boolean getIsFree() { return isFree; }
    public void setIsFree(Boolean isFree) { this.isFree = isFree; }
    
    public Boolean getIsPaid() { return isPaid; }
    public void setIsPaid(Boolean isPaid) { this.isPaid = isPaid; }
    
    public Boolean getIsEnrolled() { return isEnrolled; }
    public void setIsEnrolled(Boolean isEnrolled) { this.isEnrolled = isEnrolled; }
    
    public Boolean getCanAccess() { return canAccess; }
    public void setCanAccess(Boolean canAccess) { this.canAccess = canAccess; }
}
