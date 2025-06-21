package com.vedicastrology.controller;

import com.vedicastrology.dto.CourseDTO;
import com.vedicastrology.dto.PaymentDTO;
import com.vedicastrology.dto.UserCourseAccessDTO;
import com.vedicastrology.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public List<PaymentDTO> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public PaymentDTO getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }

    // Get all payments for a specific user
    @GetMapping("/user/{loginId}")
    public List<PaymentDTO> getPaymentsByUserId(@PathVariable Long loginId) {
        return paymentService.getPaymentsByUserId(loginId);
    }

    // Get user's enrolled courses (My Courses)
    @GetMapping("/user/{loginId}/enrolled-courses")
    public List<CourseDTO> getUserEnrolledCourses(@PathVariable Long loginId) {
        return paymentService.getUserEnrolledCourses(loginId);
    }

    // Check if user has access to a specific course
    @GetMapping("/user/{loginId}/course/{courseId}/access")
    public Boolean checkUserCourseAccess(@PathVariable Long loginId, @PathVariable Long courseId) {
        return paymentService.checkUserCourseAccess(loginId, courseId);
    }

    // Get user course access information for all courses they have paid for
    @GetMapping("/user/{loginId}/course-access")
    public List<UserCourseAccessDTO> getUserCourseAccessList(@PathVariable Long loginId) {
        return paymentService.getUserCourseAccessList(loginId);
    }

    // Get current user's enrolled courses (using JWT token)
    @GetMapping("/user/enrolled-courses")
    public List<CourseDTO> getCurrentUserEnrolledCourses() {
        Long loginId = getCurrentUserId();
        return paymentService.getUserEnrolledCourses(loginId);
    }

    // Get current user's course access information (using JWT token)
    @GetMapping("/user/course-access")
    public List<UserCourseAccessDTO> getCurrentUserCourseAccessList() {
        Long loginId = getCurrentUserId();
        return paymentService.getUserCourseAccessList(loginId);
    }    // Helper method to get current user ID from JWT token
    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            // The username in JWT is actually the user ID (we set it as user ID in login)
            String userIdString = authentication.getName();
            if (!userIdString.equals("anonymousUser")) {
                return Long.parseLong(userIdString);
            }
        }
        throw new RuntimeException("User not authenticated");
    }

    @PostMapping
    public PaymentDTO createPayment(@RequestBody PaymentDTO dto) {
        return paymentService.createPayment(dto);
    }

    @PutMapping("/{id}")
    public PaymentDTO updatePayment(@PathVariable Long id, @RequestBody PaymentDTO dto) {
        return paymentService.updatePayment(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
    }
}
