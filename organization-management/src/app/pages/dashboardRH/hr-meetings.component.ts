import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MeetingService } from '../../services/meeting.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hr-meetings',
  templateUrl: './hr-meetings.component.html',
  styleUrls: ['./hr-meetings.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule]
})
export class HrMeetingsComponent implements OnInit {
  meetingForm: FormGroup;
  users: any[] = [];
  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder, private meetingService: MeetingService, private userService: UserService) {
    this.meetingForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users: any[]) => {
      this.users = users.filter(user => user.role === 'EMPLOYEE');
    });
  }

  submitMeeting() {
    if (this.meetingForm.invalid) return;
    this.meetingService.createMeeting(this.meetingForm.value).subscribe({
      next: () => {
        this.successMsg = 'Meeting posted successfully!';
        this.errorMsg = '';
        this.meetingForm.reset();
      },
      error: () => {
        this.errorMsg = 'Failed to post meeting.';
        this.successMsg = '';
      }
    });
  }
} 