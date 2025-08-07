import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/loan-officer';

@Injectable({ providedIn: 'root' })
export class LoanOfficerService {

  constructor(private http: HttpClient) {}

  getPendingApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/pending-applications`);
  }

  reviewCIBIL(applicationId: number, officerEmail: string, reject: boolean, reasonIfRejected?: string): Observable<string> {
    const params = new HttpParams()
      .set('applicationId', applicationId)
      .set('officerEmail', officerEmail)
      .set('reject', reject);

    if (reject && reasonIfRejected) {
      params.set('reasonIfRejected', reasonIfRejected);
    }

    return this.http.post(`${BASE_URL}/review-cibil`, null, {
      params: params,
      responseType: 'text',
    });
  }
}
