package com.vedicastrology.dto.request;

/**
 * Common request DTOs used across multiple controllers
 */
public class CommonRequestDTOs {

    /**
     * Empty request class for endpoints that don't need request parameters
     */
    public static class EmptyRequest {
        public EmptyRequest() {}
    }

    /**
     * Request class for endpoints that need an ID parameter
     */
    public static class IdRequest {
        private Long id;
        
        public IdRequest() {}
        public IdRequest(Long id) { this.id = id; }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
    }

    /**
     * Request class for endpoints that need a user/login ID parameter
     */
    public static class UserIdRequest {
        private Long loginId;
        
        public UserIdRequest() {}
        public UserIdRequest(Long loginId) { this.loginId = loginId; }
        public Long getLoginId() { return loginId; }
        public void setLoginId(Long loginId) { this.loginId = loginId; }
    }

    /**
     * Request class for endpoints that need both user and course ID parameters
     */
    public static class UserCourseRequest {
        private Long loginId;
        private Long courseId;
        
        public UserCourseRequest() {}
        public UserCourseRequest(Long loginId, Long courseId) { 
            this.loginId = loginId; 
            this.courseId = courseId; 
        }
        
        public Long getLoginId() { return loginId; }
        public void setLoginId(Long loginId) { this.loginId = loginId; }
        public Long getCourseId() { return courseId; }
        public void setCourseId(Long courseId) { this.courseId = courseId; }
    }

    /**
     * Request class for endpoints that need a parent ID parameter
     */
    public static class ParentIdRequest {
        private Long parentId;
        
        public ParentIdRequest() {}
        public ParentIdRequest(Long parentId) { this.parentId = parentId; }
        public Long getParentId() { return parentId; }
        public void setParentId(Long parentId) { this.parentId = parentId; }
    }

    /**
     * Request class for endpoints that need a course ID parameter
     */
    public static class CourseIdRequest {
        private Long courseId;
        
        public CourseIdRequest() {}
        public CourseIdRequest(Long courseId) { this.courseId = courseId; }
        public Long getCourseId() { return courseId; }
        public void setCourseId(Long courseId) { this.courseId = courseId; }
    }

    /**
     * Request class for endpoints that need a topic ID parameter
     */
    public static class TopicIdRequest {
        private Long topicId;
        
        public TopicIdRequest() {}
        public TopicIdRequest(Long topicId) { this.topicId = topicId; }
        public Long getTopicId() { return topicId; }
        public void setTopicId(Long topicId) { this.topicId = topicId; }
    }

    /**
     * Request class for endpoints that need a lesson ID parameter
     */
    public static class LessonIdRequest {
        private Long lessonId;
        
        public LessonIdRequest() {}
        public LessonIdRequest(Long lessonId) { this.lessonId = lessonId; }
        public Long getLessonId() { return lessonId; }
        public void setLessonId(Long lessonId) { this.lessonId = lessonId; }
    }

    /**
     * Request class for endpoints that need a tag ID parameter
     */
    public static class TagIdRequest {
        private Long tagId;
        
        public TagIdRequest() {}
        public TagIdRequest(Long tagId) { this.tagId = tagId; }
        public Long getTagId() { return tagId; }
        public void setTagId(Long tagId) { this.tagId = tagId; }
    }

    /**
     * Request class for endpoints that need lesson ID and content type
     */
    public static class LessonContentTypeRequest {
        private Long lessonId;
        private String contentType;
        
        public LessonContentTypeRequest() {}
        public LessonContentTypeRequest(Long lessonId, String contentType) { 
            this.lessonId = lessonId; 
            this.contentType = contentType; 
        }
        
        public Long getLessonId() { return lessonId; }
        public void setLessonId(Long lessonId) { this.lessonId = lessonId; }
        public String getContentType() { return contentType; }
        public void setContentType(String contentType) { this.contentType = contentType; }
    }

    /**
     * Request class for endpoints that need a planet parameter
     */
    public static class PlanetRequest {
        private String planet;
        
