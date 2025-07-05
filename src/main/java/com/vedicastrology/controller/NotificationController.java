package com.vedicastrology.controller;

import com.vedicastrology.dto.NotificationDTO;
import com.vedicastrology.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/secure/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public List<NotificationDTO> getAll() {
        return notificationService.getAll();
    }

    @PostMapping("/get-all")
    public List<NotificationDTO> getAllPost(@RequestBody(required = false) Map<String, Object> request) {
        return notificationService.getAll();
    }

    @GetMapping("/user/{loginId}")
    public List<NotificationDTO> getByLoginId(@PathVariable Long loginId) {
        return notificationService.getByLoginId(loginId);
    }

    @PostMapping("/get-by-user")
    public List<NotificationDTO> getByLoginIdPost(@RequestBody Map<String, Object> request) {
        Long loginId = Long.valueOf(request.get("loginId").toString());
        return notificationService.getByLoginId(loginId);
    }

    @GetMapping("/{id}")
    public NotificationDTO getById(@PathVariable Long id) {
        return notificationService.getById(id);
    }

    @PostMapping("/get-by-id")
    public NotificationDTO getByIdPost(@RequestBody Map<String, Object> request) {
        Long id = Long.valueOf(request.get("id").toString());
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
