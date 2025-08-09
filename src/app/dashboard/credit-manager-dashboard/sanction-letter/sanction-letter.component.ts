import { Component, OnInit } from '@angular/core';
import { CreditManagerService, SanctionLetter, LoanApplicationforsanctionDTO } from 'src/app/shared/services/credit-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sanction-letter',
  templateUrl: './sanction-letter.component.html',
  styleUrls: ['./sanction-letter.component.css']
})
export class SanctionLetterComponent implements OnInit {
  applications: LoanApplicationforsanctionDTO[] = [];
  selectedApplication: LoanApplicationforsanctionDTO | null = null;
  sanctionForm: FormGroup;
  
  message: string = '';
  error: string = '';
  isLoading: boolean = false;
  isApplicationLoading: boolean = false;
  showList: boolean = true;
  isGenerated: boolean = false;

  constructor(
    private creditManagerService: CreditManagerService,
    private fb: FormBuilder
  ) {
    this.sanctionForm = this.fb.group({
      sanctionedAmount: [0, [Validators.required, Validators.min(1)]],
      interestRate: [0, [Validators.required, Validators.min(0.1), Validators.max(30)]],
      tenureInMonths: [0, [Validators.required, Validators.min(1), Validators.max(360)]],
      emiScheduleFileUrl: ['', Validators.required],
      issueDate: [new Date().toISOString().split('T')[0]]
    });
  }

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.isApplicationLoading = true;
    this.creditManagerService.getEvaluatedApplications().subscribe({
      next: (apps) => {
        this.applications = apps;
        this.isApplicationLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load applications';
        this.isApplicationLoading = false;
      }
    });
  }

  selectApplication(app: LoanApplicationforsanctionDTO) {
    this.selectedApplication = app;
    this.showList = false;
    this.sanctionForm.patchValue({
      sanctionedAmount: app.approvedAmount,
      interestRate: app.interestRate,
      tenureInMonths: app.loanTenureInMonths
    });
  }

  backToList() {
    this.selectedApplication = null;
    this.showList = true;
    this.isGenerated = false;
    this.message = '';
    this.error = '';
    this.sanctionForm.reset();
  }

  generate() {
    if (this.sanctionForm.invalid || !this.selectedApplication) {
      this.error = 'Please fill all required fields with valid values';
      return;
    }

    this.isLoading = true;
    this.message = '';
    this.error = '';
    
    const sanctionData: SanctionLetter = {
      ...this.sanctionForm.value,
      id: 0 
    };

    this.creditManagerService.generateSanctionLetter(
      this.selectedApplication.id, 
      sanctionData
    ).subscribe({
      next: (response) => {
        this.message = 'Sanction letter generated successfully!';
        this.isLoading = false;
        this.isGenerated = true;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error generating sanction letter. Please try again.';
        this.isLoading = false;
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.sanctionForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}