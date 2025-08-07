import { Component, OnInit } from '@angular/core';
import { LoanOfficerService } from 'src/app/shared/services/loan-officer.service';

@Component({
  selector: 'app-pending-applications',
  templateUrl: './pending-applications.component.html',
  styleUrls: ['./pending-applications.component.css']
})
export class PendingApplicationsComponent implements OnInit {

  applications: any[] = [];
  officerEmail: string = '';
  officerName: any;

  constructor(private officerService: LoanOfficerService) {}

  ngOnInit(): void {
    this.officerEmail = localStorage.getItem('email') || '';
    this.loadPendingApplications();
  }

  loadPendingApplications(): void {
    this.officerService.getPendingApplications().subscribe({
      next: (res) => this.applications = res,
      error: (err) => console.error('Error loading applications', err)
    });
  }

  verifyCIBIL(appId: number): void {
    this.officerService.reviewCIBIL(appId, this.officerEmail, false).subscribe({
      next: (msg) => {
        alert(msg);
        this.loadPendingApplications();
      },
      error: (err) => alert("Error: " + err.error)
    });
  }

  rejectApplication(appId: number): void {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      this.officerService.reviewCIBIL(appId, this.officerEmail, true, reason).subscribe({
        next: (msg) => {
          alert(msg);
          this.loadPendingApplications();
        },
        error: (err) => alert("Error: " + err.error)
      });
    }
  }

}
