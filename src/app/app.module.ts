import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AboutUsComponent } from './core/about-us/about-us.component';
import { ContactUComponent } from './core/contact-u/contact-u.component';
import { GalleryComponent } from './core/gallery/gallery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
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




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    AboutUsComponent,
    ContactUComponent,
    GalleryComponent,
    RegisterComponent,
    CustomerDashboardComponent,
    LoanOfficerDashboardComponent,
    CreditManagerDashboardComponent,
    DisbursementDashboardComponent,
    ProfileComponent,
    ApplyLoanComponent,
    UploadDocumentComponent,
    ViewApplicationsComponent,
    ViewDocumentsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
