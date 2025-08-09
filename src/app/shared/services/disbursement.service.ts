import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

// Define interfaces for better type safety
export interface SanctionedLoan {
  loanAppId: number;
  applicantName: string;
  loanAmount: number;
  approvedAmount: number;
  interestRate: number;
  tenureMonths: number;
  applicationStatus: string;
  // Add other properties as needed
}

export interface Disbursement {
  id: number;
  loanApplicationId: number; // backend name
  disbursedAmount: number;
  disbursementDate: string;
  disbursementStatus: string;

  // extra fields from DTO
  loanAppId?: number;
  applicantName?: string;
  loanAmount?: number;
  approvedAmount?: number;
}


@Injectable({
  providedIn: 'root'
})
export class DisbursementService {
  private readonly baseUrl = 'http://localhost:8080/disbursements';

  constructor(private http: HttpClient) {}

  // 1. Get all sanctioned loans ready for disbursement
  getSanctionedApplications(): Observable<SanctionedLoan[]> {
    return this.http.get<SanctionedLoan[]>(`${this.baseUrl}/sanctioned`).pipe(
      catchError(this.handleError)
    );
  }

  // 2. Get details of a specific sanctioned loan
  getSanctionedApplicationDetails(loanAppId: number): Observable<SanctionedLoan> {
    if (!loanAppId || isNaN(loanAppId)) {
      return throwError(() => new Error('Invalid loan application ID'));
    }
    
    return this.http.get<SanctionedLoan>(`${this.baseUrl}/sanctioned/${loanAppId}`).pipe(
      catchError(this.handleError)
    );
  }

  // 3. Process loan disbursement
  processDisbursement(loanAppId: number, amount: number): Observable<string> {
    if (!loanAppId || isNaN(loanAppId)) {
      return throwError(() => new Error('Invalid loan application ID'));
    }
    
    if (!amount || amount <= 0) {
      return throwError(() => new Error('Amount must be greater than 0'));
    }

    return this.http.post(
      `${this.baseUrl}/process/${loanAppId}`,
      { amount }, 
      { responseType: 'text' }
    ).pipe(
      catchError(this.handleError)
    );
  }

  // 4. Get disbursement details by loan application ID
  getDisbursementDetails(loanAppId: number): Observable<Disbursement> {
    if (!loanAppId || isNaN(loanAppId)) {
      return throwError(() => new Error('Invalid loan application ID'));
    }
    
    return this.http.get<Disbursement>(`${this.baseUrl}/details/${loanAppId}`).pipe(
      catchError(this.handleError)
    );
  }

 // 5. Get disbursement object by loan application ID
getDisbursementObjectByLoanAppId(loanAppId: number): Observable<Disbursement> {
  if (!loanAppId || isNaN(loanAppId)) {
    return throwError(() => new Error('Invalid loan application ID'));
  }
  
  return this.http.get<Disbursement>(`${this.baseUrl}/object/${loanAppId}`).pipe(
    catchError(this.handleError)
  );
}

// 6. Get all processed disbursements
getProcessedDisbursements(): Observable<Disbursement[]> {
  return this.http.get<Disbursement[]>(`${this.baseUrl}/processed`).pipe(
    catchError(this.handleError)
  );
}


  

  // Error handling
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}