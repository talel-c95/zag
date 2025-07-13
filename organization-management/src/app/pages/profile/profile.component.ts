import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule
  ]
})
export class ProfileComponent implements OnInit {
  user: any = null;
  loading = false;
  error = '';
  passwordForm: FormGroup;
  passwordSuccess = '';
  passwordPanelOpen = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        const userObj = JSON.parse(user);
        this.userService.getProfile(userObj.id || userObj.userId).subscribe({
          next: (profile) => this.user = profile,
          error: (err) => this.error = 'Failed to load profile'
        });
      } else {
        this.error = 'Not logged in';
      }
    } else {
      this.error = 'Not running in browser';
    }
  }

  getInitials(firstName: string, lastName: string): string {
    if (!firstName || !lastName) return 'U';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  onChangePassword() {
    if (this.passwordForm.invalid) return;
    
    this.loading = true;
    this.passwordSuccess = '';
    this.error = '';
    
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (!user) {
        this.error = 'Not logged in';
        this.loading = false;
        return;
      }
      
      const userObj = JSON.parse(user);
      this.userService.updatePassword(
        userObj.id || userObj.userId, 
        this.passwordForm.value.oldPassword, 
        this.passwordForm.value.newPassword
      ).subscribe({
        next: () => {
          this.passwordSuccess = 'Password updated successfully!';
          this.loading = false;
          this.passwordForm.reset();
          
          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            this.passwordSuccess = '';
          }, 5000);
        },
        error: (err) => {
          if (err.error && typeof err.error === 'string') {
            this.error = err.error;
          } else if (err.error && err.error.message) {
            this.error = err.error.message;
          } else if (err.message) {
            this.error = err.message;
          } else {
            this.error = 'Failed to update password';
          }
          this.loading = false;
          
          // Auto-hide error message after 5 seconds
          setTimeout(() => {
            this.error = '';
          }, 5000);
        }
      });
    } else {
      this.error = 'Not running in browser';
      this.loading = false;
    }
  }
}