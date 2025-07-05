package com.vedicastrology.entity;

public enum ImageCategory {
    LESSON_CONTENT("Lesson Content"),
    TOPIC_THUMBNAIL("Topic Thumbnail"),
    COURSE_BANNER("Course Banner"),
    ILLUSTRATION("Illustration"),
    DIAGRAM("Diagram"),
    ICON("Icon"),
    BACKGROUND("Background"),
    PROFILE("Profile"),
    GENERAL("General"),
    MARKETING("Marketing");
    
    private final String displayName;
    
    ImageCategory(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
    
    @Override
    public String toString() {
        return displayName;
    }
}
