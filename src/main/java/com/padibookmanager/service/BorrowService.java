package com.padibookmanager.service;

import com.padibookmanager.model.Book;
import com.padibookmanager.model.Borrow;
import com.padibookmanager.model.Notification;
import com.padibookmanager.repository.BookRepository;
import com.padibookmanager.repository.BorrowRepository;
import com.padibookmanager.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BorrowService {
    private final BorrowRepository borrowRepository;
    private final BookRepository bookRepository;
    private final NotificationRepository notificationRepository;

    public BorrowService(BorrowRepository borrowRepository, BookRepository bookRepository, NotificationRepository notificationRepository) {
        this.borrowRepository = borrowRepository;
        this.bookRepository = bookRepository;
        this.notificationRepository = notificationRepository;
    }

    public Borrow requestBorrow(Borrow borrow) {
        Book book = bookRepository.findById(borrow.getBookId()).orElseThrow(() -> new RuntimeException("Book not found"));
        if (!book.isAvailable()) {
            throw new RuntimeException("Book not available");
        }
        borrow.setBorrowDate(LocalDate.now());
        borrow.setDueDate(LocalDate.now().plusDays(14));
        borrow.setReturned(false);
        book.setAvailable(false);
        bookRepository.save(book);
        Borrow savedBorrow = borrowRepository.save(borrow);
        createNotification(borrow.getUserId(), "BORROW", "User");
        return savedBorrow;
    }

    public Borrow confirmBorrow(Long id) {
        Borrow borrow = borrowRepository.findById(id).orElseThrow(() -> new RuntimeException("Borrow not found"));
        borrow.setReturned(false);
        return borrowRepository.save(borrow);
    }

    public List<Borrow> getBorrows() {
        return borrowRepository.findAll();
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