import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule, CommonModule, FormsModule],
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss']
})
export class BookManagementComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = { id: 0, title: '', author: '', isbn: '', available: true, downloadable: false };

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

  addBook() {
    this.bookService.addBook(this.newBook).subscribe(book => {
      this.books.push(book);
      this.newBook = { id: 0, title: '', author: '', isbn: '', available: true, downloadable: false };
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(book => book.id !== id);
    });
  }
}
