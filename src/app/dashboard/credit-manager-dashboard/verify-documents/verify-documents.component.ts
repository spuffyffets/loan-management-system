import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreditManagerService } from 'src/app/shared/services/credit-manager.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-verify-documents',
  templateUrl: './verify-documents.component.html',
  styleUrls: ['./verify-documents.component.css']
})
export class VerifyDocumentsComponent implements OnInit, OnDestroy {
  loanApplications: any[] = [];
  selectedLoan: any = null;
  documents: any[] = [];
  selectedDocument: any = null;
  isLoading = false;
  showModal = false;
  allDocumentsVerified = false;

  private destroy$ = new Subject<void>();

  constructor(private creditService: CreditManagerService) {}

  ngOnInit(): void {
    this.loadLoanApplications();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadLoanApplications(): void {
    this.isLoading = true;
    this.creditService.getApplicationsWithDocumentsSubmitted()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.loanApplications = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load applications:', err);
          this.isLoading = false;
        }
      });
  }

  selectLoan(loan: any): void {
    this.selectedLoan = loan;
    this.loadDocuments(loan.applicationId || loan.id);
  }

  loadDocuments(loanId: number): void {
    this.isLoading = true;
    this.creditService.getLoanWithDocuments(loanId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.documents = response?.documents || [];
          this.checkAllDocumentsVerified();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load documents:', err);
          this.isLoading = false;
        }
      });
  }

  checkAllDocumentsVerified(): void {
    this.allDocumentsVerified = this.documents.every(doc => doc.verificationStatus === 'VERIFIED');
  }

  verifyDocument(documentId: number, status: string): void {
    if (!confirm(`Are you sure you want to ${status.toLowerCase()} this document?`)) return;

    this.isLoading = true;
    this.creditService.updateDocumentStatus(documentId, status)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadDocuments(this.selectedLoan.applicationId || this.selectedLoan.id);
        },
        error: (err) => {
          console.error('Failed to update document status:', err);
          this.isLoading = false;
        }
      });
  }

  openDocumentModal(document: any): void {
    this.selectedDocument = document;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedDocument = null;
  }
}