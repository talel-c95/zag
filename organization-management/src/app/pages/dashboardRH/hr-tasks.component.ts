import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hr-tasks',
  templateUrl: './hr-tasks.component.html',
  styleUrls: ['./hr-tasks.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule]
})
export class HrTasksComponent implements OnInit {
  taskForm: FormGroup;
  users: any[] = [];
  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder, private taskService: TaskService, private userService: UserService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['pending', Validators.required],
      priority: ['', Validators.required],
      project: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users: any[]) => {
      this.users = users.filter(user => user.role === 'EMPLOYEE');
    });
  }

  submitTask() {
    if (this.taskForm.invalid) return;
    this.taskService.createTask(this.taskForm.value).subscribe({
      next: () => {
        this.successMsg = 'Task posted successfully!';
        this.errorMsg = '';
        this.taskForm.reset({ status: 'pending' });
      },
      error: () => {
        this.errorMsg = 'Failed to post task.';
        this.successMsg = '';
      }
    });
  }
} 