        public PlanetRequest() {}
        public PlanetRequest(String planet) { this.planet = planet; }
        public String getPlanet() { return planet; }
        public void setPlanet(String planet) { this.planet = planet; }
    }

    /**
     * Request class for endpoints that need a zodiac parameter
     */
    public static class ZodiacRequest {
        private String zodiac;
        
        public ZodiacRequest() {}
        public ZodiacRequest(String zodiac) { this.zodiac = zodiac; }
        public String getZodiac() { return zodiac; }
        public void setZodiac(String zodiac) { this.zodiac = zodiac; }
    }

    /**
     * Request class for search endpoints
     */
    public static class SearchRequest {
        private String query;
        
        public SearchRequest() {}
        public SearchRequest(String query) { this.query = query; }
        public String getQuery() { return query; }
        public void setQuery(String query) { this.query = query; }
    }

    /**
     * Request class for paginated keynote endpoints
     */
    public static class PaginatedKeynoteRequest {
        private int page;
        private int size;
        private Long lessonId;
        private String contentType;
        private Boolean importantOnly;
        private String search;
        
        public PaginatedKeynoteRequest() {}
        
        public int getPage() { return page; }
        public void setPage(int page) { this.page = page; }
        public int getSize() { return size; }
        public void setSize(int size) { this.size = size; }
        public Long getLessonId() { return lessonId; }
        public void setLessonId(Long lessonId) { this.lessonId = lessonId; }
        public String getContentType() { return contentType; }
        public void setContentType(String contentType) { this.contentType = contentType; }
        public Boolean getImportantOnly() { return importantOnly; }
        public void setImportantOnly(Boolean importantOnly) { this.importantOnly = importantOnly; }
        public String getSearch() { return search; }
        public void setSearch(String search) { this.search = search; }
    }

    /**
     * Request class for keynote and tag relevance operations
     */
    public static class KeynoteTagRelevanceRequest {
        private Long keynoteId;
        private Long tagId;
        private Integer minScore;
        
        public KeynoteTagRelevanceRequest() {}
        public KeynoteTagRelevanceRequest(Long keynoteId, Long tagId, Integer minScore) { 
            this.keynoteId = keynoteId; 
            this.tagId = tagId;
            this.minScore = minScore;
        }
        
        public Long getKeynoteId() { return keynoteId; }
        public void setKeynoteId(Long keynoteId) { this.keynoteId = keynoteId; }
        public Long getTagId() { return tagId; }
        public void setTagId(Long tagId) { this.tagId = tagId; }
        public Integer getMinScore() { return minScore; }
        public void setMinScore(Integer minScore) { this.minScore = minScore; }
    }

    /**
     * Request class for tag name searches
     */
    public static class TagNameRequest {
        private String tagName;
        
        public TagNameRequest() {}
        public TagNameRequest(String tagName) { this.tagName = tagName; }
        public String getTagName() { return tagName; }
        public void setTagName(String tagName) { this.tagName = tagName; }
    }

    /**
     * Request class for keynote ID operations
     */
    public static class KeynoteIdRequest {
        private Long keynoteId;
        
        public KeynoteIdRequest() {}
        public KeynoteIdRequest(Long keynoteId) { this.keynoteId = keynoteId; }
        public Long getKeynoteId() { return keynoteId; }
        public void setKeynoteId(Long keynoteId) { this.keynoteId = keynoteId; }
    }

    /**
     * Request class for post ID operations
     */
    public static class PostIdRequest {
        private Long postId;
        
        public PostIdRequest() {}
        public PostIdRequest(Long postId) { this.postId = postId; }
        public Long getPostId() { return postId; }
        public void setPostId(Long postId) { this.postId = postId; }
    }

    /**
     * Request class for name-based searches
     */
    public static class NameRequest {
        private String name;
        
        public NameRequest() {}
        public NameRequest(String name) { this.name = name; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }
}
