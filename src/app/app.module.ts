import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HomeComponent } from './core/home/home.component';

import { AboutUsComponent } from './core/about-us/about-us.component';
import { ContactUComponent } from './core/contact-u/contact-u.component';
import { GalleryComponent } from './core/gallery/gallery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomerDashboardComponent } from './dashboard/customer-dashboard/customer-dashboard.component';
import { LoanOfficerDashboardComponent } from './dashboard/loan-officer-dashboard/loan-officer-dashboard.component';
import { CreditManagerDashboardComponent } from './dashboard/credit-manager-dashboard/credit-manager-dashboard.component';
import { DisbursementDashboardComponent } from './dashboard/disbursement-dashboard/disbursement-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './dashboard/customer-dashboard/profile/profile.component';
import { ApplyLoanComponent } from './dashboard/customer-dashboard/apply-loan/apply-loan.component';
import { UploadDocumentComponent } from './dashboard/customer-dashboard/upload-document/upload-document.component';
import { ViewApplicationsComponent } from './dashboard/customer-dashboard/view-applications/view-applications.component';
import { ViewDocumentsComponent } from './dashboard/customer-dashboard/view-documents/view-documents.component';
import { PendingApplicationsComponent } from './dashboard/loan-officer-dashboard/pending-applications/pending-applications.component';
import { AuthComponent } from './auth/auth/auth.component';
import { VerifyDocumentsComponent } from './dashboard/credit-manager-dashboard/verify-documents/verify-documents.component';
import { EvaluateLoanComponent } from './dashboard/credit-manager-dashboard/evaluate-loan/evaluate-loan.component';
import { SanctionLetterComponent } from './dashboard/credit-manager-dashboard/sanction-letter/sanction-letter.component';
import { DocumentsSumbmitedApplicationsComponent } from './dashboard/credit-manager-dashboard/documents-sumbmited-applications/documents-sumbmited-applications.component';
import { SafeUrlPipe } from './dashboard/credit-manager-dashboard/verify-documents/safe-url.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { PendingDisbursementsComponent } from './dashboard/disbursement-dashboard/pending-disbursements/pending-disbursements.component';

import { DisbursementHistoryComponent } from './dashboard/disbursement-dashboard/disbursement-history/disbursement-history.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
  declarations: [
    SafeUrlPipe,
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUComponent,
    GalleryComponent,
    CustomerDashboardComponent,
    LoanOfficerDashboardComponent,
    CreditManagerDashboardComponent,
    DisbursementDashboardComponent,
    ProfileComponent,
    ApplyLoanComponent,
    UploadDocumentComponent,
    ViewApplicationsComponent,
    ViewDocumentsComponent,
    PendingApplicationsComponent,
    AuthComponent,
    VerifyDocumentsComponent,
    EvaluateLoanComponent,
    SanctionLetterComponent,
    DocumentsSumbmitedApplicationsComponent,
    PendingDisbursementsComponent,
    DisbursementHistoryComponent,

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    
    
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
