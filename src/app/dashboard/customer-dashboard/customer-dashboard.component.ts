import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],

})
export class CustomerDashboardComponent implements OnInit {
  userName: string = 'Customer';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.customerService.getProfile(email).subscribe({
        next: (res: any) => {
          
          if (res && res.user && res.user.fullName) {
            this.userName = res.user.fullName;
          } else {
            this.userName = 'Customer';
          }
        },
        error: (err) => {
          console.error('Failed to load user profile', err);
          this.userName = 'Customer';
        }
      });
    }
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/auth';
  }
}
