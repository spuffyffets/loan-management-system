import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css']
})
export class ViewApplicationsComponent implements OnInit {
  applications: any[] = [];

 
  uploadedDocuments: { [type: string]: string } = {};
  selectedFiles: { [type: string]: File } = {};

  selectedAppId!: number;
  showUploadForm: boolean = false;

  documentTypes: string[] = [
    'AADHAAR', 'PAN', 'SALARY_SLIP', 'BANK_STATEMENT',
    'ADDRESS_PROOF', 'EMPLOYMENT_PROOF', 'PROPERTY_DOCUMENT',
    'PHOTO', 'SIGNATURE'
  ];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.customerService.getApplications(email).subscribe({
        next: (res) => {
          this.applications = res;
          console.log('Applications fetched:', res);
        },
        error: (err) => {
          console.error('Error fetching applications', err);
          alert('Failed to fetch applications');
        }
      });
    }
  }

  deleteApplication(id: number) {
    const email = localStorage.getItem('email');
    if (email) {
      this.customerService.deleteLoan(id, email).subscribe({
        next: (res) => {
          alert(res);
          this.applications = this.applications.filter(app => app.id !== id);
        },
        error: (err) => {
          console.error("Delete error:", err);
          alert("Delete failed: " + err.error);
        }
      });
    } else {
      alert("Email not found in localStorage.");
    }
  }

  openUploadModal(appId: number): void {
    this.selectedAppId = appId;
    this.showUploadForm = true;

    const email = localStorage.getItem('email');
    if (email) {
      this.customerService.getUploadedDocuments(email).subscribe({
        next: (docs) => {
          this.uploadedDocuments = {};
          docs.forEach((doc: any) => {
            this.uploadedDocuments[doc.documentType] = doc.fileName;
          });
        },
        error: (err) => {
          console.error('Error fetching uploaded documents', err);
        }
      });
    }
  }

getUploadedCount(): string {
  const uploaded = Object.keys(this.uploadedDocuments).length;
  return `${uploaded}/9 Documents Uploaded`;
}



  closeUploadForm(): void {
    this.showUploadForm = false;
    this.selectedFiles = {};
    this.uploadedDocuments = {};
  }

  onFileSelectedPerType(event: any, type: string): void {
    this.selectedFiles[type] = event.target.files[0];
  }

  uploadPerType(type: string): void {
    const email = localStorage.getItem('email');
    const file = this.selectedFiles[type];

    if (!file || !email) {
      alert("Please select a file.");
      return;
    }

    this.customerService.uploadDocument(file, email, type).subscribe({
      next: (res) => {
        alert(`${type} uploaded successfully!`);
        this.uploadedDocuments[type] = file.name;
        delete this.selectedFiles[type];
      },
      error: (err) => {
        console.error('Upload failed:', err);
        alert("Upload failed: " + err.error);
      }
    });
  }
}
