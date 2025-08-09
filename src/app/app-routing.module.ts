import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AboutUsComponent } from './core/about-us/about-us.component';
import { GalleryComponent } from './core/gallery/gallery.component';
import { ContactUComponent } from './core/contact-u/contact-u.component';
import { CustomerDashboardComponent } from './dashboard/customer-dashboard/customer-dashboard.component';
import { LoanOfficerDashboardComponent } from './dashboard/loan-officer-dashboard/loan-officer-dashboard.component';
import { CreditManagerDashboardComponent } from './dashboard/credit-manager-dashboard/credit-manager-dashboard.component';
import { DisbursementDashboardComponent } from './dashboard/disbursement-dashboard/disbursement-dashboard.component';
import { ProfileComponent } from './dashboard/customer-dashboard/profile/profile.component';
import { ApplyLoanComponent } from './dashboard/customer-dashboard/apply-loan/apply-loan.component';
import { UploadDocumentComponent } from './dashboard/customer-dashboard/upload-document/upload-document.component';
import { ViewDocumentsComponent } from './dashboard/customer-dashboard/view-documents/view-documents.component';
import { ViewApplicationsComponent } from './dashboard/customer-dashboard/view-applications/view-applications.component';
import { PendingApplicationsComponent } from './dashboard/loan-officer-dashboard/pending-applications/pending-applications.component';
import { LoanOfficerProfileComponent } from './dashboard/loan-officer-dashboard/profile/profile.component';
import { AuthComponent } from './auth/auth/auth.component';
import { VerifyDocumentsComponent } from './dashboard/credit-manager-dashboard/verify-documents/verify-documents.component';
import { SanctionLetterComponent } from './dashboard/credit-manager-dashboard/sanction-letter/sanction-letter.component';
import { EvaluateLoanComponent } from './dashboard/credit-manager-dashboard/evaluate-loan/evaluate-loan.component';
import { DocumentsSumbmitedApplicationsComponent } from './dashboard/credit-manager-dashboard/documents-sumbmited-applications/documents-sumbmited-applications.component';
import { PendingDisbursementsComponent } from './dashboard/disbursement-dashboard/pending-disbursements/pending-disbursements.component';

import { DisbursementHistoryComponent } from './dashboard/disbursement-dashboard/disbursement-history/disbursement-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'auth', component: AuthComponent },

  // Customer Dashboard
  {
    path: 'customer-dashboard',
    component: CustomerDashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'apply-loan', component: ApplyLoanComponent },
      { path: 'view-applications', component: ViewApplicationsComponent },
      { path: 'upload-document', component: UploadDocumentComponent },
      { path: 'view-documents', component: ViewDocumentsComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  },

  // Loan Officer Dashboard
  {
    path: 'loan-officer-dashboard',
    component: LoanOfficerDashboardComponent,
    children: [
      { path: 'profile', component: LoanOfficerProfileComponent },
      { path: 'pending-applications', component: PendingApplicationsComponent },
      { path: '', redirectTo: 'pending-applications', pathMatch: 'full' }
    ]
  },

  // Credit Manager Dashboard
  {
    path: 'credit-manager-dashboard',
    component: CreditManagerDashboardComponent,
    children: [
      { path: 'verify-documents', component: VerifyDocumentsComponent },
      { path: 'documents-submitted-applications', component: DocumentsSumbmitedApplicationsComponent },
      { path: 'evaluate-loan', component: EvaluateLoanComponent },
      { path: 'evaluated-applications', component: ViewApplicationsComponent },
      { path: 'sanction-letter', component: SanctionLetterComponent },
      { path: '', redirectTo: 'documents-submitted-applications', pathMatch: 'full' }
    ]
  },

  // Disbursement Dashboard
  {
    path: 'disbursement-manager-dashboard',
    component: DisbursementDashboardComponent,
    children: [
      { path: 'pending-disbursements', component: PendingDisbursementsComponent },
      // { path: 'processed-disbursements', component: ProcessedDisbursementsComponent },
      { path: 'disbursement-history', component: DisbursementHistoryComponent },
      { path: '', redirectTo: 'pending-disbursements', pathMatch: 'full' }
    ]
  },

  // Wildcard - change target if needed
  // { path: '**', redirectTo: 'home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }