import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Establishment } from '../models/establishment.model';

@Injectable({ providedIn: 'root' })
export class EstablishmentService {
  private apiUrl = '/api/establishments';

  constructor(private http: HttpClient) {}

  getEstablishments(): Observable<Establishment[]> {
    return this.http.get<Establishment[]>(this.apiUrl);
  }

  updateEstablishment(id: number, establishment: Establishment): Observable<Establishment> {
    return this.http.put<Establishment>(`${this.apiUrl}/${id}`, establishment);
  }
} 