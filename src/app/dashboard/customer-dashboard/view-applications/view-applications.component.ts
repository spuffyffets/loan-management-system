import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css']
})
export class ViewApplicationsComponent implements OnInit {
  applications: any[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.customerService.getApplications(email).subscribe({
        next: (res) => {
          this.applications = res;
          console.log('Applications fetched:', res);
        },
        error: (err) => {
          console.error('Error fetching applications', err);
          alert('Failed to fetch applications');
        }
      });
    }
  }
  deleteApplication(id: number) {
  const email = localStorage.getItem('email');
  console.log("Deleting application ID:", id, "for email:", email); // debug line

  if (email) {
    this.customerService.deleteLoan(id, email).subscribe({
      next: (res) => {
        console.log("Delete response:", res);
        alert(res);
        this.applications = this.applications.filter(app => app.id !== id);
      },
      error: (err) => {
        console.error("Delete error:", err);
        alert("Delete failed: " + err.error);
      }
    });
  } else {
    alert("Email not found in localStorage.");
  }
}


}
