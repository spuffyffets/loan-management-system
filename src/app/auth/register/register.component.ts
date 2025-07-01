import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.registerForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['CUSTOMER', Validators.required]
  });
}


  onSubmitRegister() {
  if (this.registerForm.valid) {
    console.log('Register form submitted:', this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe({
      next: (response: string) => {
        alert(response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert('Registration failed: ' + err.error);
      }
    });
  } else {
    console.warn('Form is invalid!');
    const controls = this.registerForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        console.warn(`Control '${name}' is invalid. Errors:`, controls[name].errors);
      }
    }
    this.registerForm.markAllAsTouched();
  }
}




  backToLogin() {
    this.router.navigate(['/login']);
  }
}
