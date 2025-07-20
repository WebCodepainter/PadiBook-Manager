import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-catalog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.scss']
})
export class BookCatalogComponent implements OnInit {
  books: Book[] = [];
  searchQuery = '';

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

  searchBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books.filter(book =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  }

  borrowBook(id: number) {
    // Implement borrow logic
  }

  reserveBook(id: number) {
    // Implement reserve logic
  }

  downloadBook(pdfUrl?: string) {
    window.open(pdfUrl, '_blank');
  }
}
