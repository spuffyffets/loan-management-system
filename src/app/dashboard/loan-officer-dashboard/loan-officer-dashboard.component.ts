import { Component } from '@angular/core';

@Component({
  selector: 'app-loan-officer-dashboard',
  templateUrl: './loan-officer-dashboard.component.html',
  styleUrls: ['./loan-officer-dashboard.component.css']
})
export class LoanOfficerDashboardComponent {

  officerName: string = '';

ngOnInit(): void {
  this.officerName = localStorage.getItem('name') || 'LoanOfficer';
}

logout(): void {
  localStorage.clear();
  window.location.href = '/auth';
}

}
