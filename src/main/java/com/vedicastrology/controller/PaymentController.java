package com.vedicastrology.controller;

import com.vedicastrology.dto.CourseDTO;
import com.vedicastrology.dto.PaymentDTO;
import com.vedicastrology.dto.UserCourseAccessDTO;
import com.vedicastrology.dto.EnrolledCourseDTO;
import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.dto.request.SecureRequestDTOs.SecureIdRequest;
import com.vedicastrology.dto.request.SecureRequestDTOs.SecureUserCourseRequest;
import com.vedicastrology.security.InputSanitizationService;
import com.vedicastrology.service.PaymentService;
import com.vedicastrology.service.FileUploadService;
import com.vedicastrology.entity.Payment;
import jakarta.validation.Valid;
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
    
    @Autowired
    private InputSanitizationService inputSanitizationService;

    @PostMapping("/get-all")
    public List<PaymentDTO> getAllPayments(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🔍 Fetching all payments");
        return paymentService.getAllPayments();
    }

    @PostMapping("/get-by-id")
    public ResponseEntity<?> getPaymentById(@Valid @RequestBody SecureIdRequest request) {
        Long id = request.getId();
        logger.info("🔍 Fetching payment with ID: {}", id);
        try {
            // Additional validation for ID
            if (id == null || id <= 0) {
                logger.warn("🚨 Invalid payment ID provided: {}", id);
                return ResponseEntity.badRequest().body("Invalid payment ID");
            }
            
            PaymentDTO payment = paymentService.getPaymentById(id);
            logger.info("✅ Fetched payment with ID: {}", id);
            return ResponseEntity.ok(payment);
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in get payment by ID: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error fetching payment with ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to fetch payment");
        }
    }

    // Get all payments for a specific user
    @PostMapping("/get-by-user")
    public ResponseEntity<?> getPaymentsByUserId(@Valid @RequestBody SecureIdRequest request) {
        Long loginId = request.getId();
        logger.info("🔍 Fetching payments for user ID: {}", loginId);
        try {
            // Additional validation for ID
            if (loginId == null || loginId <= 0) {
                logger.warn("🚨 Invalid user ID provided: {}", loginId);
                return ResponseEntity.badRequest().body("Invalid user ID");
            }
            
            List<PaymentDTO> payments = paymentService.getPaymentsByUserId(loginId);
            logger.info("✅ Fetched {} payments for user ID: {}", payments.size(), loginId);
            return ResponseEntity.ok(payments);
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in get payments by user: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error fetching payments for user {}: {}", loginId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to fetch payments");
        }
    }

    // Get user's enrolled courses (My Courses)
    @PostMapping("/user/enrolled-courses")
    public ResponseEntity<?> getUserEnrolledCourses(@Valid @RequestBody SecureIdRequest request) {
        Long loginId = request.getId();
        logger.info("🔍 Fetching enrolled courses for user ID: {}", loginId);
        try {
            if (loginId == null || loginId <= 0) {
                return ResponseEntity.badRequest().body("Invalid user ID");
            }
            List<CourseDTO> courses = paymentService.getUserEnrolledCourses(loginId);
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            logger.error("💥 Error fetching enrolled courses for user {}: {}", loginId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to fetch courses");
        }
    }

    // Get user's enrolled courses with payment status (including pending)
    @PostMapping("/user/enrolled-courses-with-status")
    public ResponseEntity<?> getUserEnrolledCoursesWithStatus(@Valid @RequestBody SecureIdRequest request) {
        Long loginId = request.getId();
        logger.info("🔍 Fetching enrolled courses with status for user ID: {}", loginId);
        try {
            if (loginId == null || loginId <= 0) {
                return ResponseEntity.badRequest().body("Invalid user ID");
            }
            List<EnrolledCourseDTO> courses = paymentService.getUserEnrolledCoursesWithStatus(loginId);
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            logger.error("💥 Error fetching enrolled courses with status for user {}: {}", loginId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to fetch courses");
        }
    }

    // Check if user has access to a specific course
    @PostMapping("/user/course/access")
    public ResponseEntity<?> checkUserCourseAccess(@Valid @RequestBody SecureUserCourseRequest request) {
        Long loginId = request.getUserId();
        Long courseId = request.getCourseId();
        logger.info("🔍 Checking course access for user ID: {} and course ID: {}", loginId, courseId);
        try {
            if (loginId == null || loginId <= 0 || courseId == null || courseId <= 0) {
                return ResponseEntity.badRequest().body("Invalid user ID or course ID");
            }
            Boolean hasAccess = paymentService.checkUserCourseAccess(loginId, courseId);
            return ResponseEntity.ok(hasAccess);
        } catch (Exception e) {
            logger.error("💥 Error checking course access for user {} and course {}: {}", loginId, courseId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to check access");
        }
    }

    // Get user course access information for all courses they have paid for
    @PostMapping("/user/course-access")
    public ResponseEntity<?> getUserCourseAccessList(@Valid @RequestBody SecureIdRequest request) {
        Long loginId = request.getId();
        logger.info("🔍 Fetching course access list for user ID: {}", loginId);
        try {
            if (loginId == null || loginId <= 0) {
                return ResponseEntity.badRequest().body("Invalid user ID");
            }
            List<UserCourseAccessDTO> accessList = paymentService.getUserCourseAccessList(loginId);
            return ResponseEntity.ok(accessList);
        } catch (Exception e) {
            logger.error("💥 Error fetching course access list for user {}: {}", loginId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to fetch access list");
        }
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

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestBody PaymentDTO dto) {
        try {
            // Sanitize payment-related text fields
            if (dto.getPaymentMethod() != null) {
                String sanitizedMethod = inputSanitizationService.sanitizeString(dto.getPaymentMethod(), "paymentMethod");
                dto.setPaymentMethod(sanitizedMethod);
            }
            if (dto.getTransactionId() != null) {
                String sanitizedTxnId = inputSanitizationService.sanitizeString(dto.getTransactionId(), "transactionId");
                dto.setTransactionId(sanitizedTxnId);
            }
            
            PaymentDTO created = paymentService.createPayment(dto);
            logger.info("✅ Created payment with ID: {}", created.getPaymentId());
            return ResponseEntity.ok(created);
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in create payment: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid payment data: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error creating payment: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to create payment");
        }
    }

    @PutMapping("/{id}")
    public PaymentDTO updatePayment(@PathVariable Long id, @RequestBody PaymentDTO dto) {
        return paymentService.updatePayment(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePayment(@PathVariable Long id) {
        try {
            // Add authorization check - only allow admins or payment owner to delete
            Long currentUserId = getCurrentUserId();
            logger.info("🗑️ Attempting to delete payment ID: {} by user: {}", id, currentUserId);
            
            paymentService.deletePayment(id);
            logger.info("✅ Payment deleted successfully: {}", id);
            return ResponseEntity.ok().body("Payment deleted successfully");
        } catch (Exception e) {
            logger.error("❌ Failed to delete payment ID: {} - {}", id, e.getMessage(), e);
            return ResponseEntity.badRequest().body("Failed to delete payment: " + e.getMessage());
        }
    }

    // Enhanced secure payment creation with proof upload
    @PostMapping("/with-proof")
    public ResponseEntity<?> createPaymentWithProof(
            @RequestParam("loginId") Long loginId,
            @RequestParam("courseId") Long courseId,
            @RequestParam("amount") BigDecimal amount,
            @RequestParam("paymentMethod") String paymentMethod,
            @RequestParam("transactionId") String transactionId,
            @RequestParam(value = "comments", required = false) String comments,
            @RequestParam("paymentProof") MultipartFile paymentProof) {
        
        logger.info("🔐 Starting secure payment creation with proof for user: {}, course: {}", loginId, courseId);
        
        try {
            // 1. Validate input parameters
            if (loginId == null || courseId == null || amount == null || 
                paymentMethod == null || transactionId == null) {
                return ResponseEntity.badRequest().body("Missing required parameters");
            }

            // 2. Validate amount is positive
            if (amount.compareTo(BigDecimal.ZERO) <= 0) {
                return ResponseEntity.badRequest().body("Amount must be positive");
            }

            // 3. Validate transaction ID format (prevent injection)
            if (transactionId.trim().isEmpty() || transactionId.length() > 100) {
                return ResponseEntity.badRequest().body("Invalid transaction ID");
            }

            // 4. Sanitize payment method
            String sanitizedPaymentMethod = paymentMethod.trim().replaceAll("[^a-zA-Z0-9\\s_-]", "");
            if (sanitizedPaymentMethod.isEmpty() || sanitizedPaymentMethod.length() > 50) {
                return ResponseEntity.badRequest().body("Invalid payment method");
            }

            // 5. Sanitize comments if provided
            String sanitizedComments = null;
            if (comments != null && !comments.trim().isEmpty()) {
                sanitizedComments = comments.trim().substring(0, Math.min(comments.trim().length(), 500));
                // Remove potentially dangerous characters
                sanitizedComments = sanitizedComments.replaceAll("[<>\"'&]", "");
            }

            // 6. Validate file (security validation happens in FileUploadService)
            if (paymentProof == null || paymentProof.isEmpty()) {
                return ResponseEntity.badRequest().body("Payment proof file is required");
            }

            // 7. Upload payment proof file with security validation
            String paymentProofUrl;
            try {
                paymentProofUrl = fileUploadService.uploadPaymentProof(paymentProof);
                logger.info("✅ Payment proof uploaded successfully: {}", paymentProofUrl);
            } catch (IllegalArgumentException e) {
                logger.warn("🚫 File validation failed: {}", e.getMessage());
                return ResponseEntity.badRequest().body("File validation failed: " + e.getMessage());
            } catch (Exception e) {
                logger.error("❌ File upload failed: {}", e.getMessage(), e);
                return ResponseEntity.status(500).body("File upload failed. Please try again.");
            }
            
            // 8. Create payment DTO with validated data
            PaymentDTO paymentDTO = new PaymentDTO();
            paymentDTO.setLoginId(loginId);
            paymentDTO.setCourseId(courseId);
            paymentDTO.setAmount(amount);
            paymentDTO.setPaymentMethod(sanitizedPaymentMethod);
            paymentDTO.setTransactionId(transactionId.trim());
            paymentDTO.setComments(sanitizedComments);
            paymentDTO.setPaymentProofUrl(paymentProofUrl);
            paymentDTO.setStatus("pending"); // Set status as pending for verification
            
            // 9. Create payment
            PaymentDTO createdPayment = paymentService.createPayment(paymentDTO);
            
            logger.info("✅ Payment created successfully with ID: {} for user: {}", 
                       createdPayment.getPaymentId(), loginId);
            
            return ResponseEntity.ok(createdPayment);
            
        } catch (Exception e) {
            logger.error("❌ Failed to create payment with proof for user: {} - {}", loginId, e.getMessage(), e);
            return ResponseEntity.status(500).body("Failed to create payment. Please try again.");
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
