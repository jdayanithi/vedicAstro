package com.vedicastrology.controller;

import com.vedicastrology.dto.NotificationDTO;
import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.IdRequest;
import com.vedicastrology.dto.request.CommonRequestDTOs.UserIdRequest;
import com.vedicastrology.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/secure/notifications")
public class NotificationController {
    private static final Logger logger = LoggerFactory.getLogger(NotificationController.class);
    
    @Autowired
    private NotificationService notificationService;

    @PostMapping("/get-all")
    public List<NotificationDTO> getAll(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🔍 Fetching all notifications");
        List<NotificationDTO> notifications = notificationService.getAll();
        logger.info("✅ Fetched {} notifications", notifications.size());
        return notifications;
    }

    @PostMapping("/get-by-user")
    public List<NotificationDTO> getByLoginId(@RequestBody UserIdRequest request) {
        Long loginId = request.getLoginId();
        logger.info("🔍 Fetching notifications for user ID: {}", loginId);
        List<NotificationDTO> notifications = notificationService.getByLoginId(loginId);
        logger.info("✅ Fetched {} notifications for user ID: {}", notifications.size(), loginId);
        return notifications;
    }

    @PostMapping("/get-by-id")
    public NotificationDTO getById(@RequestBody IdRequest request) {
        Long id = request.getId();
        logger.info("🔍 Fetching notification with ID: {}", id);
        NotificationDTO notification = notificationService.getById(id);
        logger.info("✅ Fetched notification: {}", notification.getTitle());
        return notification;
    }

    @PostMapping
    public NotificationDTO create(@RequestBody NotificationDTO dto) {
        return notificationService.create(dto);
    }

    @PutMapping("/{id}")
    public NotificationDTO update(@PathVariable Long id, @RequestBody NotificationDTO dto) {
        return notificationService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        notificationService.delete(id);
    }
}
