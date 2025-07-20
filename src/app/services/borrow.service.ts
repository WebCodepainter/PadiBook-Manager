import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borrow } from '../models/borrow.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {
  private apiUrl = 'http://localhost:8080/api/borrows';

  constructor(private http: HttpClient) {}

  requestBorrow(borrow: Borrow): Observable<Borrow> {
    return this.http.post<Borrow>(this.apiUrl, borrow);
  }

  confirmBorrow(id: number): Observable<Borrow> {
    return this.http.put<Borrow>(`${this.apiUrl}/${id}/confirm`, {});
  }

  getBorrows(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(this.apiUrl);
  }
}
