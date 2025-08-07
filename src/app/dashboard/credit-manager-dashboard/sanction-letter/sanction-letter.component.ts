import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditManagerService, SanctionLetter } from 'src/app/shared/services/credit-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sanction-letter',
  templateUrl: './sanction-letter.component.html',
  styleUrls: ['./sanction-letter.component.css']
})
export class SanctionLetterComponent {
  loanAppId!: number;
  sanctionLetter: SanctionLetter = {
    id: 0,
    sanctionedAmount: 0,
    interestRate: 0,
    tenureInMonths: 0,
    issueDate: new Date().toISOString().split('T')[0], // Set default to today's date
    emiScheduleFileUrl: ''
  };

  message: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private creditManagerService: CreditManagerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loanAppId = Number(this.route.snapshot.paramMap.get('loanAppId'));
  }

  generate() {
    this.isLoading = true;
    this.message = '';
    this.error = '';
    
    this.creditManagerService.generateSanctionLetter(this.loanAppId, this.sanctionLetter).subscribe({
      next: (response) => {
        this.message = 'Sanction letter generated successfully!';
        this.isLoading = false;
        // Reset form after successful generation
        this.sanctionLetter = {
          id: 0,
          sanctionedAmount: 0,
          interestRate: 0,
          tenureInMonths: 0,
          issueDate: new Date().toISOString().split('T')[0],
          emiScheduleFileUrl: ''
        };
      },
      error: (err) => {
        this.error = err.error?.message || 'Error generating sanction letter. Please try again.';
        this.isLoading = false;
      }
    });
  }
}