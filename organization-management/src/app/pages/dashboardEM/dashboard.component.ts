import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCalendar } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { MeetingService, Meeting } from '../../services/meeting.service';
import { CalendarComponent } from './calendar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatInputModule,
    MatCalendar,
    MatCheckboxModule,
    RouterModule,
    CalendarComponent,
    MatDialogModule,
    ConfirmDialogComponent
  ]
})
export class DashboardComponent implements OnInit {
  user: any = {
    firstname: 'Sarah',
    lastname: 'Johnson',
    role: 'Senior Frontend Developer',
  };
  hoursThisWeek = 0.0;
  tasksCompleted = 0;
  tasksPending = 0;
  clockedIn = false;
  recentTasks: Task[] = [];
  meetingsToday: Meeting[] = [];
  performance = [
    { label: 'Performance', value: 0, color: '#2979ff' },
    { label: 'Efficiency', value: 0, color: '#00bfae' },
    { label: 'Utilization', value: 0, color: '#ff9800' },
    { label: 'Attendance', value: 0, color: '#8e24aa' },
  ];
  organizationalUnits: any[] = [];
  loading = true;
  error = '';
  criticalError = '';
  selectedDate: Date | null = null;
  clockInStart: number | null = null;
  elapsedTime: string = '';
  private timerInterval: any;
  lastResetWeek: number | null = null;
  tasks: Task[] = [];
  allMeetings: Meeting[] = [];
  meetingsAll: Meeting[] = [];

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private meetingService: MeetingService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        this.router.navigate(['/login']);
        return;
      }

      try {
        this.user = JSON.parse(userStr);
        // Restore clock-in state
        const storedStart = localStorage.getItem('clockInStart');
        if (storedStart) {
          this.clockedIn = true;
          this.clockInStart = parseInt(storedStart, 10);
          this.startTimer();
        }
        // Restore hoursThisWeek and lastResetWeek
        const storedHours = localStorage.getItem('hoursThisWeek');
        this.hoursThisWeek = storedHours ? parseInt(storedHours, 10) : 0;
        const storedReset = localStorage.getItem('lastResetWeek');
        this.lastResetWeek = storedReset ? parseInt(storedReset, 10) : null;
        this.checkWeeklyReset();
        this.loadUserData();
        this.loadTasksAndMeetings();
        this.reloadMeetings();
      } catch (error) {
        this.error = 'Invalid user data';
        this.loading = false;
      }
    } else {
      this.error = 'Not running in browser';
      this.loading = false;
    }
  }

  loadUserData() {
    if (!this.user || !this.user.id) {
      this.criticalError = 'User ID not found';
      this.loading = false;
      return;
    }

    // Load user profile
    this.userService.getProfile(this.user.id).subscribe({
      next: (profile) => {
        this.user = { ...this.user, ...profile };
        this.loadOrganizationalUnits();
      },
      error: (err) => {
        this.criticalError = 'Failed to load user profile';
        this.loading = false;
      }
    });
  }

  loadOrganizationalUnits() {
    this.userService.getOrganizationalUnits(this.user.id).subscribe({
      next: (units) => {
        this.organizationalUnits = units;
        this.loading = false;
      },
      error: (err) => {
        this.criticalError = 'Failed to load organizational units';
        this.loading = false;
      }
    });
  }

  clockIn() {
    this.clockedIn = true;
    this.clockInStart = Date.now();
    localStorage.setItem('clockInStart', this.clockInStart.toString());
    this.startTimer();
  }

  startTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.updateElapsedTime();
    this.timerInterval = setInterval(() => {
      this.updateElapsedTime();
    }, 1000);
  }

  updateElapsedTime() {
    if (this.clockInStart) {
      const diff = Date.now() - this.clockInStart;
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      this.elapsedTime = `${hours.toString().padStart(2, '0')}:` +
        `${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}`;
      // Increment hoursThisWeek every time a new hour is reached
      if (hours > 0 && this.hoursThisWeek < hours) {
        this.hoursThisWeek = hours;
        localStorage.setItem('hoursThisWeek', this.hoursThisWeek.toString());
      }
    } else {
      this.elapsedTime = '';
    }
    this.checkWeeklyReset();
  }

  checkWeeklyReset() {
    const now = new Date();
    const currentWeek = this.getWeekNumber(now);
    if (this.lastResetWeek === null) {
      this.lastResetWeek = currentWeek;
      localStorage.setItem('lastResetWeek', currentWeek.toString());
    } else if (this.lastResetWeek !== currentWeek) {
      this.hoursThisWeek = 0;
      localStorage.setItem('hoursThisWeek', '0');
      this.lastResetWeek = currentWeek;
      localStorage.setItem('lastResetWeek', currentWeek.toString());
    }
  }

  getWeekNumber(date: Date): number {
    // Returns ISO week number
    const temp = new Date(date.getTime());
    temp.setHours(0, 0, 0, 0);
    temp.setDate(temp.getDate() + 4 - (temp.getDay() || 7));
    const yearStart = new Date(temp.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((temp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      localStorage.removeItem('clockInStart');
      localStorage.removeItem('hoursThisWeek');
      localStorage.removeItem('lastResetWeek');
      this.router.navigate(['/login']);
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  loadTasksAndMeetings() {
    if (!this.user || !this.user.id) return;
    // Fetch tasks
    this.taskService.getTasksByUserId(this.user.id).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.recentTasks = tasks.slice(-4).reverse();
        this.tasksCompleted = tasks.filter(t => t.completed).length;
        this.tasksPending = tasks.filter(t => !t.completed).length;
        this.updatePerformance();
      },
      error: () => {
        this.error = 'Failed to load tasks';
      }
    });
    // Fetch today's meetings
    const today = new Date().toISOString().slice(0, 10);
    this.meetingService.getMeetingsByUserIdAndDate(this.user.id, today).subscribe({
      next: (meetings) => {
        this.meetingsToday = meetings;
      },
      error: () => {
        // Do nothing: suppress error for meetings
      }
    });
  }

  markTaskCompleted(task: Task) {
    if (!task.id) return;
    this.taskService.completeTask(task.id).subscribe({
      next: (updated) => {
        task.completed = true;
        this.tasksCompleted++;
        this.tasksPending--;
        this.updatePerformance();
      },
      error: () => {
        this.error = 'Failed to mark task as completed';
      }
    });
  }

  async confirmAndMarkTaskCompleted(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });
    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.markTaskCompleted(task);
    }
  }

  updatePerformance() {
    const total = this.tasks.length;
    const completed = this.tasksCompleted;
    this.performance = [
      { label: 'Performance', value: total ? Math.round((completed / total) * 100) : 0, color: '#2979ff' },
      { label: 'Efficiency', value: total ? Math.round((completed / total) * 100) : 0, color: '#00bfae' },
      { label: 'Utilization', value: total ? Math.round((completed / total) * 100) : 0, color: '#ff9800' },
      { label: 'Attendance', value: 94, color: '#8e24aa' }, // Placeholder
    ];
  }

  getMeetingDateClass = (date: Date) => {
    const dateString = date.toISOString().slice(0, 10);
    return this.meetingsToday.some(m => m.date === dateString) ? 'meeting-day' : '';
  };

  reloadMeetings() {
    if (!this.user || !this.user.id) return;
    // Fetch all meetings for the user
    this.meetingService.getMeetingsByUserId(this.user.id).subscribe({
      next: (meetings) => {
        this.allMeetings = meetings;
        this.meetingsAll = meetings;
        // Only today's meetings for meetingsToday
        const today = new Date();
        const todayString = today.getFullYear() + '-' +
          String(today.getMonth() + 1).padStart(2, '0') + '-' +
          String(today.getDate()).padStart(2, '0');
        this.meetingsToday = meetings.filter(m => m.date === todayString);
      },
      error: () => {
        // Optionally handle error
      }
    });
  }
} 