import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, FormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: User | null = null;
  theme = 'light';
  language = 'fr';

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.authService.currentUser;
    this.settingsService.theme$.subscribe(theme => this.theme = theme);
    this.settingsService.language$.subscribe(language => this.language = language);
  }

  updateProfile() {
    if (this.user) {
      this.userService.updateUser(this.user.id, this.user).subscribe({
        next: updatedUser => {
          this.user = updatedUser;
          this.authService.currentUser = updatedUser;
          alert('Profil mis à jour avec succès');
        },
        error: () => alert('Échec de la mise à jour du profil')
      });
    }
  }

  setTheme() {
    this.settingsService.setTheme(this.theme);
  }

  setLanguage() {
    this.settingsService.setLanguage(this.language);
  }

  logout() {
    this.authService.logout();
  }
}
