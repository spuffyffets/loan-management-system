import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Document {
  id: number;
  name: string;
  documentType: string;
  verificationStatus: string;
  fileUrl?: string;
}

export interface LoanApplicationDTO {
  id: number;
  applicantName: string;
  loanAmount: number;
  loanTenureInMonths: number;
  loanPurpose: string;
  applicationStatus: string;
  applicationDate: string;
  cibilScore: number;
}

export interface LoanWithDocumentsDTO {
  loan: LoanApplicationDTO;
  documents: Document[];
}

export interface SanctionLetter {
  id: number;
  sanctionedAmount: number;
  interestRate: number;
  tenureInMonths: number;
  issueDate: string;
  emiScheduleFileUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreditManagerService {
  private readonly baseUrl = 'http://localhost:8080/credit-manager';

  constructor(private http: HttpClient) {}

  // Get all applications with documents submitted status
  getApplicationsWithDocumentsSubmitted(): Observable<LoanApplicationDTO[]> {
    return this.http.get<LoanApplicationDTO[]>(`${this.baseUrl}/loan-applications/submitted`)
      .pipe(catchError(this.handleError));
  }

  // Get applications ready for evaluation (ALL_DOCUMENT_VERIFIED status)
  getApplicationsReadyForEvaluation(): Observable<LoanApplicationDTO[]> {
    return this.http.get<LoanApplicationDTO[]>(`${this.baseUrl}/applications-to-evaluate`)
      .pipe(catchError(this.handleError));
  }

  // Get loan application with all documents
  getLoanWithDocuments(loanAppId: number): Observable<LoanWithDocumentsDTO> {
    return this.http.get<LoanWithDocumentsDTO>(`${this.baseUrl}/loan-with-docs/${loanAppId}`)
      .pipe(catchError(this.handleError));
  }

  // Update document verification status
  updateDocumentStatus(id: number, status: string): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/documents/verify/${id}?status=${status}`, 
      {},
      { responseType: 'text' as 'json' }
    ).pipe(catchError(this.handleError));
  }

  // Evaluate loan application
  evaluateLoan(loanAppId: number): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/evaluate/${loanAppId}`,
      {},
      { responseType: 'text' as 'json' }
    ).pipe(catchError(this.handleError));
  }

  // Generate sanction letter
  generateSanctionLetter(loanAppId: number, sanctionData: SanctionLetter): Observable<SanctionLetter> {
    return this.http.post<SanctionLetter>(
      `${this.baseUrl}/sanction/${loanAppId}`,
      sanctionData
    ).pipe(catchError(this.handleError));
  }

  // Get sanction letter
  getSanctionLetter(loanAppId: number): Observable<SanctionLetter> {
    return this.http.get<SanctionLetter>(`${this.baseUrl}/sanction/${loanAppId}`)
      .pipe(catchError(this.handleError));
  }

  // Update loan application status
  updateLoanStatus(id: number, status: string): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/loan/update-status/${id}?status=${status}`,
      {},
      { responseType: 'text' as 'json' }
    ).pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status) {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }
    
    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}