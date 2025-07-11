package com.vedicastrology.repository;

import com.vedicastrology.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByLogin_Id(Long loginId);
    List<Notification> findByIsBroadcastTrue();
    List<Notification> findByIsBroadcastFalse();
}
