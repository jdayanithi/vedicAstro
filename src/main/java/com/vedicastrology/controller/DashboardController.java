package com.vedicastrology.controller;

import com.vedicastrology.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private CourseService courseService;
    
    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private UserService userService;
    
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

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        try {
            Map<String, Object> stats = new HashMap<>();
            
            // Get all data for statistics
            var courses = courseService.getAllCourses();
            var payments = paymentService.getAllPayments();
            var users = userService.getAllUsers();
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
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/course-status")
    public ResponseEntity<List<Map<String, Object>>> getCourseStatusChart() {
        try {
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
            
            return ResponseEntity.ok(chartData);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/user-joining-trend")
    public ResponseEntity<List<Map<String, Object>>> getUserJoiningTrend() {
        try {
            var users = userService.getAllUsers();
            Map<String, Integer> joinings = new HashMap<>();
            
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            
            for (var user : users) {
                if (user.getCreatedAt() != null) {
                    String date = user.getCreatedAt().format(formatter);
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
            
            return ResponseEntity.ok(trendData);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/payment-trend")
    public ResponseEntity<List<Map<String, Object>>> getPaymentTrend() {
        try {
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
            
            return ResponseEntity.ok(trendData);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/top-categories")
    public ResponseEntity<List<Map<String, Object>>> getTopCategories() {
        try {
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
                dataPoint.put("name", category.getTitle());
                dataPoint.put("value", categoryCount.getOrDefault(category.getCategoryId(), 0));
                dataPoint.put("color", colors[colorIndex % colors.length]);
                chartData.add(dataPoint);
                colorIndex++;
            }
            
            // Sort by value descending
            chartData.sort((a, b) -> Integer.compare((Integer) b.get("value"), (Integer) a.get("value")));
            
            return ResponseEntity.ok(chartData);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
