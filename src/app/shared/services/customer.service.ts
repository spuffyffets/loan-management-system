import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/customer';


export interface SanctionDetails {
  loanAppId: number;
  loanAmount: number;
  loanTenureInMonths: number;
  loanPurpose: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  sanctionedAmount: number;
  interestRate: number;
  tenureInMonths: number;
  issueDate: string;
  bankName: string;
  bankBranch: string;
}
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
 getUploadedDocuments(email: string): Observable<any[]> {
  return this.http.get<any[]>(`${BASE_URL}/my-documents`, {
    params: { email }
  });
}



  getApplications(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/my-applications`, {
      params: { email },
    });
  }

  // getDocuments(email: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${BASE_URL}/my-documents`, {
  //     params: { email },
  //   });
  // }

  deleteLoan(applicationId: number, email: string): Observable<string> {
  return this.http.delete(`${BASE_URL}/delete-loan`, {
    params: { applicationId, email },
    responseType: 'text',
  });
}
getSanctionDetails(loanAppId: number, email: string): Observable<SanctionDetails> {
  return this.http.get<SanctionDetails>(`${BASE_URL}/sanction-details/${loanAppId}`, {
    params: { email }
  });
}

downloadSanctionLetter(loanAppId: number, email: string): Observable<Blob> {
  return this.http.get(`${BASE_URL}/sanction-letter/download/${loanAppId}`, {
    params: { email },
    responseType: 'blob'
  });
}


}
