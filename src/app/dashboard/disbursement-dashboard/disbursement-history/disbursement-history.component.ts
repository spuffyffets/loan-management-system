import { Component, OnInit } from '@angular/core';
import { Disbursement, DisbursementService } from 'src/app/shared/services/disbursement.service';

@Component({
  selector: 'app-disbursement-history',
  templateUrl: './disbursement-history.component.html',
  styleUrls: ['./disbursement-history.component.css']
})
export class DisbursementHistoryComponent implements OnInit {
  disbursements: Disbursement[] = [];
  loading = false;
  errorMessage = '';

  constructor(private disbursementService: DisbursementService) {}

  ngOnInit(): void {
    this.fetchHistory();
  }

  fetchHistory(): void {
    this.loading = true;
    this.errorMessage = '';

    this.disbursementService.getProcessedDisbursements().subscribe({
      next: (data) => {
        this.disbursements = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching disbursement history', err);
        this.errorMessage = 'Failed to load disbursement history.';
        this.loading = false;
      }
    });
  }
}
