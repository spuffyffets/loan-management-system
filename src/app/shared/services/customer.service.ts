import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

 getProfile(email: string): Observable<any> {
  return this.http.get(`${BASE_URL}/profile`, {
    params: { email }
  });
}



  applyLoan(data: any): Observable<string> {
    return this.http.post(`${BASE_URL}/apply-loan`, data, { responseType: 'text' });
  }

  uploadDocument(file: File, email: string, type: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);
    formData.append('type', type);

    return this.http.post(`${BASE_URL}/upload-document`, formData, {
      responseType: 'text',
    });
  }

  getApplications(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/my-applications`, {
      params: { email },
    });
  }

  getDocuments(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/my-documents`, {
      params: { email },
    });
  }

  deleteLoan(applicationId: number, email: string): Observable<string> {
  return this.http.delete(`${BASE_URL}/delete-loan`, {
    params: { applicationId, email },
    responseType: 'text',
  });
}

}
