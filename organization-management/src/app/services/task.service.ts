import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  project?: string;
  userId: number;
  completed?: boolean;
  createdAt?: string;
  completedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = '/api/tasks';

  constructor(private http: HttpClient) {}

  getTasksByUserId(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}?userId=${userId}`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task);
  }

  completeTask(id: number): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}/complete`, {});
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
} 