import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PenaltyService } from '../../services/penalty.service';
import { AuthService } from '../../services/auth.service';
import { Penalty } from '../../models/penalty.model';

@Component({
  selector: 'app-penalty-management',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './penalty-management.component.html',
  styleUrls: ['./penalty-management.component.scss']
})
export class PenaltyManagementComponent implements OnInit {
  penalties: Penalty[] = [];

  constructor(private penaltyService: PenaltyService, public authService: AuthService) {}

  ngOnInit() {
    this.penaltyService.getPenalties().subscribe(penalties => this.penalties = penalties);
  }

  markPaid(id: number) {
    this.penaltyService.markPenaltyPaid(id).subscribe(() => {
      this.penalties = this.penalties.map(penalty =>
        penalty.id === id ? { ...penalty, paid: true } : penalty
      );
    });
  }
}
