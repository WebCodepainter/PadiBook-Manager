import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  currentUser: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => {
        this.currentUser = user;
        this.currentUserSubject.next(user);
      })
    );
  }

  register(name: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, { name, email, password }).pipe(
      tap(user => {
        this.currentUser = user;
        this.currentUserSubject.next(user);
      })
    );
  }

  logout() {
    this.currentUser = null;
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'ADMIN';
  }
}
