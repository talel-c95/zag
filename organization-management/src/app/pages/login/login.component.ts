import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.error = '';
    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res));
        if (res.role === 'HR_MANAGER') {
          this.router.navigate(['/dashboardRH']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.error = err.error || 'Invalid credentials';
        this.loading = false;
      }
    });
  }
}
