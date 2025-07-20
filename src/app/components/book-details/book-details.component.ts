import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBook(id).subscribe(book => this.book = book);
  }

  borrowBook() {
    // Implement borrow logic
  }

  reserveBook() {
    // Implement reserve logic
  }

  downloadBook() {
    if (this.book?.pdfUrl) {
      window.open(this.book.pdfUrl, '_blank');
    }
  }

  deleteBook() {
    if (this.book) {
      this.bookService.deleteBook(this.book.id).subscribe();
    }
  }
}
