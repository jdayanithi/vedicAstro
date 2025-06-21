package com.vedicastrology.repository;

import com.vedicastrology.entity.Payment;
import com.vedicastrology.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    // Find all payments for a specific user
    List<Payment> findByLoginId(Long loginId);
    
    // Find all successful payments for a specific user
    List<Payment> findByLoginIdAndStatus(Long loginId, PaymentStatus status);
    
    // Find payment for a specific user and course
    Payment findByLoginIdAndCourseCourseIdAndStatus(Long loginId, Long courseId, PaymentStatus status);
    
    // Get all courses that a user has successfully paid for
    @Query("SELECT DISTINCT p.course FROM Payment p WHERE p.login.id = :loginId AND p.status = :status")
    List<com.vedicastrology.entity.Course> findCoursesByLoginIdAndStatus(@Param("loginId") Long loginId, @Param("status") PaymentStatus status);
    
    // Check if user has access to a specific course
    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Payment p WHERE p.login.id = :loginId AND p.course.courseId = :courseId AND p.status = 'completed'")
    boolean hasUserAccessToCourse(@Param("loginId") Long loginId, @Param("courseId") Long courseId);

    // Get all payments for a user (including pending ones) with course details
    @Query("SELECT p FROM Payment p JOIN FETCH p.course WHERE p.login.id = :loginId ORDER BY p.paymentDate DESC")
    List<Payment> findPaymentsWithCoursesByLoginId(@Param("loginId") Long loginId);
}
