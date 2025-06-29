package com.vedicastrology.service;

import com.vedicastrology.dto.CourseWithAccessDTO;
import com.vedicastrology.entity.Course;
import com.vedicastrology.entity.Payment;
import com.vedicastrology.entity.PaymentStatus;
import com.vedicastrology.entity.Category;
import com.vedicastrology.repository.CourseRepository;
import com.vedicastrology.repository.PaymentRepository;
import com.vedicastrology.repository.CategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CourseAccessService {

    private static final Logger logger = LoggerFactory.getLogger(CourseAccessService.class);

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * Get all courses with access information for a specific user
     */
    public List<CourseWithAccessDTO> getCoursesWithAccess(Long userId) {
        logger.info("🔍 CourseAccessService: Getting courses with access for userId: {}", userId);
        
        // Get all published courses
        List<Course> allCourses = courseRepository.findByIsPublishedTrue();
        logger.info("📚 Found {} published courses", allCourses.size());
        
        // Get all payments for the user
        List<Payment> userPayments = userId != null ? 
            paymentRepository.findPaymentsWithCoursesByLoginId(userId) : 
            List.of();
        
        logger.info("💳 Found {} payments for user", userPayments.size());
        for (Payment payment : userPayments) {
            logger.debug("   Payment: courseId={}, status={}, amount={}, date={}", 
                        payment.getCourse().getCourseId(), payment.getStatus(), 
                        payment.getAmount(), payment.getPaymentDate());
        }
        
        // Create a map of course payments for quick lookup
        Map<Long, Payment> coursePaymentMap = userPayments.stream()
            .collect(Collectors.toMap(
                payment -> payment.getCourse().getCourseId(),
                payment -> payment,
                (existing, replacement) -> {
                    // Keep the most recent payment if multiple payments exist for same course
                    return existing.getPaymentDate().isAfter(replacement.getPaymentDate()) ? 
                        existing : replacement;
                }
            ));

        // Get categories for category names
        Map<Long, String> categoryMap = categoryRepository.findAll().stream()
            .collect(Collectors.toMap(Category::getCategoryId, Category::getName));

        // Convert courses to DTOs with access information
        return allCourses.stream()
            .map(course -> mapToCourseWithAccessDTO(course, coursePaymentMap.get(course.getCourseId()), categoryMap))
            .collect(Collectors.toList());
    }

    /**
     * Get courses with access information for anonymous users
     */
    public List<CourseWithAccessDTO> getCoursesWithoutAccess() {
        return getCoursesWithAccess(null);
    }

    /**
     * Get only enrolled courses for a user (with any payment status)
     */
    public List<CourseWithAccessDTO> getEnrolledCoursesWithAccess(Long userId) {
        List<CourseWithAccessDTO> allCourses = getCoursesWithAccess(userId);
        return allCourses.stream()
            .filter(course -> course.getIsEnrolled())
            .collect(Collectors.toList());
    }

    /**
     * Get only free courses
     */
    public List<CourseWithAccessDTO> getFreeCoursesWithAccess(Long userId) {
        List<CourseWithAccessDTO> allCourses = getCoursesWithAccess(userId);
        return allCourses.stream()
            .filter(course -> course.getIsFree())
            .collect(Collectors.toList());
    }

    /**
     * Get only paid courses
     */
    public List<CourseWithAccessDTO> getPaidCoursesWithAccess(Long userId) {
        List<CourseWithAccessDTO> allCourses = getCoursesWithAccess(userId);
        return allCourses.stream()
            .filter(course -> course.getIsPaid())
            .collect(Collectors.toList());
    }

    /**
     * Map Course entity to CourseWithAccessDTO with payment information
     */
    private CourseWithAccessDTO mapToCourseWithAccessDTO(Course course, Payment payment, Map<Long, String> categoryMap) {
        CourseWithAccessDTO dto = new CourseWithAccessDTO();
        
        // Basic course information
        dto.setCourseId(course.getCourseId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setLoginId(course.getLoginId());
        dto.setCategoryId(course.getCategoryId());
        dto.setCategoryName(categoryMap.get(course.getCategoryId()));
        dto.setDifficultyLevel(course.getDifficultyLevel() != null ? course.getDifficultyLevel().name() : null);
        dto.setPrice(course.getPrice());
        dto.setDurationHours(course.getDurationHours());
        dto.setThumbnailUrl(course.getThumbnailUrl());
        dto.setIsPublished(course.getIsPublished());
        dto.setCreatedAt(course.getCreatedAt());
        dto.setUpdatedAt(course.getUpdatedAt());
        
        // Determine course type
        boolean isFree = course.getPrice() == null || course.getPrice().compareTo(BigDecimal.ZERO) <= 0;
        dto.setIsFree(isFree);
        dto.setIsPaid(!isFree);
          
        // Payment and access information
        if (payment != null) {
            logger.debug("💰 Course {} ({}) has payment:", course.getCourseId(), course.getTitle());
            logger.debug("   Status: {}", payment.getStatus());
            logger.debug("   Amount: {}", payment.getAmount());
            logger.debug("   Date: {}", payment.getPaymentDate());
            
            dto.setIsEnrolled(true);
            String statusString = payment.getStatus() != null ? payment.getStatus().name() : "pending";
            dto.setPaymentStatus(statusString);
            dto.setPaymentDate(payment.getPaymentDate());
            dto.setTransactionId(payment.getTransactionId());
            dto.setPaidAmount(payment.getAmount());
            dto.setPaymentMethod(payment.getPaymentMethod());
            dto.setPaymentProofUrl(payment.getPaymentProofUrl());
            dto.setExpiryDate(payment.getExpiryDate());
            
            // Determine access
            PaymentStatus status = payment.getStatus() != null ? payment.getStatus() : PaymentStatus.pending;
            boolean hasAccess = isFree || status == PaymentStatus.completed;
            dto.setHasAccess(hasAccess);
            dto.setCanAccess(hasAccess);
            
            logger.debug("   Final DTO: isEnrolled={}, paymentStatus={}, hasAccess={}", 
                        dto.getIsEnrolled(), dto.getPaymentStatus(), dto.getHasAccess());
        } else {
            logger.debug("📝 Course {} ({}) has NO payment - isFree: {}", 
                        course.getCourseId(), course.getTitle(), isFree);
            
            // No payment found
            dto.setIsEnrolled(false);
            dto.setPaymentStatus(null);
            dto.setHasAccess(isFree); // Free courses are always accessible
            dto.setCanAccess(isFree);
        }
        
        return dto;
    }

    /**
     * Get single course by ID with access information for a specific user
     */
    public CourseWithAccessDTO getCourseByIdWithAccess(Long courseId, Long userId) {
        logger.info("🔍 CourseAccessService: Getting course {} with access for userId: {}", courseId, userId);
        
        // Get the specific course
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null || !course.getIsPublished()) {
            logger.warn("❌ Course not found or not published: {}", courseId);
            return null;
        }
        
        // Get payments for this specific course and user
        List<Payment> userPayments = userId != null ? 
            paymentRepository.findPaymentsWithCoursesByLoginIdAndCourseId(userId, courseId) : 
            List.of();
        
        // Convert to DTO with access information
        return convertToDTO(course, userPayments, userId);
    }

    /**
     * Convert course and payment information to DTO
     */
    private CourseWithAccessDTO convertToDTO(Course course, List<Payment> userPayments, Long userId) {
        // For simplicity, assuming only one payment per course per user in this context
        Payment payment = userPayments.isEmpty() ? null : userPayments.get(0);
        Map<Long, String> categoryMap = categoryRepository.findAll().stream()
            .collect(Collectors.toMap(Category::getCategoryId, Category::getName));
        return mapToCourseWithAccessDTO(course, payment, categoryMap);
    }
}
