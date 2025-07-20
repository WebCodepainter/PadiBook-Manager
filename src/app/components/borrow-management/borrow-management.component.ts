import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BorrowService } from '../../services/borrow.service';
import { AuthService } from '../../services/auth.service';
import { Borrow } from '../../models/borrow.model';

@Component({
  selector: 'app-borrow-management',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './borrow-management.component.html',
  styleUrls: ['./borrow-management.component.scss']
})
export class BorrowManagementComponent implements OnInit {
  borrows: Borrow[] = [];

  constructor(private borrowService: BorrowService, public authService: AuthService) {}

  ngOnInit() {
    this.borrowService.getBorrows().subscribe(borrows => this.borrows = borrows);
  }

  confirmBorrow(id: number) {
    this.borrowService.confirmBorrow(id).subscribe(() => {
      this.borrows = this.borrows.map(borrow =>
        borrow.id === id ? { ...borrow, returned: false } : borrow
      );
    });
  }
}
