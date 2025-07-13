import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/profile`);
  }

  updatePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {
    const payload = { 
      oldPassword: oldPassword, 
      newPassword: newPassword 
    };
    console.log('Sending password update request:', {
      url: `${this.apiUrl}/${userId}/password`,
      payload: payload
    });
    return this.http.put(`${this.apiUrl}/${userId}/password`, payload);
  }

  getOrganizationalUnits(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/organizational-units`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('/api/users');
  }
} 