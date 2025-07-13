import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meeting {
  id?: number;
  title: string;
  time: string;
  location: string;
  type: string;
  userId: number;
  date: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class MeetingService {
  private baseUrl = '/api/meetings';

  constructor(private http: HttpClient) {}

  getMeetingsByUserId(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.baseUrl}?userId=${userId}`);
  }

  getMeetingsByUserIdAndDate(userId: number, date: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.baseUrl}/today?userId=${userId}&date=${date}`);
  }

  getMeetingById(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.baseUrl}/${id}`);
  }

  createMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(this.baseUrl, meeting);
  }

  updateMeeting(id: number, meeting: Meeting): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.baseUrl}/${id}`, meeting);
  }

  deleteMeeting(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
} 