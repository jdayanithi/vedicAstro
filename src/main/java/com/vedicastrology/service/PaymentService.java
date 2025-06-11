package com.vedicastrology.service;

import com.vedicastrology.dto.PaymentDTO;
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
        payment.setAmount(dto.getAmount());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setTransactionId(dto.getTransactionId());
        payment.setStatus(PaymentStatus.valueOf(dto.getStatus()));
        payment.setPaymentDate(dto.getPaymentDate());
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

    private PaymentDTO toDTO(Payment payment) {
        PaymentDTO dto = new PaymentDTO();
        dto.setPaymentId(payment.getPaymentId());
        dto.setLoginId(payment.getLogin().getId());
        dto.setCourseId(payment.getCourse().getCourseId());
        dto.setAmount(payment.getAmount());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setTransactionId(payment.getTransactionId());
        dto.setStatus(payment.getStatus().name());
        dto.setPaymentDate(payment.getPaymentDate());
        return dto;
    }

    private Payment toEntity(PaymentDTO dto) {
        Payment payment = new Payment();
        payment.setAmount(dto.getAmount());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setTransactionId(dto.getTransactionId());
        payment.setStatus(PaymentStatus.valueOf(dto.getStatus()));
        payment.setPaymentDate(dto.getPaymentDate());
        Login login = loginRepository.findById(dto.getLoginId())
                .orElseThrow(() -> new EntityNotFoundException("Login not found"));
        payment.setLogin(login);
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));
        payment.setCourse(course);
        return payment;
    }
}
