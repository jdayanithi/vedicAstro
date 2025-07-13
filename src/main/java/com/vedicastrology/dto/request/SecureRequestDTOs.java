package com.vedicastrology.dto.request;

import com.vedicastrology.security.validation.SearchSafe;
import com.vedicastrology.security.validation.SqlSafe;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

/**
 * 🛡️ Secure Request DTOs with SQL injection prevention
 */
public class SecureRequestDTOs {
    
    /**
     * Secure search request with validation
     */
    public static class SecureSearchRequest {
        @SearchSafe(fieldName = "searchQuery", maxLength = 100)
        private String query;
        
        @Min(value = 0, message = "Page number must be non-negative")
        @Max(value = 1000, message = "Page number too large")
        private Integer page = 0;
        
        @Min(value = 1, message = "Page size must be at least 1")
        @Max(value = 100, message = "Page size cannot exceed 100")
        private Integer size = 20;
        
        // Constructors
        public SecureSearchRequest() {}
        
        public SecureSearchRequest(String query) {
            this.query = query;
        }
        
        public SecureSearchRequest(String query, Integer page, Integer size) {
            this.query = query;
            this.page = page;
            this.size = size;
        }
        
        // Getters and setters
        public String getQuery() { return query; }
        public void setQuery(String query) { this.query = query; }
        
        public Integer getPage() { return page; }
        public void setPage(Integer page) { this.page = page; }
        
        public Integer getSize() { return size; }
        public void setSize(Integer size) { this.size = size; }
    }
    
    /**
     * Secure ID request with validation
     */
    public static class SecureIdRequest {
        @NotNull(message = "ID is required")
        @Min(value = 1, message = "ID must be positive")
        @Max(value = Long.MAX_VALUE, message = "ID value too large")
        private Long id;
        
        public SecureIdRequest() {}
        
        public SecureIdRequest(Long id) {
            this.id = id;
        }
        
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
    }
    
    /**
     * Secure text input request
     */
    public static class SecureTextRequest {
        @SqlSafe(fieldName = "text", maxLength = 1000, allowEmpty = false)
        private String text;
        
        public SecureTextRequest() {}
        
        public SecureTextRequest(String text) {
            this.text = text;
        }
        
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
    }
    
    /**
     * Secure user input for forms
     */
    public static class SecureUserInputRequest {
        @SqlSafe(fieldName = "firstName", maxLength = 50, allowEmpty = false)
        private String firstName;
        
        @SqlSafe(fieldName = "lastName", maxLength = 50, allowEmpty = false)
        private String lastName;
        
        @SqlSafe(fieldName = "username", maxLength = 50, allowEmpty = false)
        private String username;
        
        @SqlSafe(fieldName = "email", maxLength = 100, allowEmpty = false)
        private String email;
        
        public SecureUserInputRequest() {}
        
        // Getters and setters
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }
    
    /**
     * Secure course input request
     */
    public static class SecureCourseRequest {
        @SqlSafe(fieldName = "title", maxLength = 200, allowEmpty = false)
        private String title;
        
        @SqlSafe(fieldName = "description", maxLength = 2000, allowEmpty = true)
        private String description;
        
        @NotNull(message = "Category ID is required")
        @Min(value = 1, message = "Category ID must be positive")
        private Long categoryId;
        
        @SqlSafe(fieldName = "difficultyLevel", maxLength = 20, allowEmpty = false)
        private String difficultyLevel;
        
        @Min(value = 0, message = "Price cannot be negative")
        @Max(value = 999999, message = "Price too large")
        private Double price;
        
        @Min(value = 1, message = "Duration must be at least 1 hour")
        @Max(value = 1000, message = "Duration cannot exceed 1000 hours")
        private Integer durationHours;
        
        public SecureCourseRequest() {}
        
        // Getters and setters
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
        
