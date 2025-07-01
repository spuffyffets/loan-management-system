import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customer: any = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
  const email = localStorage.getItem('email');
  if (email) {
    this.customerService.getProfile(email).subscribe({
      next: (res) => {
        console.log('Profile fetched:', res);  // <-- check this
        this.customer = res;
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  } else {
    console.warn('Email not found in localStorage');
  }
}

}
