import { Component, OnInit } from '@angular/core';
import { DisbursementService, SanctionedLoan } from 'src/app/shared/services/disbursement.service';

@Component({
  selector: 'app-pending-disbursements',
  templateUrl: './pending-disbursements.component.html',
  styleUrls: ['./pending-disbursements.component.css']
})
export class PendingDisbursementsComponent implements OnInit {
  sanctionedLoans: SanctionedLoan[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private disbursementService: DisbursementService) {}

  ngOnInit(): void {
    this.loadSanctionedLoans();
  }

  loadSanctionedLoans(): void {
    this.loading = true;
    this.errorMessage = '';
    this.disbursementService.getSanctionedApplications().subscribe({
      next: (data) => {
        this.sanctionedLoans = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load sanctioned loans';
        this.loading = false;
      }
    });
  }

  disburseLoan(loanAppId: number, amount: number): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.disbursementService.processDisbursement(loanAppId, amount).subscribe({
      next: (response) => {
        this.successMessage = response;
        this.loadSanctionedLoans(); // refresh list after disbursement
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to disburse loan';
      }
    });
  }
}
