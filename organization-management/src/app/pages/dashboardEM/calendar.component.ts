import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MeetingService, Meeting } from '../../services/meeting.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatCalendar, MatDatepickerModule, MatInputModule],
  template: `
    <div class="calendar-fullscreen-root">
      <div class="calendar-title">
        <mat-icon>calendar_today</mat-icon> Calendar
      </div>
      <div class="fullscreen-calendar">
        <mat-calendar [(selected)]="selectedDate" [dateClass]="meetingDateClass"></mat-calendar>
      </div>
      <div *ngIf="selectedDate" class="selected-date">
        <div>Selected date: {{ selectedDate | date:'fullDate' }}</div>
        <div *ngIf="meetingsForSelectedDate.length > 0">
          <div class="meeting-list-title">Meetings for this day:</div>
          <mat-card *ngFor="let meeting of meetingsForSelectedDate" class="meeting-card">
            <div class="meeting-title">{{ meeting.title }}</div>
            <div class="meeting-time"><mat-icon>schedule</mat-icon> {{ meeting.time }}</div>
            <div class="meeting-location"><mat-icon>place</mat-icon> {{ meeting.location }}</div>
            <div class="meeting-type"><mat-icon>group</mat-icon> {{ meeting.type }}</div>
            <div *ngIf="meeting.description" class="meeting-desc">{{ meeting.description }}</div>
          </mat-card>
        </div>
        <div *ngIf="meetingsForSelectedDate.length === 0" class="no-meetings">No meetings for this day.</div>
      </div>
    </div>
  `,
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  selectedDate: Date | null = null;
  allMeetings: Meeting[] = [];
  meetingsForSelectedDate: Meeting[] = [];

  constructor(private meetingService: MeetingService) {}

  ngOnInit() {
    this.reloadMeetings();
  }

  ngDoCheck() {
    this.updateMeetingsForSelectedDate();
  }

  updateMeetingsForSelectedDate() {
    if (!this.selectedDate) {
      this.meetingsForSelectedDate = [];
      return;
    }
    const selected = this.selectedDate.getFullYear() + '-' +
      String(this.selectedDate.getMonth() + 1).padStart(2, '0') + '-' +
      String(this.selectedDate.getDate()).padStart(2, '0');
    this.meetingsForSelectedDate = this.allMeetings.filter(m => m.date === selected);
  }

  reloadMeetings() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user && typeof user.id === 'number') {
        const userId: number = user.id;
        this.meetingService.getMeetingsByUserId(userId).subscribe(meetings => {
          this.allMeetings = meetings;
          this.updateMeetingsForSelectedDate();
        });
      }
    }
  }

  meetingDateClass = (date: Date) => {
    const dateString = date.toISOString().slice(0, 10);
    return this.allMeetings.some(m => m.date === dateString) ? 'meeting-day' : '';
  };
} 