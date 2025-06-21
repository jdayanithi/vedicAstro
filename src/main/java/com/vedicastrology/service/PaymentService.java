package com.vedicastrology.service;

import com.vedicastrology.dto.CourseDTO;
import com.vedicastrology.dto.PaymentDTO;
import com.vedicastrology.dto.UserCourseAccessDTO;
import com.vedicastrology.dto.EnrolledCourseDTO;
import com.vedicastrology.entity.Course;
import com.vedicastrology.entity.Login;
import com.vedicastrology.entity.Payment;
import com.vedicastrology.entity.PaymentStatus;
import com.vedicastrology.repository.CourseRepository;
import com.vedicastrology.repository.LoginRepository;
import com.vedicastrology.repository.PaymentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private CourseRepository courseRepository;

    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public PaymentDTO getPaymentById(Long id) {
        return paymentRepository.findById(id).map(this::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found"));
    }

    public PaymentDTO createPayment(PaymentDTO dto) {
        Payment payment = toEntity(dto);
        return toDTO(paymentRepository.save(payment));
    }

    public PaymentDTO updatePayment(Long id, PaymentDTO dto) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found"));
        payment.setAmount(dto.getAmount());        payment.setPaymentMethod(dto.getPaymentMethod());        payment.setTransactionId(dto.getTransactionId());        payment.setStatus(PaymentStatus.valueOf(dto.getStatus()));
        payment.setPaymentDate(dto.getPaymentDate());
        payment.setExpiryDate(dto.getExpiryDate());
        
        // Set createdBy and modifiedBy Login objects
        if (dto.getCreatedBy() != null) {
            Login createdByLogin = loginRepository.findById(dto.getCreatedBy())
                    .orElseThrow(() -> new EntityNotFoundException("CreatedBy Login not found"));
            payment.setCreatedBy(createdByLogin);
        }
        if (dto.getModifiedBy() != null) {
            Login modifiedByLogin = loginRepository.findById(dto.getModifiedBy())
                    .orElseThrow(() -> new EntityNotFoundException("ModifiedBy Login not found"));
            payment.setModifiedBy(modifiedByLogin);
        }
        
        payment.setComments(dto.getComments());
        // Update login and course if changed
        if (!payment.getLogin().getId().equals(dto.getLoginId())) {
            Login login = loginRepository.findById(dto.getLoginId())
                    .orElseThrow(() -> new EntityNotFoundException("Login not found"));
            payment.setLogin(login);
        }
        if (!payment.getCourse().getCourseId().equals(dto.getCourseId())) {
            Course course = courseRepository.findById(dto.getCourseId())
                    .orElseThrow(() -> new EntityNotFoundException("Course not found"));
            payment.setCourse(course);
        }
        return toDTO(paymentRepository.save(payment));
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }

    // Get all payments for a specific user
    public List<PaymentDTO> getPaymentsByUserId(Long loginId) {
        return paymentRepository.findByLoginId(loginId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Get user's enrolled courses (courses they have successfully paid for)
    public List<com.vedicastrology.dto.CourseDTO> getUserEnrolledCourses(Long loginId) {
        List<com.vedicastrology.entity.Course> courses = 
            paymentRepository.findCoursesByLoginIdAndStatus(loginId, PaymentStatus.completed);
        return courses.stream()
                .map(this::courseToCourseDTO)
                .collect(Collectors.toList());
    }

    // Get user's enrolled courses with payment status (including pending)
    public List<EnrolledCourseDTO> getUserEnrolledCoursesWithStatus(Long loginId) {
        List<Payment> payments = paymentRepository.findPaymentsWithCoursesByLoginId(loginId);
        return payments.stream()
                .map(this::paymentToEnrolledCourseDTO)
                .collect(Collectors.toList());
    }

    // Check if user has access to a specific course
    public boolean checkUserCourseAccess(Long loginId, Long courseId) {
        return paymentRepository.hasUserAccessToCourse(loginId, courseId);
    }

    // Get user course access information
    public List<UserCourseAccessDTO> getUserCourseAccessList(Long loginId) {
        List<Payment> payments = paymentRepository.findByLoginIdAndStatus(loginId, PaymentStatus.completed);
        return payments.stream()
                .map(this::toUserCourseAccessDTO)
                .collect(Collectors.toList());
    }    // Helper method to convert Course entity to CourseDTO
    private com.vedicastrology.dto.CourseDTO courseToCourseDTO(com.vedicastrology.entity.Course course) {
        com.vedicastrology.dto.CourseDTO dto = new com.vedicastrology.dto.CourseDTO();
        dto.setCourseId(course.getCourseId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setLoginId(course.getLoginId()); // loginId is a direct field in Course
        dto.setCategoryId(course.getCategoryId()); // categoryId is a direct field in Course
        dto.setDifficultyLevel(course.getDifficultyLevel() != null ? course.getDifficultyLevel().name() : null);
        dto.setPrice(course.getPrice());
        dto.setDurationHours(course.getDurationHours());
        dto.setThumbnailUrl(course.getThumbnailUrl());
        dto.setIsPublished(course.getIsPublished());
        dto.setCreatedAt(course.getCreatedAt());
        dto.setUpdatedAt(course.getUpdatedAt());
        return dto;
    }

    // Helper method to convert Payment to UserCourseAccessDTO
    private UserCourseAccessDTO toUserCourseAccessDTO(Payment payment) {
        UserCourseAccessDTO dto = new UserCourseAccessDTO();
        dto.setCourseId(payment.getCourse().getCourseId());
        dto.setHasAccess(payment.getStatus() == PaymentStatus.completed);
        dto.setPaymentStatus(payment.getStatus().name());
        dto.setPaymentDate(payment.getPaymentDate());
        dto.setExpiryDate(payment.getExpiryDate());
        return dto;
    }

    private PaymentDTO toDTO(Payment payment) {
        PaymentDTO dto = new PaymentDTO();
        dto.setPaymentId(payment.getPaymentId());
        dto.setLoginId(payment.getLogin().getId());
        dto.setCourseId(payment.getCourse().getCourseId());
        dto.setAmount(payment.getAmount());        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setTransactionId(payment.getTransactionId());        dto.setStatus(payment.getStatus().name());
        dto.setPaymentDate(payment.getPaymentDate());
        dto.setExpiryDate(payment.getExpiryDate());
        dto.setCreatedBy(payment.getCreatedBy() != null ? payment.getCreatedBy().getId() : null);
        dto.setModifiedBy(payment.getModifiedBy() != null ? payment.getModifiedBy().getId() : null);
        dto.setComments(payment.getComments());
        dto.setPaymentProofUrl(payment.getPaymentProofUrl());
        return dto;
    }

    private Payment toEntity(PaymentDTO dto) {
        Payment payment = new Payment();
        payment.setAmount(dto.getAmount());
        payment.setPaymentMethod(dto.getPaymentMethod());        payment.setTransactionId(dto.getTransactionId());        payment.setStatus(PaymentStatus.valueOf(dto.getStatus()));
        payment.setPaymentDate(dto.getPaymentDate());
        payment.setExpiryDate(dto.getExpiryDate());
        
        // Set createdBy and modifiedBy Login objects
        if (dto.getCreatedBy() != null) {
            Login createdByLogin = loginRepository.findById(dto.getCreatedBy())
                    .orElseThrow(() -> new EntityNotFoundException("CreatedBy Login not found"));
            payment.setCreatedBy(createdByLogin);
        }
        if (dto.getModifiedBy() != null) {
            Login modifiedByLogin = loginRepository.findById(dto.getModifiedBy())
                    .orElseThrow(() -> new EntityNotFoundException("ModifiedBy Login not found"));
            payment.setModifiedBy(modifiedByLogin);
        }
        
        payment.setComments(dto.getComments());
        payment.setPaymentProofUrl(dto.getPaymentProofUrl());
        Login login = loginRepository.findById(dto.getLoginId())
                .orElseThrow(() -> new EntityNotFoundException("Login not found"));
        payment.setLogin(login);
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));
        payment.setCourse(course);
        return payment;
    }

    // Helper method to convert Payment with Course to EnrolledCourseDTO
    private EnrolledCourseDTO paymentToEnrolledCourseDTO(Payment payment) {
        EnrolledCourseDTO dto = new EnrolledCourseDTO();
        
        // Course details
        com.vedicastrology.entity.Course course = payment.getCourse();
        dto.setCourseId(course.getCourseId());
        dto.setTitle(course.getTitle());        dto.setDescription(course.getDescription());
        dto.setLoginId(course.getLoginId());
        dto.setCategoryId(course.getCategoryId());
        dto.setDifficultyLevel(course.getDifficultyLevel() != null ? course.getDifficultyLevel().name() : null);
        dto.setPrice(course.getPrice());
        dto.setDurationHours(course.getDurationHours());
        dto.setThumbnailUrl(course.getThumbnailUrl());
        dto.setIsPublished(course.getIsPublished());
        dto.setCreatedAt(course.getCreatedAt());
        dto.setUpdatedAt(course.getUpdatedAt());
        
        // Payment details
        dto.setPaymentStatus(payment.getStatus().name());
        dto.setPaymentDate(payment.getPaymentDate());
        dto.setTransactionId(payment.getTransactionId());
        dto.setPaidAmount(payment.getAmount());
        dto.setPaymentMethod(payment.getPaymentMethod());
        
        return dto;
    }
}
