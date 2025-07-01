import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: any): Observable<string> {
    return this.http.post(`${BASE_URL}/register`, user, { responseType: 'text' });
  }

  login(user: any): Observable<string> {
    return this.http.post(`${BASE_URL}/login`, user, { responseType: 'text' });
  }
}
