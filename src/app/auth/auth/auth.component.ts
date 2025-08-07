import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isRegisterActive = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialize login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Initialize register form
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['CUSTOMER', Validators.required]
    });
  }

  toggleRegister() {
    this.isRegisterActive = true;
  }

  toggleLogin() {
    this.isRegisterActive = false;
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;

      this.authService.login(this.loginForm.value).subscribe({
        next: (response: string) => {
          console.log('Login successful:', response);
          localStorage.setItem('email', this.loginForm.value.email);

          if (response.includes('CUSTOMER')) {
            this.router.navigate(['/customer-dashboard']);
          } else if (response.includes('LOAN_OFFICER')) {
            this.router.navigate(['/loan-officer-dashboard']);
          } else if (response.includes('CREDIT_MANAGER')) {
            this.router.navigate(['/credit-manager-dashboard']);
          } else if (response.includes('DISBURSEMENT_MANAGER')) {
            this.router.navigate(['/disbursement-manager-dashboard']);
          } else {
            alert('Unknown role.');
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Invalid credentials!');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onSubmitRegister() {
    if (this.registerForm.valid) {
      console.log('Register form submitted:', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: (response: string) => {
          alert(response);
          this.toggleLogin(); // Switch to login form after successful registration
        },
        error: (err) => {
          console.error('Registration failed', err);
          alert('Registration failed: ' + err.error);
        }
      });
    } else {
      console.warn('Form is invalid!');
      this.registerForm.markAllAsTouched();
    }
  }

  backToHome() {
    this.router.navigate(['/home']);
  }
}