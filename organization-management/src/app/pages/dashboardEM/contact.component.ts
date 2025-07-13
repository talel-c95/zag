import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <mat-card class="contact-card">
      <div class="contact-title"><mat-icon>mail</mat-icon> Contact Admin/HR</div>
      <form (ngSubmit)="sendContactMessage()" #contactForm="ngForm">
        <mat-form-field appearance="fill" class="contact-field">
          <mat-label>Recipient</mat-label>
          <mat-select [(ngModel)]="contactRecipient" name="recipient" required>
            <mat-option value="hr">HR</mat-option>
            <mat-option value="admin">Admin</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="fill" class="contact-field">
          <mat-label>Subject</mat-label>
          <input matInput [(ngModel)]="contactSubject" name="subject" required />
        </mat-form-field>
        <mat-form-field appearance="fill" class="contact-field">
          <mat-label>Message</mat-label>
          <textarea matInput rows="4" [(ngModel)]="contactContent" name="content" required></textarea>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="contactSending || !contactForm.form.valid">
          {{ contactSending ? 'Sending...' : 'Send Message' }}
        </button>
        <div *ngIf="contactSuccess" class="contact-success">{{ contactSuccess }}</div>
        <div *ngIf="contactError" class="contact-error">{{ contactError }}</div>
      </form>
    </mat-card>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactRecipient: 'hr' | 'admin' = 'hr';
  contactSubject = '';
  contactContent = '';
  contactSending = false;
  contactSuccess = '';
  contactError = '';

  constructor(private http: HttpClient) {}

  sendContactMessage() {
    this.contactSending = true;
    this.contactSuccess = '';
    this.contactError = '';
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : {};
    const payload = {
      senderId: user.id,
      recipientRole: this.contactRecipient,
      subject: this.contactSubject,
      content: this.contactContent
    };
    this.http.post('http://localhost:8080/api/messages', payload).subscribe({
      next: () => {
        this.contactSuccess = 'Message sent successfully!';
        this.contactSubject = '';
        this.contactContent = '';
        this.contactSending = false;
      },
      error: () => {
        this.contactError = 'Failed to send message.';
        this.contactSending = false;
      }
    });
  }
} 