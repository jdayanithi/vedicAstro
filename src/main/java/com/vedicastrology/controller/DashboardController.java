package com.vedicastrology.controller;

import com.vedicastrology.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/secure/dashboard")
public class DashboardController {

    private static final Logger logger = LoggerFactory.getLogger(DashboardController.class);

    @Autowired
    private CourseService courseService;
    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private LoginService loginService;
    
    @Autowired
    private TagService tagService;
    
    @Autowired
    private CategoryService categoryService;
    
    @Autowired
    private TopicService topicService;
    
    @Autowired
    private LessonService lessonService;
    
    @Autowired
    private NotificationService notificationService;

    // Request DTO for empty request body
    public static class EmptyRequest {
        // Empty class for endpoints that don't need request parameters
    }

    @PostMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats(@RequestBody(required = false) EmptyRequest request) {
        try {
            logger.info("🔍 Fetching dashboard statistics");
            Map<String, Object> stats = new HashMap<>();
            // Get all data for statistics
            var courses = courseService.getAllCourses();
            var payments = paymentService.getAllPayments();
            var users = loginService.getAllLogins();
            var tags = tagService.getAllTags();
            var categories = categoryService.getAllCategories();
            var topics = topicService.getAllTopics();
            var lessons = lessonService.getAllLessons();
            var notifications = notificationService.getAll();
            
            // Calculate course statistics
            long publishedCourses = courses.stream()
                .mapToLong(course -> course.getIsPublished() != null && course.getIsPublished() ? 1 : 0)
                .sum();
            
            // Calculate payment statistics
            double totalPaymentAmount = payments.stream()
                .mapToDouble(payment -> payment.getAmount() != null ? payment.getAmount().doubleValue() : 0.0)
                .sum();
            
            stats.put("totalCourses", courses.size());
            stats.put("publishedCourses", publishedCourses);
            stats.put("unpublishedCourses", courses.size() - publishedCourses);
            stats.put("totalPayments", payments.size());
            stats.put("totalPaymentAmount", totalPaymentAmount);
            stats.put("totalUsers", users.size());
            stats.put("totalTags", tags.size());
            stats.put("totalCategories", categories.size());
            stats.put("totalTopics", topics.size());
            stats.put("totalLessons", lessons.size());
            stats.put("totalNotifications", notifications.size());
            
            logger.info("✅ Dashboard statistics fetched successfully");
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            logger.error("❌ Error fetching dashboard statistics: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/course-status")
    public ResponseEntity<List<Map<String, Object>>> getCourseStatusChart(@RequestBody(required = false) EmptyRequest request) {
        try {
            logger.info("🔍 Fetching course status chart data");
            var courses = courseService.getAllCourses();
            
            long published = courses.stream()
                .mapToLong(course -> course.getIsPublished() != null && course.getIsPublished() ? 1 : 0)
                .sum();
            long unpublished = courses.size() - published;
            
            List<Map<String, Object>> chartData = new ArrayList<>();
            
            Map<String, Object> publishedData = new HashMap<>();
            publishedData.put("name", "Published");
            publishedData.put("value", published);
            publishedData.put("color", "#4CAF50");
            chartData.add(publishedData);
            
            Map<String, Object> unpublishedData = new HashMap<>();
            unpublishedData.put("name", "Unpublished");
            unpublishedData.put("value", unpublished);
            unpublishedData.put("color", "#FF9800");
            chartData.add(unpublishedData);
            
            logger.info("✅ Course status chart data fetched successfully");
            return ResponseEntity.ok(chartData);
        } catch (Exception e) {
            logger.error("❌ Error fetching course status chart data: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/user-joining-trend")
    public ResponseEntity<List<Map<String, Object>>> getUserJoiningTrend(@RequestBody(required = false) EmptyRequest request) {
        try {
            logger.info("🔍 Fetching user joining trend data");
            var users = loginService.getAllLogins();
            Map<String, Integer> joinings = new HashMap<>();
            
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            for (var user : users) {
                if (user.getCreatedDate() != null) {
                    String date = user.getCreatedDate().format(formatter);
                    joinings.put(date, joinings.getOrDefault(date, 0) + 1);
                }
            }
            
            List<Map<String, Object>> trendData = new ArrayList<>();
            for (Map.Entry<String, Integer> entry : joinings.entrySet()) {
                Map<String, Object> dataPoint = new HashMap<>();
                dataPoint.put("date", entry.getKey());
                dataPoint.put("count", entry.getValue());
                trendData.add(dataPoint);
            }
            
            // Sort by date
            trendData.sort((a, b) -> ((String) a.get("date")).compareTo((String) b.get("date")));
            
            logger.info("✅ User joining trend data fetched successfully");
            return ResponseEntity.ok(trendData);
        } catch (Exception e) {
            logger.error("❌ Error fetching user joining trend data: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/payment-trend")
    public ResponseEntity<List<Map<String, Object>>> getPaymentTrend(@RequestBody(required = false) EmptyRequest request) {
        try {
            logger.info("🔍 Fetching payment trend data");
            var payments = paymentService.getAllPayments();
            Map<String, Map<String, Double>> monthlyData = new HashMap<>();
            
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");
            
            for (var payment : payments) {
                if (payment.getPaymentDate() != null) {
                    String month = payment.getPaymentDate().format(formatter);
                    Map<String, Double> data = monthlyData.getOrDefault(month, new HashMap<>());
                    data.put("amount", data.getOrDefault("amount", 0.0) + 
                        (payment.getAmount() != null ? payment.getAmount().doubleValue() : 0.0));
                    data.put("count", data.getOrDefault("count", 0.0) + 1);
                    monthlyData.put(month, data);
                }
            }
            
            List<Map<String, Object>> trendData = new ArrayList<>();
            for (Map.Entry<String, Map<String, Double>> entry : monthlyData.entrySet()) {
                Map<String, Object> dataPoint = new HashMap<>();
                dataPoint.put("month", entry.getKey());
                dataPoint.put("amount", entry.getValue().get("amount"));
                dataPoint.put("count", entry.getValue().get("count").intValue());
                trendData.add(dataPoint);
            }
            
            logger.info("✅ Payment trend data fetched successfully");
            return ResponseEntity.ok(trendData);
        } catch (Exception e) {
            logger.error("❌ Error fetching payment trend data: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/top-categories")
    public ResponseEntity<List<Map<String, Object>>> getTopCategories(@RequestBody(required = false) EmptyRequest request) {
        try {
            logger.info("🔍 Fetching top categories data");
            var categories = categoryService.getAllCategories();
            var courses = courseService.getAllCourses();
            
            Map<Long, Integer> categoryCount = new HashMap<>();
            for (var course : courses) {
                if (course.getCategoryId() != null) {
                    categoryCount.put(course.getCategoryId(), 
                        categoryCount.getOrDefault(course.getCategoryId(), 0) + 1);
                }
            }
            
            List<Map<String, Object>> chartData = new ArrayList<>();
            String[] colors = {"#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", 
                              "#FF9F40", "#C9CBCF", "#4BC0C0", "#FF6384", "#36A2EB"};
            
            int colorIndex = 0;
            for (var category : categories) {
                Map<String, Object> dataPoint = new HashMap<>();
                dataPoint.put("name", category.getName());
                dataPoint.put("value", categoryCount.getOrDefault(category.getCategoryId(), 0));
                dataPoint.put("color", colors[colorIndex % colors.length]);
                chartData.add(dataPoint);
                colorIndex++;
            }
            
            // Sort by value descending
            chartData.sort((a, b) -> Integer.compare((Integer) b.get("value"), (Integer) a.get("value")));
            
            logger.info("✅ Top categories data fetched successfully");
            return ResponseEntity.ok(chartData);
        } catch (Exception e) {
            logger.error("❌ Error fetching top categories data: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
