import { Component, OnInit } from '@angular/core';
import { CreditManagerService } from 'src/app/shared/services/credit-manager.service';

@Component({
  selector: 'app-documents-sumbmited-applications', // Match file name
  templateUrl: './documents-sumbmited-applications.component.html',
  styleUrls: ['./documents-sumbmited-applications.component.css']
})
export class DocumentsSumbmitedApplicationsComponent implements OnInit {
  loanApplications: any[] = [];
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm = '';

  constructor(private creditService: CreditManagerService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.isLoading = true;
    this.creditService.getApplicationsWithDocumentsSubmitted().subscribe({
      next: (data) => {
        this.loanApplications = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch applications:', err);
        this.isLoading = false;
      }
    });
  }

  get filteredApplications() {
    return this.loanApplications.filter(app => 
      app.fullName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      app.applicationId?.toString().includes(this.searchTerm) ||
      app.panNumber?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}