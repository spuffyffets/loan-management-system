import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

export interface Document {
  id: number;
  name: string;
  documentType: string;
  verificationStatus: string;
  fileType?: string;  
  fileData?: string; 
  fileUrl?: string;
}

export interface LoanApplicationforsanctionDTO {
  id: number;
  applicantName: string;
  loanAmount: number;
  loanTenureInMonths: number;
  cibilScore: number;
  applicationDate: string;
  loanPurpose: string;
  applicationStatus: string;
  approvedAmount: number;
  interestRate: number;
  evaluationRemarks: string;
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
export interface LoanApplicationforsanctionDTO {
  id: number;
  loanAmount: number;
  loanTenureInMonths: number;
  cibilScore: number;
  applicationDate: string;
  loanPurpose: string;
  applicationStatus: string;
  applicantName: string;
  approvedAmount: number;
  interestRate: number;
  evaluationRemarks: string;
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


  private loadingState = new BehaviorSubject<boolean>(false);
public loading$ = this.loadingState.asObservable();

private setLoading(loading: boolean): void {
  this.loadingState.next(loading);
}





  // Get all applications with documents submitted status
 private cache = new Map<string, any>();


getApplicationsWithDocumentsSubmitted(forceRefresh = false): Observable<LoanApplicationDTO[]> {
  const key = 'submitted-apps';
  if (!forceRefresh && this.cache.has(key)) {
    return of(this.cache.get(key));
  }
  
  return this.http.get<LoanApplicationDTO[]>(
    `${this.baseUrl}/loan-applications/submitted`
  ).pipe(
    tap(data => this.cache.set(key, data)),
    catchError(this.handleError)
  );
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

 getEvaluatedApplications(): Observable<LoanApplicationforsanctionDTO[]> {
  this.setLoading(true);
  return this.http.get<LoanApplicationforsanctionDTO[]>(
    `${this.baseUrl}/evaluated-applications`
  ).pipe(
    catchError(this.handleError),
    finalize(() => this.setLoading(false))
  );
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
  return this.http.get<SanctionLetter>(
    `${this.baseUrl}/sanction/${loanAppId}`  
  ).pipe(catchError(this.handleError));
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
  const defaultMsg = 'Please try again later or contact support';
  
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Client error: ${error.error.message}`;
  } else {
    errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
    
    // Handle specific status codes
    if (error.status === 404) {
      errorMessage = 'Requested resource not found';
    } else if (error.status === 403) {
      errorMessage = 'You are not authorized for this action';
    }
    
    // Use server-provided message if available
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.statusText) {
      errorMessage += ` (${error.statusText})`;
    }
  }
  
  console.error('API Error:', error);
  return throwError(() => new Error(`${errorMessage} - ${defaultMsg}`));
}

}