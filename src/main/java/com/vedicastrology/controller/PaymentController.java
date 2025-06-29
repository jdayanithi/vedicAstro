package com.vedicastrology.controller;

import com.vedicastrology.dto.CourseDTO;
import com.vedicastrology.dto.PaymentDTO;
import com.vedicastrology.dto.UserCourseAccessDTO;
import com.vedicastrology.dto.EnrolledCourseDTO;
import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.IdRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.UserIdRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.UserCourseRequest;
import com.vedicastrology.service.PaymentService;
import com.vedicastrology.service.FileUploadService;
import com.vedicastrology.entity.Payment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/secure/payments")
public class PaymentController {

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/get-all")
    public List<PaymentDTO> getAllPayments(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🔍 Fetching all payments");
        return paymentService.getAllPayments();
    }

    @PostMapping("/get-by-id")
    public PaymentDTO getPaymentById(@RequestBody IdRequest request) {
        Long id = request.getId();
        logger.info("🔍 Fetching payment with ID: {}", id);
        return paymentService.getPaymentById(id);
    }

    // Get all payments for a specific user
    @PostMapping("/get-by-user")
    public List<PaymentDTO> getPaymentsByUserId(@RequestBody UserIdRequest request) {
        Long loginId = request.getLoginId();
        logger.info("🔍 Fetching payments for user ID: {}", loginId);
        return paymentService.getPaymentsByUserId(loginId);
    }

    // Get user's enrolled courses (My Courses)
    @PostMapping("/user/enrolled-courses")
    public List<CourseDTO> getUserEnrolledCourses(@RequestBody UserIdRequest request) {
        Long loginId = request.getLoginId();
        logger.info("🔍 Fetching enrolled courses for user ID: {}", loginId);
        return paymentService.getUserEnrolledCourses(loginId);
    }

    // Get user's enrolled courses with payment status (including pending)
    @PostMapping("/user/enrolled-courses-with-status")
    public List<EnrolledCourseDTO> getUserEnrolledCoursesWithStatus(@RequestBody UserIdRequest request) {
        Long loginId = request.getLoginId();
        logger.info("🔍 Fetching enrolled courses with status for user ID: {}", loginId);
        return paymentService.getUserEnrolledCoursesWithStatus(loginId);
    }

    // Check if user has access to a specific course
    @PostMapping("/user/course/access")
    public Boolean checkUserCourseAccess(@RequestBody UserCourseRequest request) {
        Long loginId = request.getLoginId();
        Long courseId = request.getCourseId();
        logger.info("🔍 Checking course access for user ID: {} and course ID: {}", loginId, courseId);
        return paymentService.checkUserCourseAccess(loginId, courseId);
    }

    // Get user course access information for all courses they have paid for
    @PostMapping("/user/course-access")
    public List<UserCourseAccessDTO> getUserCourseAccessList(@RequestBody UserIdRequest request) {
        Long loginId = request.getLoginId();
        logger.info("🔍 Fetching course access list for user ID: {}", loginId);
        return paymentService.getUserCourseAccessList(loginId);
    }

    // Get current user's enrolled courses (using JWT token)
    @PostMapping("/current-user/enrolled-courses")
    public List<CourseDTO> getCurrentUserEnrolledCourses(@RequestBody(required = false) EmptyRequest request) {
        Long loginId = getCurrentUserId();
        logger.info("🔍 Fetching enrolled courses for current user ID: {}", loginId);
        return paymentService.getUserEnrolledCourses(loginId);
    }

    // Get current user's enrolled courses with payment status (using JWT token)
    @PostMapping("/current-user/enrolled-courses-with-status")
    public List<EnrolledCourseDTO> getCurrentUserEnrolledCoursesWithStatus(@RequestBody(required = false) EmptyRequest request) {
        Long loginId = getCurrentUserId();
        logger.info("🔍 Fetching enrolled courses with status for current user ID: {}", loginId);
        return paymentService.getUserEnrolledCoursesWithStatus(loginId);
    }

    // Get current user's course access information (using JWT token)
    @PostMapping("/current-user/course-access")
    public List<UserCourseAccessDTO> getCurrentUserCourseAccessList(@RequestBody(required = false) EmptyRequest request) {
        Long loginId = getCurrentUserId();
        logger.info("🔍 Fetching course access list for current user ID: {}", loginId);
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

    // Create payment with proof upload
    @PostMapping("/with-proof")
    public ResponseEntity<?> createPaymentWithProof(
            @RequestParam("loginId") Long loginId,
            @RequestParam("courseId") Long courseId,
            @RequestParam("amount") BigDecimal amount,
            @RequestParam("paymentMethod") String paymentMethod,
            @RequestParam("transactionId") String transactionId,
            @RequestParam(value = "comments", required = false) String comments,
            @RequestParam("paymentProof") MultipartFile paymentProof) {
        
        try {
            // Upload payment proof file
            String paymentProofUrl = fileUploadService.uploadPaymentProof(paymentProof);
            
            // Create payment DTO
            PaymentDTO paymentDTO = new PaymentDTO();
            paymentDTO.setLoginId(loginId);
            paymentDTO.setCourseId(courseId);
            paymentDTO.setAmount(amount);
            paymentDTO.setPaymentMethod(paymentMethod);
            paymentDTO.setTransactionId(transactionId);
            paymentDTO.setComments(comments);
            paymentDTO.setPaymentProofUrl(paymentProofUrl);
            paymentDTO.setStatus("pending"); // Set status as pending for verification
            
            // Create payment
            PaymentDTO createdPayment = paymentService.createPayment(paymentDTO);
            
            return ResponseEntity.ok(createdPayment);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create payment: " + e.getMessage());
        }
    }

    // Debug endpoint to check all payments with status
    @PostMapping("/debug/all-payments")
    public ResponseEntity<?> getAllPaymentsDebug(@RequestBody(required = false) EmptyRequest request) {
        try {
            logger.debug("🔍 Fetching all payments for debug");
            List<Payment> payments = paymentService.getAllPaymentsRaw();
            return ResponseEntity.ok(payments.stream()
                .map(p -> {
                    return new Object() {
                        public final Long paymentId = p.getPaymentId();
                        public final Long loginId = p.getLogin() != null ? p.getLogin().getId() : null;
                        public final Long courseId = p.getCourse() != null ? p.getCourse().getCourseId() : null;
                        public final String courseName = p.getCourse() != null ? p.getCourse().getTitle() : null;
                        public final BigDecimal amount = p.getAmount();
                        public final String status = p.getStatus() != null ? p.getStatus().name() : "NULL";
                        public final String paymentMethod = p.getPaymentMethod();
                        public final String transactionId = p.getTransactionId();
                    };
                })
                .toList());
        } catch (Exception e) {
            logger.error("❌ Error fetching all payments for debug: {}", e.getMessage(), e);
            return ResponseEntity.ok("Error: " + e.getMessage());
        }
    }
}
