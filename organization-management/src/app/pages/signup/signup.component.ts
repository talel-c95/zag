import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  error = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSignup() {
    if (this.signupForm.invalid) return;
    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }
    this.loading = true;
    this.error = '';
    const { confirmPassword, password, ...rest } = this.signupForm.value;
    const signupData = { ...rest, passwordHash: password };
    this.auth.signup(signupData).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error || 'Signup failed';
        this.loading = false;
      }
    });
  }
}
