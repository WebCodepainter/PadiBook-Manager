package com.padibookmanager.service;

import com.padibookmanager.model.Notification;
import com.padibookmanager.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getNotifications() {
        return notificationRepository.findAll();
    }
}