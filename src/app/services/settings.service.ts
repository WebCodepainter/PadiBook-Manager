import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private themeSubject = new BehaviorSubject<string>('light');
  private languageSubject = new BehaviorSubject<string>('fr');

  theme$ = this.themeSubject.asObservable();
  language$ = this.languageSubject.asObservable();

  setTheme(theme: string) {
    this.themeSubject.next(theme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }

  setLanguage(language: string) {
    this.languageSubject.next(language);
  }
}
