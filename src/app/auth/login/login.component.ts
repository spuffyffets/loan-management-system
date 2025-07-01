import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service'; // adjust path if needed

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
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


  

  backToHome() {
    this.router.navigate(['/home']);
  }
}
