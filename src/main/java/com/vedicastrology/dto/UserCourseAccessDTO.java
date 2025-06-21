package com.vedicastrology.dto;

import java.time.LocalDateTime;

public class UserCourseAccessDTO {
    private Long courseId;
    private Boolean hasAccess;
    private String paymentStatus;
    private LocalDateTime paymentDate;
    private LocalDateTime expiryDate;

    public UserCourseAccessDTO() {}

    public UserCourseAccessDTO(Long courseId, Boolean hasAccess, String paymentStatus, 
                              LocalDateTime paymentDate, LocalDateTime expiryDate) {
        this.courseId = courseId;
        this.hasAccess = hasAccess;
        this.paymentStatus = paymentStatus;
        this.paymentDate = paymentDate;
        this.expiryDate = expiryDate;
    }

    // Getters and setters
    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Boolean getHasAccess() {
        return hasAccess;
    }

    public void setHasAccess(Boolean hasAccess) {
        this.hasAccess = hasAccess;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }
}
