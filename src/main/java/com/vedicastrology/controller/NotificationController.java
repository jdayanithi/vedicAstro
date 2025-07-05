package com.vedicastrology.controller;

import com.vedicastrology.dto.NotificationDTO;
import com.vedicastrology.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/secure/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public List<NotificationDTO> getAll() {
        return notificationService.getAll();
    }

    @GetMapping("/user/{loginId}")
    public List<NotificationDTO> getByLoginId(@PathVariable Long loginId) {
        return notificationService.getByLoginId(loginId);
    }

    @GetMapping("/{id}")
    public NotificationDTO getById(@PathVariable Long id) {
        return notificationService.getById(id);
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
