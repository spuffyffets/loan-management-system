import { Component, OnInit } from '@angular/core';
import { CreditManagerService } from 'src/app/shared/services/credit-manager.service';
import { LoanApplicationDTO } from 'src/app/shared/services/credit-manager.service'; 
@Component({
  selector: 'app-evaluate-loan',
  templateUrl: './evaluate-loan.component.html',
  styleUrls: ['./evaluate-loan.component.css']
})
export class EvaluateLoanComponent implements OnInit {
  applications: LoanApplicationDTO[] = [];
  selectedApplication: LoanApplicationDTO | null = null;
  documents: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private CreditManagerService: CreditManagerService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.isLoading = true;
    this.CreditManagerService.getApplicationsReadyForEvaluation().subscribe({
      next: (data) => {
        this.applications = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load applications';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  selectApplication(application: LoanApplicationDTO): void {
    this.selectedApplication = application;
    this.loadDocuments(application.id);
  }

  loadDocuments(loanAppId: number): void {
    this.isLoading = true;
    this.CreditManagerService.getLoanWithDocuments(loanAppId).subscribe({
      next: (data) => {
        this.documents = data.documents;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load documents';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  evaluateApplication(): void {
    if (!this.selectedApplication) return;
    
    this.isLoading = true;
    this.CreditManagerService.evaluateLoan(this.selectedApplication.id).subscribe({
      next: (response) => {
        alert(response); 
        this.loadApplications(); 
        this.selectedApplication = null;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Evaluation failed';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}