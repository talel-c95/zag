import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-rh',
  templateUrl: './dashboardRH.component.html',
  styleUrls: ['./dashboardRH.component.scss'],
  standalone: true,
  animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms cubic-bezier(.35,0,.25,1)', style({ opacity: 1, transform: 'none' }))
      ])
    ]),
    trigger('progressAnim', [
      transition(':increment', [
        style({ width: '0%' }),
        animate('800ms ease-out', style({ width: '*' }))
      ])
    ]),
    trigger('taskAnimStagger', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('400ms 100ms cubic-bezier(.35,0,.25,1)', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ],
  imports: [
    CommonModule, MatIconModule, MatButtonModule, MatDialogModule, MatTableModule, MatProgressBarModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule
  ]
})
export class DashboardRHComponent implements OnInit {
  usersWithTasks: any[] = [];
  displayedColumns: string[] = ['name', 'total', 'completed', 'pending', 'details'];
  expandedUser: any = null;
  searchTerm: string = '';
  sortOption: string = 'alpha-asc';
  hrSummary: any = null;
  summaryLoaded = false;

  constructor(private dialog: MatDialog, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('/api/users/hr-summary').subscribe(summary => {
      this.hrSummary = summary;
      this.summaryLoaded = true;
    });
    this.http.get<any[]>('/api/users/with-tasks').subscribe(data => {
      this.usersWithTasks = data
        .filter(user => user.role === 'EMPLOYEE')
        .map(user => {
          const total = user.tasks.length;
          const completed = user.tasks.filter((t: any) => t.completed).length;
          const pending = total - completed;
          return { ...user, total, completed, pending };
        });
    });
  }

  toggleExpand(user: any) {
    this.expandedUser = this.expandedUser === user ? null : user;
  }

  goToDashboard() {
    this.router.navigate(['/dashboardRH']);
  }
  isDashboardActive(): boolean {
    return this.router.url === '/dashboardRH';
  }

  goToTasks() {
    this.router.navigate(['/tasks']);
  }
  isTasksActive(): boolean {
    return this.router.url === '/tasks';
  }

  goToEstablishments() {
    this.router.navigate(['/establishments']);
  }
  isEstablishmentsActive(): boolean {
    return this.router.url === '/establishments';
  }

  goToOrgUnits() {
    this.router.navigate(['/organizational-units']);
  }
  isOrgUnitsActive(): boolean {
    return this.router.url === '/organizational-units';
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
  isProfileActive(): boolean {
    return this.router.url === '/profile';
  }

  logout() {
    // Add your logout logic here (e.g., clear localStorage, navigate to login)
    localStorage.clear();
    window.location.href = '/login';
  }

  get filteredAndSortedUsers() {
    const trimmed = this.searchTerm.trim();
    let filtered = this.usersWithTasks;
    if (trimmed.length > 0) {
      filtered = filtered.filter(user => {
        const name = ((user.firstname || '') + ' ' + (user.lastname || '')).toLowerCase();
        return name.includes(trimmed.toLowerCase());
      });
    }
    // Defensive: filter out users with no firstname/lastname
    filtered = filtered.filter(user => typeof user.firstname === 'string' && typeof user.lastname === 'string');
    switch (this.sortOption) {
      case 'alpha-asc':
        filtered = filtered.sort((a, b) =>
          ((a.firstname || '') + (a.lastname || '')).localeCompare((b.firstname || '') + (b.lastname || ''))
        );
        break;
      case 'alpha-desc':
        filtered = filtered.sort((a, b) =>
          ((b.firstname || '') + (b.lastname || '')).localeCompare((a.firstname || '') + (a.lastname || ''))
        );
        break;
      case 'pending-asc':
        filtered = filtered.sort((a, b) => (a.pending || 0) - (b.pending || 0));
        break;
      case 'pending-desc':
        filtered = filtered.sort((a, b) => (b.pending || 0) - (a.pending || 0));
        break;
    }
    return filtered;
  }

  isMeetingsActive() {
    return this.router.url.includes('/meetings');
  }

  goToMeetings() {
    this.router.navigate(['/meetings']);
  }
} 