        public String getDifficultyLevel() { return difficultyLevel; }
        public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }
        
        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }
        
        public Integer getDurationHours() { return durationHours; }
        public void setDurationHours(Integer durationHours) { this.durationHours = durationHours; }
    }
    
    /**
     * Secure course update request with validation
     */
    public static class SecureCourseUpdateRequest {
        @NotNull(message = "ID is required")
        @Min(value = 1, message = "ID must be positive")
        private Long id;
        
        @SqlSafe(fieldName = "title", maxLength = 200, allowEmpty = false)
        private String title;
        
        @SqlSafe(fieldName = "description", maxLength = 2000, allowEmpty = true)
        private String description;
        
        @NotNull(message = "Login ID is required")
        @Min(value = 1, message = "Login ID must be positive")
        private Long loginId;
        
        @NotNull(message = "Category ID is required")
        @Min(value = 1, message = "Category ID must be positive")
        private Long categoryId;
        
        @SqlSafe(fieldName = "difficultyLevel", maxLength = 20, allowEmpty = false)
        private String difficultyLevel;
        
        @Min(value = 0, message = "Price cannot be negative")
        @Max(value = 999999, message = "Price too large")
        private Double price;
        
        @Min(value = 1, message = "Duration must be at least 1 hour")
        @Max(value = 1000, message = "Duration cannot exceed 1000 hours")
        private Integer durationHours;
        
        @SqlSafe(fieldName = "thumbnailUrl", maxLength = 500, allowEmpty = true)
        private String thumbnailUrl;
        
        private Boolean isPublished;
        
        public SecureCourseUpdateRequest() {}
        
        // Getters and setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public Long getLoginId() { return loginId; }
        public void setLoginId(Long loginId) { this.loginId = loginId; }
        
        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
        
        public String getDifficultyLevel() { return difficultyLevel; }
        public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }
        
        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }
        
        public Integer getDurationHours() { return durationHours; }
        public void setDurationHours(Integer durationHours) { this.durationHours = durationHours; }
        
        public String getThumbnailUrl() { return thumbnailUrl; }
        public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
        
        public Boolean getIsPublished() { return isPublished; }
        public void setIsPublished(Boolean isPublished) { this.isPublished = isPublished; }
    }
    
    /**
     * Secure pagination request
     */
    public static class SecurePaginationRequest {
        @Min(value = 0, message = "Page number must be non-negative")
        @Max(value = 1000, message = "Page number too large")
        private Integer page = 0;
        
        @Min(value = 1, message = "Page size must be at least 1")
        @Max(value = 100, message = "Page size cannot exceed 100")
        private Integer size = 20;
        
        @SqlSafe(fieldName = "sortBy", maxLength = 50, allowEmpty = true)
        private String sortBy;
        
        @SqlSafe(fieldName = "sortDirection", maxLength = 10, allowEmpty = true)
        private String sortDirection = "ASC";
        
        public SecurePaginationRequest() {}
        
        public SecurePaginationRequest(Integer page, Integer size) {
            this.page = page;
            this.size = size;
        }
        
        // Getters and setters
        public Integer getPage() { return page; }
        public void setPage(Integer page) { this.page = page; }
        
        public Integer getSize() { return size; }
        public void setSize(Integer size) { this.size = size; }
        
        public String getSortBy() { return sortBy; }
        public void setSortBy(String sortBy) { this.sortBy = sortBy; }
        
        public String getSortDirection() { return sortDirection; }
        public void setSortDirection(String sortDirection) { this.sortDirection = sortDirection; }
    }
    
    /**
     * Secure tag update request with validation
     */
    public static class SecureTagUpdateRequest {
        @NotNull(message = "ID is required")
        @Min(value = 1, message = "ID must be positive")
        private Long id;
        
        @SqlSafe(fieldName = "tagName", maxLength = 50, allowEmpty = false)
        private String tagName;
        
        public SecureTagUpdateRequest() {}
        
        public SecureTagUpdateRequest(Long id, String tagName) {
            this.id = id;
            this.tagName = tagName;
        }
        
        // Getters and setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getTagName() { return tagName; }
        public void setTagName(String tagName) { this.tagName = tagName; }
    }
    
    /**
     * Secure lesson update request with validation
     */
    public static class SecureLessonUpdateRequest {
        @NotNull(message = "ID is required")
        @Min(value = 1, message = "ID must be positive")
        private Long id;
        
        @SqlSafe(fieldName = "title", maxLength = 200, allowEmpty = false)
        private String title;
        
        @SqlSafe(fieldName = "richDescription", maxLength = 50000, allowEmpty = true)
        private String description;
        
        @SqlSafe(fieldName = "richContent", maxLength = 100000, allowEmpty = true)
        private String content;
        
        @NotNull(message = "Topic ID is required")
        @Min(value = 1, message = "Topic ID must be positive")
        private Long topicId;
        
        @Min(value = 1, message = "Order index must be positive")
        private Integer orderIndex;
        
        public SecureLessonUpdateRequest() {}
        
        // Getters and setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        
        public Long getTopicId() { return topicId; }
        public void setTopicId(Long topicId) { this.topicId = topicId; }
        
        public Integer getOrderIndex() { return orderIndex; }
        public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }
    }
    
    /**
     * Secure login request with validation
     */
    public static class SecureLoginRequest {
        @SqlSafe(fieldName = "username", maxLength = 100, allowEmpty = false)
        private String username;
        
        @SqlSafe(fieldName = "password", maxLength = 255, allowEmpty = false)
        private String password;
        
        public SecureLoginRequest() {}
        
        public SecureLoginRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }
        
        // Getters and setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    /**
     * Secure user course request with validation
     */
    public static class SecureUserCourseRequest {
        @NotNull(message = "User ID is required")
        @Min(value = 1, message = "User ID must be positive")
        private Long userId;
        
        @NotNull(message = "Course ID is required")
        @Min(value = 1, message = "Course ID must be positive")
        private Long courseId;
        
        public SecureUserCourseRequest() {}
        
        public SecureUserCourseRequest(Long userId, Long courseId) {
            this.userId = userId;
            this.courseId = courseId;
        }
        
        // Getters and setters
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        
        public Long getCourseId() { return courseId; }
        public void setCourseId(Long courseId) { this.courseId = courseId; }
    }
}
