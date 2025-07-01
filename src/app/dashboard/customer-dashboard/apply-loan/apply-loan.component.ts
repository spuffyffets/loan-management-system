import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.css']
})
export class ApplyLoanComponent implements OnInit {
  loanForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      loanAmount: ['', Validators.required],
      loanTenureInMonths: ['', Validators.required],
      loanPurpose: ['', Validators.required],
      panNumber: ['', Validators.required],
      aadhaarNumber: ['', Validators.required],
      address: ['', Validators.required],
      employmentType: ['', Validators.required],
      employerName: ['', Validators.required],
      monthlyIncome: ['', Validators.required],
      bankAccountNumber: ['', Validators.required],
      accountHolderName: ['', Validators.required]
    });
  }

  onSubmitLoan() {
    if (this.loanForm.valid) {
      const email = localStorage.getItem('email');
      const data = { ...this.loanForm.value, email };

      this.customerService.applyLoan(data).subscribe({
        next: (res) => {
          alert(res);
          this.loanForm.reset();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert('Loan application failed: ' + err.error);
          console.error(err);
        }
      });
    } else {
      this.loanForm.markAllAsTouched();
    }
  }
}
