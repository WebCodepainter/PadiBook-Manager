import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Penalty } from '../models/penalty.model';

@Injectable({
  providedIn: 'root'
})
export class PenaltyService {
  private apiUrl = 'https://localhost:8080/api/penalties';

  constructor(private http: HttpClient) {}

  getPenalties(): Observable<Penalty[]> {
    return this.http.get<Penalty[]>(this.apiUrl);
  }

  markPenaltyPaid(id: number): Observable<Penalty> {
    return this.http.put<Penalty>(`${this.apiUrl}/${id}/paid`, {});
  }
}
