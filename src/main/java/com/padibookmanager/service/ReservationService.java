package com.padibookmanager.service;

import com.padibookmanager.model.Book;
import com.padibookmanager.model.Reservation;
import com.padibookmanager.model.Notification;
import com.padibookmanager.repository.BookRepository;
import com.padibookmanager.repository.ReservationRepository;
import com.padibookmanager.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final BookRepository bookRepository;
    private final NotificationRepository notificationRepository;

    public ReservationService(ReservationRepository reservationRepository, BookRepository bookRepository, NotificationRepository notificationRepository) {
        this.reservationRepository = reservationRepository;
        this.bookRepository = bookRepository;
        this.notificationRepository = notificationRepository;
    }

    public Reservation reserveBook(Reservation reservation) {
        Book book = bookRepository.findById(reservation.getBookId()).orElseThrow(() -> new RuntimeException("Book not found"));
        if (book.isAvailable()) {
            throw new RuntimeException("Book is available");
        }
        reservation.setReservationDate(LocalDate.now());
        Reservation savedReservation = reservationRepository.save(reservation);
        createNotification(reservation.getUserId(), "RESERVATION", "User");
        return savedReservation;
    }

    public List<Reservation> getReservations() {
        return reservationRepository.findAll();
    }

    public void cancelReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    private void createNotification(Long userId, String operation, String userName) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setOperation(operation);
        notification.setUserName(userName);
        notification.setDate(LocalDate.now());
        notificationRepository.save(notification);
    }
}