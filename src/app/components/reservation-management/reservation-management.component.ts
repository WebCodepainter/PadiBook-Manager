import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-reservation-management',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.scss']
})
export class ReservationManagementComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService, public authService: AuthService) {}

  ngOnInit() {
    this.reservationService.getReservations().subscribe(reservations => this.reservations = reservations);
  }

  cancelReservation(id: number) {
    this.reservationService.cancelReservation(id).subscribe(() => {
      this.reservations = this.reservations.filter(res => res.id !== id);
    });
  }
}
