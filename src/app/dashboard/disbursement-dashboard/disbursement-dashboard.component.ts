import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disbursement-dashboard',
  templateUrl: './disbursement-dashboard.component.html',
  styleUrls: ['./disbursement-dashboard.component.css']
})
export class DisbursementDashboardComponent implements OnInit {
  disbursementManagerName: string = 'Disbursement Manager';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.disbursementManagerName = localStorage.getItem('name') || 'Disbursement Manager';

  }

  logout(): void {
  localStorage.clear();
  this.router.navigate(['/auth']).then(() => window.location.reload());
}

}
