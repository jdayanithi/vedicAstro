package com.vedicastrology.service;

import com.vedicastrology.dto.NotificationDTO;
import com.vedicastrology.entity.Login;
import com.vedicastrology.entity.Notification;
import com.vedicastrology.repository.LoginRepository;
import com.vedicastrology.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private LoginRepository loginRepository;

    public List<NotificationDTO> getAll() {
        return notificationRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }    public List<NotificationDTO> getByLoginId(Long loginId) {
        // Get both user-specific notifications and broadcast notifications
        List<Notification> userNotifications = notificationRepository.findByLogin_Id(loginId);
        List<Notification> broadcastNotifications = notificationRepository.findByIsBroadcastTrue();
        
        userNotifications.addAll(broadcastNotifications);
        return userNotifications.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public NotificationDTO getById(Long id) {
        return notificationRepository.findById(id).map(this::toDTO).orElse(null);
    }    @Transactional
    public NotificationDTO create(NotificationDTO dto) {
        Notification notification = new Notification();
        
        // Handle broadcast vs specific user notifications
        if (dto.getIsBroadcast() != null && dto.getIsBroadcast()) {
            notification.setIsBroadcast(true);
            notification.setLogin(null); // No specific user for broadcast
        } else {
            if (dto.getLoginId() == null) {
                throw new IllegalArgumentException("Login ID is required for non-broadcast notifications");
            }
            Login login = loginRepository.findById(dto.getLoginId()).orElseThrow();
            notification.setLogin(login);
            notification.setIsBroadcast(false);
        }
        
        notification.setTitle(dto.getTitle());
        notification.setMessage(dto.getMessage());
        notification.setIsRead(dto.getIsRead() != null ? dto.getIsRead() : false);
        notification.setNotificationType(dto.getNotificationType());
        notification.setStartDate(dto.getStartDate());
        notification.setExpiryDate(dto.getExpiryDate());
        Notification saved = notificationRepository.save(notification);
        return toDTO(saved);
    }@Transactional
    public NotificationDTO update(Long id, NotificationDTO dto) {
        Notification notification = notificationRepository.findById(id).orElseThrow();
        if (dto.getTitle() != null) notification.setTitle(dto.getTitle());
        if (dto.getMessage() != null) notification.setMessage(dto.getMessage());
        if (dto.getIsRead() != null) notification.setIsRead(dto.getIsRead());
        if (dto.getNotificationType() != null) notification.setNotificationType(dto.getNotificationType());
        if (dto.getStartDate() != null) notification.setStartDate(dto.getStartDate());
        if (dto.getExpiryDate() != null) notification.setExpiryDate(dto.getExpiryDate());
        Notification saved = notificationRepository.save(notification);
        return toDTO(saved);
    }

    @Transactional
    public void delete(Long id) {
        notificationRepository.deleteById(id);
    }    private NotificationDTO toDTO(Notification n) {
        NotificationDTO dto = new NotificationDTO();
        dto.setNotificationId(n.getNotificationId());
        dto.setLoginId(n.getLogin() != null ? n.getLogin().getId() : null);
        dto.setIsBroadcast(n.getIsBroadcast());
        dto.setTitle(n.getTitle());
        dto.setMessage(n.getMessage());
        dto.setIsRead(n.getIsRead());
        dto.setNotificationType(n.getNotificationType());
        dto.setStartDate(n.getStartDate());
        dto.setExpiryDate(n.getExpiryDate());
        dto.setCreatedAt(n.getCreatedAt());
        return dto;
    }
}
