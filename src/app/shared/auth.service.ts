import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Register method
  register(user: RegisterRequest): Observable<string> {
    return this.http.post(`${BASE_URL}/register`, user, {
      responseType: 'text',
    });
  }

  // Login method
  login(user: LoginRequest): Observable<string> {
    return this.http.post(`${BASE_URL}/login`, user, {
      responseType: 'text',
    });
  }

  // Save email/username to local storage (not a real token)
  saveLoginInfo(email: string): void {
    localStorage.setItem('userEmail', email);
  }

  // Get stored email
  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  // Logout
  logout(): void {
    localStorage.removeItem('userEmail');
  }

  // Check login status
  isLoggedIn(): boolean {
    return this.getUserEmail() !== null;
  }
}

// Interfaces
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string; // example: "CUSTOMER"
}

export interface LoginRequest {
  email: string;
  password: string;
}
