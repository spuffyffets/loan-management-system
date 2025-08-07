import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-manager-dashboard',
  templateUrl: './credit-manager-dashboard.component.html',
})
export class CreditManagerDashboardComponent implements OnInit {
  creditManagerName: string = '';

  ngOnInit(): void {
    this.creditManagerName = localStorage.getItem('name') || 'Credit Manager';
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/auth';
  }
  
}
